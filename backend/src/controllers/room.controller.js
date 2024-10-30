"use strict";

import {
    createRoomService,
    getRoomsService,
    getRoomService,
    updateRoomService,
    deleteRoomService
} from "../services/room.service.js";

import {
    handleErrorClient,
    handleSuccess,
    handleErrorServer
} from "../handlers/responseHandlers.js"

import {
    roomBodyValidation,
    roomQueryValidation
} from "../validations/room.validation.js";

// Crear una nueva aula
export async function createRoom(req, res) {
    try {
        const { error } = roomBodyValidation.validate(req.body);

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message);

        const [room, roomError] = await createRoomService(req);

        if (roomError) return handleErrorClient(res, 400, roomError);

        handleSuccess(res, 201, "Room created", room);
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message);
    }
};

// Listar todas las aulas (opcionalmente podrían ser solo las disponibles)
export async function getRooms(req, res) {
    try {
        const [rooms, roomsError] = await getRoomsService(req);

        if (roomsError) return handleErrorClient(res, 404, roomsError);

        rooms.length === 0 ? handleSuccess(res, 204, "No rooms found") : handleSuccess(res, 200, "Rooms found", rooms);
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message);
    }
};

// Mostrar información de un aula en particular
export async function getRoom(req, res) {
    try {
        const { id, name } = req.query;

        const { error } = roomQueryValidation.validate({ id, name });

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message);

        const [room, roomError] = await getRoomService({ idRoom: id, nameRoom: name });

        if (roomError) return handleErrorClient(res, 404, roomError);

        handleSuccess(res, 200, "Room found", room);
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message);
    }
};

// Actualizar información de un aula
export async function updateRoom(req, res) {
    try {
        const { id, name } = req.query;

        const { body } = req;

        const { error: queryError } = roomQueryValidation.validate({ id, name });

        if (queryError) return handleErrorClient(res, 400, "Validation Error", queryError.message);

        const { error: bodyError } = roomBodyValidation.validate(body);

        if (bodyError) return handleErrorClient(res, 400, "Validation Error", bodyError.message);

        const [roomUpdated, roomError] = await updateRoomService({ idRoom: id, nameRoom: name }, body);

        if (roomError) return handleErrorClient(res, 400, roomError);

        handleSuccess(res, 200, "Room updated", roomUpdated);
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message);
    }
};

// Eliminar un aula
export async function deleteRoom(req, res) {
    try {
        const { id, name } = req.query;

        const { error } = roomQueryValidation.validate({ id, name });

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message);

        const [roomDeleted, roomError] = await deleteRoomService({ idRoom: id, nameRoom: name });

        if (roomError) return handleErrorClient(res, 400, roomError);

        handleSuccess(res, 200, "Room deleted", roomDeleted);
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message);
    }
};