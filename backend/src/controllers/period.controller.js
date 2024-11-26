"use strict";

import {
    createPeriodService,
    getPeriodService,
    getPeriodsService,
    updatePeriodService,
    deletePeriodService,
} from "../services/period.service.js";

import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer,
} from "../handlers/responseHandlers.js";

import {
    periodBodyValidation,
    periodQueryValidation,
} from "../validations/period.validation.js";

//* Controlador para crear un nuevo período
export async function createPeriod(req, res) {
    try {
        const { name, startTime, endTime } = req.body;

        const { error } = periodBodyValidation.validate({ name, startTime, endTime }); //* Validación del cuerpo de la solicitud.

        if (error) return handleErrorClient(res, 400, error.message); //* Si hay errores de validación, retorna un error 400.

        const [periodCreated, errorPeriod] = await createPeriodService({ name, startTime, endTime }); //* Llama al servicio para crear el período.

        if (errorPeriod) return handleErrorClient(res, 400, errorPeriod); //* Si ocurre un error al crear, retorna un error 400.

        handleSuccess(res, 201, "Período creado", periodCreated); //* Respuesta exitosa con el período creado.
    } catch (error) {
        handleErrorServer(res, 500, error.message); //* Respuesta de error interno del servidor.
    }
}

//* Controlador para obtener un período por id o nombre
export async function getPeriod(req, res) {
    try {
        const { id, name } = req.query;

        const { error } = periodQueryValidation.validate({ id, name }); //* Validación de los parámetros de la query.

        if (error) return handleErrorClient(res, 400, error.message); //* Si hay errores de validación, retorna un error 400.

        const [periodFound, errorPeriod] = await getPeriodService({ idPeriod: id, namePeriod: name }); //* Llama al servicio para obtener el período.

        if (errorPeriod) return handleErrorClient(res, 404, errorPeriod); //* Si no encuentra el período, retorna un error 404.

        handleSuccess(res, 200, "Período encontrado", periodFound); //* Respuesta exitosa con el período encontrado.
    } catch (error) {
        handleErrorServer(res, 500, error.message); //* Respuesta de error interno del servidor.
    }
}

//* Controlador para obtener todos los períodos
export async function getPeriods(req, res) {
    try {
        const [periods, errorPeriods] = await getPeriodsService(); //* Llama al servicio para obtener todos los períodos.

        if (errorPeriods) return handleErrorClient(res, 404, errorPeriods); //* Si no hay períodos, retorna un error 404.

        periods.length === 0
            ? handleSuccess(res, 204, "No se encontraron períodos")
            : handleSuccess(res, 200, "Períodos encontrados", periods); //* Respuesta exitosa con los períodos encontrados.
    } catch (error) {
        handleErrorServer(res, 500, error.message); //* Respuesta de error interno del servidor.
    }
}

//* Controlador para actualizar un período por id o nombre
export async function updatePeriod(req, res) {
    try {
        const { id, name } = req.query;
        const { name: newName, startTime, endTime } = req.body;

        const { error: queryError } = periodQueryValidation.validate({ id, name }); //* Validación de los parámetros de la query.

        if (queryError) return handleErrorClient(res, 400, queryError.message); //* Si hay errores de validación, retorna un error 400.

        const { error: bodyError } = periodBodyValidation.validate({ name: newName, startTime, endTime }); //* Validación del cuerpo de la solicitud.

        if (bodyError) return handleErrorClient(res, 400, bodyError.message); //* Si hay errores de validación, retorna un error 400.

        const [periodUpdated, errorPeriod] = await updatePeriodService(
            { idPeriod: id, namePeriod: name },
            { name: newName, startTime, endTime }
        ); //? Llama al servicio para actualizar el período.

        if (errorPeriod) return handleErrorClient(res, 400, errorPeriod); //* Si ocurre un error al actualizar, retorna un error 400.

        handleSuccess(res, 200, "Período actualizado", periodUpdated); //* Respuesta exitosa con el período actualizado.
    } catch (error) {
        handleErrorServer(res, 500, error.message); //* Respuesta de error interno del servidor.
    }
}

//* Controlador para eliminar un período por id o nombre
export async function deletePeriod(req, res) {
    try {
        const { id, name } = req.query;

        const { error } = periodQueryValidation.validate({ id, name }); //* Validación de los parámetros de la query.

        if (error) return handleErrorClient(res, 400, error.message); //* Si hay errores de validación, retorna un error 400.

        const [periodDeleted, errorPeriod] = await deletePeriodService({ idPeriod: id, namePeriod: name }); //* Llama al servicio para eliminar el período.

        if (errorPeriod) return handleErrorClient(res, 404, errorPeriod); //* Si no encuentra el período, retorna un error 404.

        handleSuccess(res, 200, "Período eliminado", periodDeleted); //* Respuesta exitosa con el período eliminado.
    } catch (error) {
        handleErrorServer(res, 500, error.message); //* Respuesta de error interno del servidor.
    }
}
