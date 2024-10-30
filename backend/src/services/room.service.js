"use strict";

import Room from "../models/room.model.js";
import { AppDataSource } from "../config/configDB.js";

export async function createRoomService(req, res) {
    try {
        const roomRepository = AppDataSource.getRepository(Room);

        const existingRoom = await roomRepository.findOne({ where: { name: req.body.name } });

        if (existingRoom) { return res.status(400).json({ message: "Room already exists." }); }

        const newRoom = roomRepository.create({
            name: req.body.name,
            available: true,
        });

        await roomRepository.save(newRoom);

        return [newRoom, null];
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export async function getRoomsService(req, res) {
    try {
        const roomRepository = AppDataSource.getRepository(Room);

        const rooms = await roomRepository.find();

        if (!rooms || rooms.length === 0) return [null, "No rooms found."];

        return [rooms, null];
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export async function getRoomService(query) {
    try {
        const {idRoom, nameRoom} = query;

        const roomRepository = AppDataSource.getRepository(Room);

        const roomFound = await roomRepository.findOne({ 
            where: [{ id: idRoom }, { name: nameRoom }]
         });

        if (!roomFound) return [null, "Room not found."];

        return [roomFound, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
};

export async function updateRoomService(query, body) {
    try {
        const { idRoom, nameRoom } = query;

        const roomRepository = AppDataSource.getRepository(Room);

        const roomFound = await roomRepository.findOne({ where: [{ id: idRoom }, { name: nameRoom }] });

        if (!roomFound) return [null, "Room not found."];

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

        if (!roomFound) return [null, "Room not found."];

        await roomRepository.remove(roomFound);

        return [roomFound, null];
    } catch (error) {
        return [null, "Internal Server Error", error.message];
    }
};