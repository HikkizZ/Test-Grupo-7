"use strict";

import {
    createHorarioService,
    getHorariosService,
    getHorarioService,
    updateHorarioService,
    deleteHorarioService
} from "../services/horario.service.js";

import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";

import {
    horarioBodyValidation,
    horarioQueryValidation
} from "../validations/horario.validation.js";

//* Controlador para crear un horario.
export async function createHorario(req, res) {
    try {
        const { teacherId, subjectId, cursoId, classroomId, dayOfWeek, periodId } = req.body;
        
        const { error } = horarioBodyValidation.validate({ teacherId, subjectId, cursoId, classroomId, dayOfWeek, periodId  }); //* Validar los parámetros del cuerpo.

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message); //* Si los parámetros son inválidos, devuelve un error 400.

        const [horarioCreated, errorHorario] = await createHorarioService({ teacherId, subjectId, cursoId, classroomId, dayOfWeek, periodId }); //* Llamar al servicio para crear el horario.

        if (errorHorario) return handleErrorClient(res, 400, errorHorario); //* Si ocurre un error al crear el horario, devuelve un error 400.

        handleSuccess(res, 201, "Horario creado exitosamente", horarioCreated); //* Devuelve el horario creado.
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message); //* Si ocurre un error interno, devuelve un error 500.
    }
}

//* Controlador para obtener un horario por id.
export async function getHorario(req, res) {
    try {
        const { id } = req.query;

        const { error } = horarioQueryValidation.validate({ id }); //* Validar los parámetros de la consulta.

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message); //* Si los parámetros son inválidos, devuelve un error 400.

        const [horarioFound, errorHorario] = await getHorarioService({ idHorario: id }); //* Llamar al servicio para obtener el horario.

        if (errorHorario) return handleErrorClient(res, 404, errorHorario); //* Si no se encuentra el horario, devuelve un error 404.

        handleSuccess(res, 200, "Horario encontrado", horarioFound); //* Devuelve el horario encontrado.
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message); //* Si ocurre un error interno, devuelve un error 500.
    }
}

//* Controlador para obtener todos los horarios.
export async function getHorarios(req, res) {
    try {
        const [horarios, errorHorarios] = await getHorariosService(); //* Llamar al servicio para obtener todos los horarios.

        if (errorHorarios) return handleErrorClient(res, 404, errorHorarios); //* Si no se encuentran horarios, devuelve un error 404.

        if (horarios.length === 0) {
            handleSuccess(res, 204, "No se encontraron horarios."); //* Si no hay horarios, devolver un 204.
        } else {
            handleSuccess(res, 200, "Horarios encontrados", horarios); //* Si se encuentran horarios, devolverlos.
        }
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message); //* Si ocurre un error interno, devuelve un error 500.
    }
}

//* Controlador para actualizar un horario.
export async function updateHorario(req, res) {
    try {
        const { id } = req.query;
        const { body } = req;

        const { error: queryError } = horarioQueryValidation.validate({ id }); //* Validar los parámetros de la consulta.

        if (queryError) return handleErrorClient(res, 400, "Validation Error", queryError.message); //* Si los parámetros de consulta son inválidos, devuelve un error 400.

        const { error: bodyError } = horarioBodyValidation.validate(body); //* Validar los parámetros del cuerpo.

        if (bodyError) return handleErrorClient(res, 400, "Validation Error", bodyError.message); //* Si los parámetros del cuerpo son inválidos, devuelve un error 400.

        const [horarioUpdated, errorHorario] = await updateHorarioService({ idHorario: id }, body); //* Llamar al servicio para actualizar el horario.

        if (errorHorario) return handleErrorClient(res, 400, errorHorario); //* Si ocurre un error al actualizar el horario, devuelve un error 400.

        handleSuccess(res, 200, "Horario actualizado exitosamente", horarioUpdated); //* Devuelve el horario actualizado.
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message); //* Si ocurre un error interno, devuelve un error 500.
    }
}

//* Controlador para eliminar un horario.
export async function deleteHorario(req, res) {
    try {
        const { id } = req.query;

        const { error } = horarioQueryValidation.validate({ id }); //* Validar los parámetros de la consulta.

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message); //* Si los parámetros son inválidos, devuelve un error 400.

        const [horarioDeleted, errorHorario] = await deleteHorarioService({ idHorario: id }); //* Llamar al servicio para eliminar el horario.

        if (errorHorario) return handleErrorClient(res, 404, errorHorario); //* Si ocurre un error al eliminar el horario, devuelve un error 404.

        handleSuccess(res, 200, "Horario eliminado exitosamente", horarioDeleted); //* Devuelve el horario eliminado.
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message); //* Si ocurre un error interno, devuelve un error 500.
    }
}
