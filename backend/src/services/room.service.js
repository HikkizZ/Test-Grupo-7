"use strict";

import Room from "../models/room.model.js";
import { AppDataSource } from "../config/configDB.js";

export async function createRoomService(req) {
    try {
        const roomRepository = AppDataSource.getRepository(Room);

        const existingRoom = await roomRepository.findOne({ where: { name: req.body.name } });

        if (existingRoom) {
            return [null, "La sala ya existe."];
        }

        const newRoom = roomRepository.create({
            name: req.body.name,
            capacity: req.body.capacity,
            roomType: req.body.roomType,
        });

        await roomRepository.save(newRoom);

        const formattedRoomCreate = {
            ...newRoom,
            capacity: `${newRoom.capacity} alumnos`,
        };

        return [formattedRoomCreate, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}

export async function getRoomsService() {
    try {
        const roomRepository = AppDataSource.getRepository(Room);

        const rooms = await roomRepository.find({
            order: {
                id: "ASC", 
            },
        });

        if (!rooms || rooms.length === 0) {
            return [null, "No se encontraron salas."];
        }

        const formattedRoomsAll = rooms.map((room) => ({
            ...room,
            capacity: `${room.capacity} alumnos`,
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

        const queryBuilder = roomRepository.createQueryBuilder("room");

        if (id !== undefined) {
            queryBuilder.andWhere("room.id = :id", { id });
        }
        if (name) {
            queryBuilder.andWhere("room.name = :name", { name });
        }
        if (capacity !== undefined) {
            queryBuilder.andWhere("room.capacity = :capacity", { capacity });
        }
        if (roomType) {
            queryBuilder.andWhere("room.roomType = :roomType", { roomType });
        }

        const roomsFound = await queryBuilder.getMany();

        if (!roomsFound || roomsFound.length === 0) {
            return [null, "No se encontraron salas con los criterios especificados."];
        }

        const formattedRooms = roomsFound.map((room) => ({
            ...room,
            capacity: `${room.capacity} alumnos`,
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

        const formattedRoomUpdate = {
            ...updatedRoom,
            capacity: `${updatedRoom.capacity} alumnos`,
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

        const formattedRoomDelete = {
            ...roomFound,
            capacity: `${roomFound.capacity} alumnos`,
        };

        return [formattedRoomDelete, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
}