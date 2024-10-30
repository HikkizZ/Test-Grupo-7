"use strict";
import {
    createSchedule as createScheduleService,
    getAllSchedules as getAllSchedulesService,
    getScheduleById as getScheduleByIdService,
    updateSchedule as updateScheduleService,
    deleteSchedule as deleteScheduleService
} from '../services/schedule.service.js';
import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";

export async function getAllSchedules(req, res) {
    try {
        const schedules = await getAllSchedulesService();
        handleSuccess(res, 200, "Horarios obtenidos exitosamente", schedules);
    } catch (error) {
        handleErrorServer(res, 500, "Error al obtener los horarios");
    }
}

export async function getScheduleById(req, res) {
    try {
        const schedule = await getScheduleByIdService(req.params.id);
        if (!schedule) return handleErrorClient(res, 404, "Horario no encontrado");
        handleSuccess(res, 200, "Horario obtenido exitosamente", schedule);
    } catch (error) {
        handleErrorServer(res, 500, "Error al obtener el horario");
    }
}


export async function createSchedule(req, res) {
    try {
        const newSchedule = await createScheduleService(req.body);
        handleSuccess(res, 201, "Horario creado exitosamente", newSchedule);
    } catch (error) {
        handleErrorClient(res, 400, "Error al crear el horario", error.message);
    }
}


export async function updateSchedule(req, res) {
    try {
        const updatedSchedule = await updateScheduleService(req.params.id, req.body);
        if (!updatedSchedule) return handleErrorClient(res, 404, "Horario no encontrado");
        handleSuccess(res, 200, "Horario actualizado exitosamente", updatedSchedule);
    } catch (error) {
        handleErrorClient(res, 400, "Error al actualizar el horario");
    }
}


export async function deleteSchedule(req, res) {
    try {
        const deletedSchedule = await deleteScheduleService(req.params.id);
        if (!deletedSchedule) return handleErrorClient(res, 404, "Horario no encontrado");
        handleSuccess(res, 200, "Horario eliminado exitosamente");
    } catch (error) {
        handleErrorServer(res, 500, "Error al eliminar el horario");
    }
}
