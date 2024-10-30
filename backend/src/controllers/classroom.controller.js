"use strict";
import {
    getAllClassrooms as getAllClassroomsService,
    getClassroomById as getClassroomByIdService,
    createClassroom as createClassroomService,
    updateClassroom as updateClassroomService,
    deleteClassroom as deleteClassroomService
} from '../services/classroom.service.js';
import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";

// Obtener todos los salones
export async function getAllClassrooms(req, res) {
    try {
        const classrooms = await getAllClassroomsService();
        handleSuccess(res, 200, "Salones obtenidos exitosamente", classrooms);
    } catch (error) {
        handleErrorServer(res, 500, "Error al obtener los salones");
    }
}

// Obtener un salón por ID
export async function getClassroomById(req, res) {
    try {
        const classroom = await getClassroomByIdService(req.params.id);
        if (!classroom) return handleErrorClient(res, 404, "Salón no encontrado");
        handleSuccess(res, 200, "Salón obtenido exitosamente", classroom);
    } catch (error) {
        handleErrorServer(res, 500, "Error al obtener el salón");
    }
}

// Crear un nuevo salón
export async function createClassroom(req, res) {
    try {
        const newClassroom = await createClassroomService(req.body);
        handleSuccess(res, 201, "Salón creado exitosamente", newClassroom);
    } catch (error) {
        handleErrorClient(res, 400, "Error al crear el salón");
    }
}

// Actualizar un salón existente
export async function updateClassroom(req, res) {
    try {
        const updatedClassroom = await updateClassroomService(req.params.id, req.body);
        if (!updatedClassroom) return handleErrorClient(res, 404, "Salón no encontrado");
        handleSuccess(res, 200, "Salón actualizado exitosamente", updatedClassroom);
    } catch (error) {
        handleErrorClient(res, 400, "Error al actualizar el salón");
    }
}

// Eliminar un salón
export async function deleteClassroom(req, res) {
    try {
        const deletedClassroom = await deleteClassroomService(req.params.id);
        if (!deletedClassroom) return handleErrorClient(res, 404, "Salón no encontrado");
        handleSuccess(res, 200, "Salón eliminado exitosamente");
    } catch (error) {
        handleErrorServer(res, 500, "Error al eliminar el salón");
    }
}
