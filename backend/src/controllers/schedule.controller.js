"use strict";

import {
    createScheduleService,
    getSchedulesService,
    getScheduleService,
    updateScheduleService,
    deleteScheduleService
} from "../services/schedule.service.js";

import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";

import {
    scheduleBodyValidation,
    scheduleQueryValidation
} from "../validations/schedule.validation.js";

//* Controlador para crear un horario.
export async function createSchedule(req, res) {
    try {
        const { cursoId, teacherId, classroomId, subjectId, period, dayOfWeek } = req.body;

        const { error } = scheduleBodyValidation.validate({ cursoId, teacherId, classroomId, subjectId, period, dayOfWeek }); //* Validar los parámetros del cuerpo.

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message); //* Si los parámetros son inválidos, devuelve un error 400.

        const [scheduleCreated, errorSchedule] = await createScheduleService({ cursoId, teacherId, classroomId, subjectId, period, dayOfWeek }); //* Llamar al servicio para crear el horario.

        if (errorSchedule) return handleErrorClient(res, 400, errorSchedule); //* Si ocurre un error al crear el horario, devuelve un error 400.

        handleSuccess(res, 201, "Horario creado exitosamente", scheduleCreated); //* Devuelve el horario creado.
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message); //* Si ocurre un error interno, devuelve un error 500.
    }
}

//* Controlador para obtener un horario por id o nombre.
export async function getSchedule(req, res) {
    try {
        const { id, name } = req.query;

        const { error } = scheduleQueryValidation.validate({ id, name }); //* Validar los parámetros de la consulta.

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message); //* Si los parámetros son inválidos, devuelve un error 400.

        const [scheduleFound, errorSchedule] = await getScheduleService({ idSchedule: id, nameSchedule: name }); //* Llamar al servicio para obtener el horario.

        if (errorSchedule) return handleErrorClient(res, 404, errorSchedule); //* Si no se encuentra el horario, devuelve un error 404.

        handleSuccess(res, 200, "Horario encontrado", scheduleFound); //* Devuelve el horario encontrado.
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message); //* Si ocurre un error interno, devuelve un error 500.
    }
}

//* Controlador para obtener todos los horarios.
export async function getSchedules(req, res) {
    try {
        const [schedules, errorSchedules] = await getSchedulesService(); //* Llamar al servicio para obtener todos los horarios.

        if (errorSchedules) return handleErrorClient(res, 404, errorSchedules); //* Si no se encuentran horarios, devuelve un error 404.

        schedules.length === 0
            ? handleSuccess(res, 204, "No se encontraron horarios.") //* Si no hay horarios, devolver un 204.
            : handleSuccess(res, 200, "Horarios encontrados", schedules); //* Si se encuentran horarios, devolverlos.
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message); //* Si ocurre un error interno, devuelve un error 500.
    }
}

//* Controlador para actualizar un horario.
export async function updateSchedule(req, res) {
    try {
        const { id } = req.query;
        const { body } = req;

        const { error: queryError } = scheduleQueryValidation.validate({ id }); //* Validar los parámetros de la consulta.

        if (queryError) return handleErrorClient(res, 400, "Validation Error", queryError.message); //* Si los parámetros de consulta son inválidos, devuelve un error 400.

        const { error: bodyError } = scheduleBodyValidation.validate(body); //* Validar los parámetros del cuerpo.

        if (bodyError) return handleErrorClient(res, 400, "Validation Error", bodyError.message); //* Si los parámetros del cuerpo son inválidos, devuelve un error 400.

        const [scheduleUpdated, errorSchedule] = await updateScheduleService({ idSchedule: id}, body); //* Llamar al servicio para actualizar el horario.

        if (errorSchedule) return handleErrorClient(res, 400, errorSchedule); //* Si ocurre un error al actualizar el horario, devuelve un error 400.

        handleSuccess(res, 200, "Horario actualizado exitosamente", scheduleUpdated); //* Devuelve el horario actualizado.
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message); //* Si ocurre un error interno, devuelve un error 500.
    }
}

//* Controlador para eliminar un horario.
export async function deleteSchedule(req, res) {
    try {
        const { id} = req.query;

        const { error } = scheduleQueryValidation.validate({ id }); //* Validar los parámetros de la consulta.

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message); //* Si los parámetros son inválidos, devuelve un error 400.

        const [scheduleDeleted, errorSchedule] = await deleteScheduleService({ idSchedule: id}); //* Llamar al servicio para eliminar el horario.

        if (errorSchedule) return handleErrorClient(res, 404, errorSchedule); //* Si ocurre un error al eliminar el horario, devuelve un error 404.

        handleSuccess(res, 200, "Horario eliminado exitosamente", scheduleDeleted); //* Devuelve el horario eliminado.
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message); //* Si ocurre un error interno, devuelve un error 500.
    }
}
