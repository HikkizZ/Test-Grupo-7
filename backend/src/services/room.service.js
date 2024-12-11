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
        });

        await roomRepository.save(newRoom);

        return [newRoom, null];
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

        return [rooms, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}

export async function getRoomService(query) {
    try {
        const { idRoom, nameRoom } = query;

        const roomRepository = AppDataSource.getRepository(Room);

        // Buscar una sala por ID o nombre
        const roomFound = await roomRepository.findOne({ 
            where: [{ id: idRoom }, { name: nameRoom }],
        });

        if (!roomFound) {
            return [null, "Sala no encontrada."];
        }

        return [roomFound, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}

export async function updateRoomService(query, body) {
    try {
        const { idRoom, nameRoom } = query;

        const roomRepository = AppDataSource.getRepository(Room);

        const roomFound = await roomRepository.findOne({ where: [{ id: idRoom }, { name: nameRoom }] });

        if (!roomFound) return [null, "Sala no encontrada."];

        const updatedRoom = await roomRepository.update(roomFound.id, body);

        return [updatedRoom, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
};

export async function deleteRoomService(query) {
    try {
        const { idRoom, nameRoom } = query;

        const roomRepository = AppDataSource.getRepository(Room);

        const roomFound = await roomRepository.findOne({ where: [{ id: idRoom }, { name: nameRoom }] });

        if (!roomFound) return [null, "Sala no encontrada."];

        await roomRepository.remove(roomFound);

        return [roomFound, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
};