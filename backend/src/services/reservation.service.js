"use strict";

import Reservation from '../models/reservation.model.js';
import { AppDataSource } from '../config/configDB.js';
import { parse } from 'date-fns';
import { formatToLocalTime } from '../utils/formatDate.js'

export async function createReservationService(req, res) {
    try {
        const reservationRepository = AppDataSource.getRepository(Reservation);

        // console.log("REQ.USER EN SERVICE", req.user);

        // Extrae la información del usuario autenticado desde req.user
        const loggedUserId = req.user?.id; // Extrae el ID del usuario autenticado

        if (!loggedUserId) {
            return res.status(401).json({ message: "Usuario no autenticado." });
        }

        // console.log("REQ.BODY EN SERVICE", req.body);

        const { fechaDesde, fechaHasta, tipoReserva, recurso_id, sala_id } = req.body;

        const fecha_Desde = parse(fechaDesde, "dd/MM/yyyy HH:mm", new Date());
        const fecha_Hasta = parse(fechaHasta, "dd/MM/yyyy HH:mm", new Date());

        // console.log("FECHA DESDE", fecha_Desde);
        // console.log("FECHA HASTA", fecha_Hasta);

        const existingReservation = await reservationRepository.findOne({
            where: [
                {
                    tipoReserva: "recurso",
                    Recurso: { id: recurso_id },
                    // fechaDesde: fecha_Desde,
                    // fechaHasta: fecha_Hasta,
                },
                {
                    tipoReserva: "sala",
                    Sala: { id: sala_id },
                    // fechaDesde: fecha_Desde,
                    // fechaHasta: fecha_Hasta,
                }
            ],
            relations: ["Recurso", "Sala", "Reservante"],
        });

        // console.log("EXISTING RESERVATION", existingReservation);
        // console.log("RESERVANTE", existingReservation);
        // const reservante_id = existingReservation?.Reservante?.id;
        // console.log("LOGGED USER ID", loggedUserId);
        // if (existingReservation && existingReservation.estado === "pendiente" && reservante_id === loggedUserId) { 
        //     console.log("Ya hiciste la reserva, espera a que sea aprobada o rechazada.");
        //     return res.status(400).json({ message: "La Reserva ya existe." });

        // }else if (existingReservation && existingReservation.estado === "aprobada" && reservante_id === loggedUserId) { 
        //     console.log("Ya hiciste la reserva, y está aprobada.");
        //     return res.status(400).json({ message: "La Reserva ya existe." });

        // } else if(existingReservation && existingReservation.estado === "pendiente" && existingReservation.fechaDesde !== fecha_Desde && existingReservation.fechaHasta !== fecha_Hasta) {
        //     console.log("[ES PERMITIDO] Ya hay una reserva pendiente para este recurso pero con diferente fecha.");
        
        // }else if (existingReservation && existingReservation.estado === "pendiente" && reservante_id !== loggedUserId) {
        //     console.log("[ES PERMITIDO] Ya hay una reserva pendiente para este recurso");

        // } else if (existingReservation && existingReservation.estado === "aprobada" && existingReservation.devuelto === false) {
        //     console.log("Ya hay una reserva aprobada para este recurso o sala y no se ha devuelto.");
        //     return res.status(400).json({ message: "La Reserva ya existe." });

        // } else if (existingReservation && existingReservation.estado === "aprobada" && existingReservation.devuelto === true) {
        //     console.log("[ES PERMITIDO] Habia una reserva pero se devolvió el recurso o sala.");

        // } else if (existingReservation && existingReservation.estado === "rechazada") {
        //     console.log("[ES PERMITIDO] Se puede reservar pq la reserva anterior fue rechazada.");

        // } else {
        //     console.log("[ES PERMITIDO] Se puede reservar");
        // }
        //------------------------------------------------------------------------------------------------
        // if (existingReservation) { return res.status(400).json({ message: "La Reserva ya existe." }); }

        const newReservation = reservationRepository.create({
            fechaDesde: fecha_Desde,
            fechaHasta: fecha_Hasta,
            devuelto: false,
            estado: "pendiente",
            tipoReserva: tipoReserva,
            Reservante: { id: loggedUserId }, // Usa el ID del usuario logeado
            ...(tipoReserva === "recurso" && { Recurso: { id: recurso_id } }),
            ...(tipoReserva === "sala" && { Sala: { id: sala_id } }),
        });

        await reservationRepository.save(newReservation);

        // Aplica el formato directamente a las propiedades
        newReservation.fechaDesde = formatToLocalTime(newReservation.fechaDesde);
        newReservation.fechaHasta = formatToLocalTime(newReservation.fechaHasta);

        return [newReservation, null];
    } catch (error) {
        // console.log("ERROR", error);
        res.status(500).json({ message: error.message });
    }
};

export async function getReservationsService(req, res) {
    try {
        const reservationRepository = AppDataSource.getRepository(Reservation);

        const reservations = await reservationRepository.find({
            relations: ["Encargado", "Reservante", "Recurso", "Sala"],
        });

        if (!reservations || reservations.length === 0) return [null, "No reservations found."];

        // Aplica el formato directamente a las propiedades de cada reserva
        reservations.forEach((reservation) => {
            reservation.fechaDesde = formatToLocalTime(reservation.fechaDesde);
            reservation.fechaHasta = formatToLocalTime(reservation.fechaHasta);
        });

        // Mapea para mostrar sólo los nombres de las relaciones
        const formattedReservations = reservations.map(reservation => ({
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
};

export async function getReservationService(query) {
    try {
        const { idReservation, devueltoReservation, TipoReservaReservation, estadoReservation } = query;

        const reservationRepository = AppDataSource.getRepository(Reservation);

        const reservationsFound = await reservationRepository.find({
            where: {
                ...(idReservation && { id: idReservation }),
                ...(devueltoReservation && { devuelto: devueltoReservation }),
                ...(TipoReservaReservation && { tipoReserva: TipoReservaReservation }),
                ...(estadoReservation && { estado: estadoReservation }),
            },
            relations: ["Encargado", "Reservante", "Recurso", "Sala"],
        });

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
        return [null, "Internal Server Error", error.message];
    }
}

export async function updateReservationService(query, body) {
    try {
        const { idReservation } = query;

        const reservationRepository = AppDataSource.getRepository(Reservation);

        const reservationFound = await reservationRepository.findOne({ where: { id: idReservation } });

        if (!reservationFound) return [null, "Reservation not found."];

        const { devuelto, estado } = body;

        if (devuelto !== undefined) {
            reservationFound.devuelto = devuelto;
        }

        if (estado !== undefined) {
            reservationFound.estado = estado;
        }

        await reservationRepository.save(reservationFound);

        return [reservationFound, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
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
