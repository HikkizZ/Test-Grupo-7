"use strict";

import Reservation from "../models/reservation.model.js";
import { AppDataSource } from "../config/configDB.js";
import { parse, isValid, startOfDay, endOfDay } from "date-fns";
import { formatToLocalTime } from "../utils/formatDate.js";
import { Brackets } from "typeorm";

export async function createReservationService(req) {
    try {
        const reservationRepository = AppDataSource.getRepository(Reservation);

        const loggedUserId = req.user?.id;
        if (!loggedUserId) {
            return [null, "Usuario no autenticado."];
        }

        const { fechaDesde, fechaHasta, tipoReserva, recurso_id, sala_id } = req.body;

        const fecha_Desde = parse(fechaDesde, "dd-MM-yyyy HH:mm", new Date());
        const fecha_Hasta = parse(fechaHasta, "dd-MM-yyyy HH:mm", new Date());

        // Buscar todas las reservas existentes con condiciones similares
        const existingReservations = await reservationRepository.find({
            where: {
                tipoReserva: tipoReserva,
                ...(tipoReserva === "recurso" && { Recurso: { id: recurso_id } }),
                ...(tipoReserva === "sala" && { Sala: { id: sala_id } }),
                fechaDesde: fecha_Desde,
                fechaHasta: fecha_Hasta,
            },
            relations: ["Reservante", "Recurso", "Sala"],
        });

        // Verificar si el mismo usuario ya tiene una reserva pendiente o aprobada
        const userExistingReservation = existingReservations.find(
            (reservation) => reservation.Reservante?.id === loggedUserId
        );

        if (userExistingReservation) {
            if (userExistingReservation.estado === "pendiente") {
                return [null, "Ya tienes una reserva pendiente para este recurso o sala en las mismas fechas."];
            }

            if (userExistingReservation.estado === "aprobada") {
                return [null, "Ya tienes una reserva aprobada para este recurso o sala en las mismas fechas."];
            }
        }

        // Verificar si otro usuario tiene una reserva aprobada para el mismo recurso o sala
        const otherUserApprovedReservation = existingReservations.find(
            (reservation) => reservation.Reservante?.id !== loggedUserId && reservation.estado === "aprobada"
        );

        if (otherUserApprovedReservation) {
            return [null, "No puedes reservar este recurso o sala porque ya está aprobado para otro usuario en las mismas fechas."];
        }

        // Crear la nueva reserva
        const newReservation = reservationRepository.create({
            fechaDesde: fecha_Desde,
            fechaHasta: fecha_Hasta,
            devuelto: false,
            estado: "pendiente",
            tipoReserva,
            Reservante: { id: loggedUserId },
            ...(tipoReserva === "recurso" && { Recurso: { id: recurso_id } }),
            ...(tipoReserva === "sala" && { Sala: { id: sala_id } }),
        });

        await reservationRepository.save(newReservation);

        // Formatear fechas antes de devolverlas al cliente
        newReservation.fechaDesde = formatToLocalTime(newReservation.fechaDesde);
        newReservation.fechaHasta = formatToLocalTime(newReservation.fechaHasta);

        return [newReservation, null];
    } catch (error) {
        console.error("Error al crear reserva:", error);
        return [null, "Error interno del servidor."];
    }
}

