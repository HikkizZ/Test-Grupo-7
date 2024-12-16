"use strict";

import Room from "../models/room.model.js";
import { AppDataSource } from "../config/configDB.js";

export async function createRoomService(req) {
    try {
        const roomRepository = AppDataSource.getRepository(Room);

        // Verificar si ya existe una sala con el mismo nombre
        const existingRoom = await roomRepository.findOne({ where: { name: req.body.name } });

        if (existingRoom) {
            return [null, "La sala ya existe."];
        }

        // Crear una nueva sala
        const newRoom = roomRepository.create({
            name: req.body.name,
            size: req.body.size,
            roomType: req.body.roomType,
        });

        await roomRepository.save(newRoom);

        // Formatear la respuesta para mostrar el size en m²
        const formattedRoomCreate = {
            ...newRoom,
            size: `${newRoom.size} m²`,
        };

        return [formattedRoomCreate, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}

export async function getRoomsService() {
    try {
        const roomRepository = AppDataSource.getRepository(Room);

        // Obtener todas las salas y ordenarlas por ID (de menor a mayor)
        const rooms = await roomRepository.find({
            order: {
                id: "ASC", // Ordenar por ID
            },
        });

        if (!rooms || rooms.length === 0) {
            return [null, "No se encontraron salas."];
        }

        // Formatear el tamaño (size) para agregar "m²"
        const formattedRoomsAll = rooms.map((room) => ({
            ...room,
            size: `${room.size} m²`,
        }));

        return [formattedRoomsAll, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}

export async function getRoomService(query) {
    try {
        const { id, name, size, roomType } = query;

        const roomRepository = AppDataSource.getRepository(Room);

        // Crear un QueryBuilder para construir condiciones dinámicas
        const queryBuilder = roomRepository.createQueryBuilder("room");

        // Agregar condiciones dinámicas
        if (id !== undefined) {
            queryBuilder.andWhere("room.id = :id", { id });
        }
        if (name) {
            queryBuilder.andWhere("room.name = :name", { name });
        }
        if (size !== undefined) {
            queryBuilder.andWhere("room.size = :size", { size });
        }
        if (roomType) {
            queryBuilder.andWhere("room.roomType = :roomType", { roomType });
        }

        // Ejecutar la consulta
        const roomsFound = await queryBuilder.getMany();

        if (!roomsFound || roomsFound.length === 0) {
            return [null, "No se encontraron salas con los criterios especificados."];
        }

        // Formatear el tamaño (size) para agregar "m²"
        const formattedRooms = roomsFound.map((room) => ({
            ...room,
            size: `${room.size} m²`,
        }));

        return [formattedRooms, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}

export async function updateRoomService(query, body) {
    try {
        const { id, name } = query;

        const roomRepository = AppDataSource.getRepository(Room);

        const roomFound = await roomRepository.findOne({ where: [{ id }, { name }] });

        if (!roomFound) return [null, "Sala no encontrada."];

        const updatedRoom = await roomRepository.save({
            ...roomFound,
            ...body,
        });

        // Formatear la respuesta para mostrar el size en m²
        const formattedRoomUpdate = {
            ...updatedRoom,
            size: `${updatedRoom.size} m²`,
        };

        return [formattedRoomUpdate, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}

export async function deleteRoomService(query) {
    try {
        const { id, name } = query;

        const roomRepository = AppDataSource.getRepository(Room);

        const roomFound = await roomRepository.findOne({ where: [{ id }, { name }] });

        if (!roomFound) return [null, "Sala no encontrada."];

        await roomRepository.remove(roomFound);

        // Formatear la respuesta para mostrar el size en m²
        const formattedRoomDelete = {
            ...roomFound,
            size: `${roomFound.size} m²`,
        };

        return [formattedRoomDelete, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}