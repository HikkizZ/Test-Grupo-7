"use strict";
import {
    getAllAsignaturas as getAllAsignaturasService,
    getAsignaturaById as getAsignaturaByIdService,
    createAsignatura as createAsignaturaService,
    updateAsignatura as updateAsignaturaService,
    deleteAsignatura as deleteAsignaturaService
} from '../services/asignatura.service.js';

import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";

export async function getAllAsignaturas(req, res) {
    try {
        const asignaturas = await getAllAsignaturasService();
        handleSuccess(res, 200, "Asignaturas obtenidas exitosamente", asignaturas);
    } catch (error) {
        handleErrorServer(res, 500, "Error al obtener las asignaturas");
    }
}

export async function getAsignaturaById(req, res) {
    try {
        const asignatura = await getAsignaturaByIdService(req.params.id);
        if (!asignatura) {
            return handleErrorClient(res, 404, "Asignatura no encontrada");
        }
        handleSuccess(res, 200, "Asignatura obtenida exitosamente", asignatura);
    } catch (error) {
        handleErrorServer(res, 500, "Error al obtener la asignatura");
    }
}

export async function createAsignatura(req, res) {
    try {
        const newAsignatura = await createAsignaturaService(req.body);
        handleSuccess(res, 201, "Asignatura creada exitosamente", newAsignatura);
    } catch (error) {
        handleErrorClient(res, 400, "Error al crear la asignatura", error.message);
    }
}

export async function updateAsignatura(req, res) {
    try {
        const updatedAsignatura = await updateAsignaturaService(req.params.id, req.body);
        if (!updatedAsignatura) {
            return handleErrorClient(res, 404, "Asignatura no encontrada");
        }
        handleSuccess(res, 200, "Asignatura actualizada exitosamente", updatedAsignatura);
    } catch (error) {
        handleErrorClient(res, 400, "Error al actualizar la asignatura", error.message);
    }
}

export async function deleteAsignatura(req, res) {
    try {
        const deletedAsignatura = await deleteAsignaturaService(req.params.id);
        if (!deletedAsignatura) {
            return handleErrorClient(res, 404, "Asignatura no encontrada");
        }
        handleSuccess(res, 200, "Asignatura eliminada exitosamente");
    } catch (error) {
        handleErrorServer(res, 500, "Error al eliminar la asignatura");
    }
}
