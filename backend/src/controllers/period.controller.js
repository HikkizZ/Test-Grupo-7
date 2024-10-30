"use strict";
import {
    getAllPeriods as getAllPeriodsService,
    getPeriodById as getPeriodByIdService,
    createPeriod as createPeriodService,
    updatePeriod as updatePeriodService,
    deletePeriod as deletePeriodService
} from '../services/period.service.js';
import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";


export async function getAllPeriods(req, res) {
    try {
        const periods = await getAllPeriodsService();
        handleSuccess(res, 200, "Periodos obtenidos exitosamente", periods);
    } catch (error) {
        handleErrorServer(res, 500, "Error al obtener los periodos");
    }
}

export async function getPeriodById(req, res) {
    try {
        const period = await getPeriodByIdService(req.params.id);
        if (!period) return handleErrorClient(res, 404, "Periodo no encontrado");
        handleSuccess(res, 200, "Periodo obtenido exitosamente", period);
    } catch (error) {
        handleErrorServer(res, 500, "Error al obtener el periodo");
    }
}


export async function createPeriod(req, res) {
    try {
        const newPeriod = await createPeriodService(req.body);
        handleSuccess(res, 201, "Periodo creado exitosamente", newPeriod);
    } catch (error) {
        if (error.message === "El nombre del periodo ya existe.") {
            handleErrorClient(res, 400, "Nombre duplicado", { error: error.message });
        } else {
            handleErrorServer(res, 500, "Error al crear el periodo", { error: error.message });
        }
    }
}


export async function updatePeriod(req, res) {
    try {
        const updatedPeriod = await updatePeriodService(req.params.id, req.body);
        if (!updatedPeriod) return handleErrorClient(res, 404, "Periodo no encontrado");
        handleSuccess(res, 200, "Periodo actualizado exitosamente", updatedPeriod);
    } catch (error) {
        handleErrorClient(res, 400, "Error al actualizar el periodo");
    }
}

export async function deletePeriod(req, res) {
    try {
        const deletedPeriod = await deletePeriodService(req.params.id);
        if (!deletedPeriod) return handleErrorClient(res, 404, "Periodo no encontrado");
        handleSuccess(res, 200, "Periodo eliminado exitosamente");
    } catch (error) {
        handleErrorServer(res, 500, "Error al eliminar el periodo");
    }
}