export async function getReservationsService() {
    try {
        const reservationRepository = AppDataSource.getRepository(Reservation);

        const reservations = await reservationRepository.find({
            relations: ["Encargado", "Reservante", "Recurso", "Sala"],
            order: {
                id: "ASC", // Ordenar por ID de menor a mayor
            },
        });

        if (!reservations || reservations.length === 0) return [null, "No reservations found."];

        // Aplica el formato directamente a las propiedades de cada reserva
        reservations.forEach((reservation) => {
            reservation.fechaDesde = formatToLocalTime(reservation.fechaDesde);
            reservation.fechaHasta = formatToLocalTime(reservation.fechaHasta);
        });

        // Mapea para mostrar sólo los nombres de las relaciones
        const formattedReservations = reservations.map((reservation) => ({
            ...reservation,
            Encargado: reservation.Encargado ? { nombre: reservation.Encargado.name } : null,
            Reservante: reservation.Reservante ? { nombre: reservation.Reservante.name } : null,
            Recurso: reservation.Recurso ? { nombre: reservation.Recurso.name } : null,
            Sala: reservation.Sala ? { nombre: reservation.Sala.name } : null,
        }));

        return [formattedReservations, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}

export async function getReservationService(query) {
    try {
        const {
            idReservation,
            devueltoReservation,
            TipoReservaReservation,
            estadoReservation,
            fechaDesde,
            fechaHasta,
        } = query;

        const reservationRepository = AppDataSource.getRepository(Reservation);

        // Inicializamos el QueryBuilder
        const queryBuilder = reservationRepository.createQueryBuilder("Reservation");

        // Filtrar por ID si existe
        if (idReservation) {
            queryBuilder.andWhere("Reservation.id = :id", { id: idReservation });
        }

        // Filtrar por devuelto si existe
        if (devueltoReservation) {
            queryBuilder.andWhere("Reservation.devuelto = :devuelto", { devuelto: devueltoReservation });
        }

        // Filtrar por tipoReserva si existe
        if (TipoReservaReservation) {
            queryBuilder.andWhere("Reservation.tipoReserva = :tipoReserva", { tipoReserva: TipoReservaReservation });
        }

        // Filtrar por estado si existe
        if (estadoReservation) {
            queryBuilder.andWhere("Reservation.estado = :estado", { estado: estadoReservation });
        }

        // Filtrar por fechaDesde y fechaHasta de forma independiente
        if (fechaDesde || fechaHasta) {
            queryBuilder.andWhere(
                new Brackets((qb) => {
                    if (fechaDesde) {
                        const parsedFechaDesde = isValid(parse(fechaDesde, "dd-MM-yyyy HH:mm", new Date()))
                            ? parse(fechaDesde, "dd-MM-yyyy HH:mm", new Date())
                            : null;

                        if (parsedFechaDesde) {
                            qb.orWhere("Reservation.fechaDesde = :fechaDesdeExact", { fechaDesdeExact: parsedFechaDesde });
                        } else {
                            const parsedFechaDesdeStart = startOfDay(parse(fechaDesde, "dd-MM-yyyy", new Date()));
                            const parsedFechaDesdeEnd = endOfDay(parse(fechaDesde, "dd-MM-yyyy", new Date()));

                            qb.orWhere("Reservation.fechaDesde BETWEEN :fechaDesdeStart AND :fechaDesdeEnd", {
                                fechaDesdeStart: parsedFechaDesdeStart,
                                fechaDesdeEnd: parsedFechaDesdeEnd,
                            });
                        }
                    }

                    if (fechaHasta) {
                        const parsedFechaHasta = isValid(parse(fechaHasta, "dd-MM-yyyy HH:mm", new Date()))
                            ? parse(fechaHasta, "dd-MM-yyyy HH:mm", new Date())
                            : null;

                        if (parsedFechaHasta) {
                            qb.orWhere("Reservation.fechaHasta = :fechaHastaExact", { fechaHastaExact: parsedFechaHasta });
                        } else {
                            const parsedFechaHastaStart = startOfDay(parse(fechaHasta, "dd-MM-yyyy", new Date()));
                            const parsedFechaHastaEnd = endOfDay(parse(fechaHasta, "dd-MM-yyyy", new Date()));

                            qb.orWhere("Reservation.fechaHasta BETWEEN :fechaHastaStart AND :endOfDay", {
                                fechaHastaStart: parsedFechaHastaStart,
                                endOfDay: parsedFechaHastaEnd,
                            });
                        }
                    }
                })
            );
        }

        // Ejecutar la consulta y relaciones necesarias
        const reservationsFound = await queryBuilder
            .leftJoinAndSelect("Reservation.Encargado", "Encargado")
            .leftJoinAndSelect("Reservation.Reservante", "Reservante")
            .leftJoinAndSelect("Reservation.Recurso", "Recurso")
            .leftJoinAndSelect("Reservation.Sala", "Sala")
            .orderBy("Reservation.id", "ASC")
            .getMany();

        if (!reservationsFound || reservationsFound.length === 0) {
            return [null, "Reservation not found."];
        }

        // Aplica el formato directamente a las propiedades de cada reserva encontrada
        reservationsFound.forEach((reservation) => {
            reservation.fechaDesde = formatToLocalTime(reservation.fechaDesde);
            reservation.fechaHasta = formatToLocalTime(reservation.fechaHasta);
        });

        // Mapea para formatear cada reserva
        const formattedReservations = reservationsFound.map((reservation) => ({
            id: reservation.id,
            fechaDesde: reservation.fechaDesde,
            fechaHasta: reservation.fechaHasta,
            devuelto: reservation.devuelto,
            tipoReserva: reservation.tipoReserva,
            estado: reservation.estado,
            Encargado: reservation.Encargado ? { nombre: reservation.Encargado.name } : null,
            Reservante: reservation.Reservante ? { nombre: reservation.Reservante.name } : null,
            Recurso: reservation.Recurso ? { nombre: reservation.Recurso.name } : null,
            Sala: reservation.Sala ? { nombre: reservation.Sala.name } : null,
        }));

        return [formattedReservations, null];
    } catch (error) {
        console.error("Error en el servicio getReservationService:", error);
        return [null, "Internal Server Error", error.message];
    }
}

export async function updateReservationService(query, body) {
    try {
        const { idReservation } = query;

        const reservationRepository = AppDataSource.getRepository(Reservation);

        // Buscar la reserva específica por ID
        const reservationFound = await reservationRepository.findOne({
            where: { id: idReservation },
            relations: ["Recurso", "Sala", "Reservante"], // Relaciones necesarias
        });

        if (!reservationFound) {
            return [null, "Reserva no encontrada."];
        }

        const { devuelto, estado } = body;

        if (devuelto !== undefined) {
            reservationFound.devuelto = devuelto;
        }

        if (estado !== undefined) {
            reservationFound.estado = estado;

            // Si el estado se establece como "rechazada", automáticamente establecer devuelto = true
            if (estado === "rechazada") {
                reservationFound.devuelto = true;
            }

            // Si se aprueba, rechazar automáticamente otras reservas conflictivas
            if (estado === "aprobada") {
                await reservationRepository
                    .createQueryBuilder()
                    .update(Reservation)
                    .set({ estado: "rechazada", devuelto: true })
                    .where("id != :id", { id: reservationFound.id }) // Excluir la reserva actual
                    .andWhere("tipoReserva = :tipoReserva", { tipoReserva: reservationFound.tipoReserva })
                    .andWhere("fechaDesde = :fechaDesde", { fechaDesde: reservationFound.fechaDesde })
                    .andWhere("fechaHasta = :fechaHasta", { fechaHasta: reservationFound.fechaHasta })
                    .andWhere("estado = :estado", { estado: "pendiente" }) // Solo reservas pendientes
                    .execute();
            }
        }

        // Guardar la reserva actualizada
        await reservationRepository.save(reservationFound);

        // Formatear la respuesta
        const formattedResponse = {
            id: reservationFound.id,
            fechaDesde: reservationFound.fechaDesde,
            fechaHasta: reservationFound.fechaHasta,
            devuelto: reservationFound.devuelto,
            tipoReserva: reservationFound.tipoReserva,
            estado: reservationFound.estado,
            Reservante: reservationFound.Reservante ? { nombre: reservationFound.Reservante.name } : null,
            Recurso: reservationFound.Recurso ? { nombre: reservationFound.Recurso.name } : null,
            Sala: reservationFound.Sala ? { nombre: reservationFound.Sala.name } : null,
        };

        return [formattedResponse, null];
    } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        return [null, "Error interno del servidor."];
    }
}

export async function deleteReservationService(query) {
    try {
        const { idReservation } = query;

        const reservationRepository = AppDataSource.getRepository(Reservation);

        const reservationFound = await reservationRepository.findOne({ where: { id: idReservation } });

        if (!reservationFound) return [null, "Reservation not found."];

        await reservationRepository.remove(reservationFound);

        return [reservationFound, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}
