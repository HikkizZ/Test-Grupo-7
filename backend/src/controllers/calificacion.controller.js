"use strict";

import {
    configCalificacionesService,
    updateConfigCalificacionesService,
    getCalificacionesService,
    assignGradesStudentsService,
    calificarAlumnoService
} from "../services/calificacion.service.js";

import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";

export async function configCalificaciones(req, res) {
    try {
        const { codeSubject, cantidad } = req.body;

        if (!codeSubject || !cantidad) return handleErrorClient(res, 400, "Faltan parámetros");

        const [calificaciones, error] = await configCalificacionesService({ codeSubject: codeSubject, cantidad: cantidad });

        if (error) return handleErrorClient(res, 400, error);

        handleSuccess(res, 201, "Calificaciones configuradas", calificaciones);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
};

export async function updateConfigCalificaciones(req, res) {
    try {
        const { codeSubject } = req.query;
        const { cantidad } = req.body;

        if (!codeSubject || !cantidad) return handleErrorClient(res, 400, "Faltan parámetros");

        const [calificaciones, error] = await updateConfigCalificacionesService({ codeSubject: codeSubject }, { cantidad: cantidad });

        if (error) return handleErrorClient(res, 400, error);

        handleSuccess(res, 200, "Calificaciones actualizadas", calificaciones);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
};

export async function getCalificaciones(req, res) {
    try {
        const { codeSubject } = req.query;

        if (!codeSubject) return handleErrorClient(res, 400, "Faltan parámetros");

        const [calificaciones, error] = await getCalificacionesService({ codeSubject: codeSubject });

        if (error) return handleErrorClient(res, 400, error);

        handleSuccess(res, 200, "Calificaciones obtenidas exitosamente", calificaciones);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
};

export async function assignGradesStudents(req, res) {
    try {
        const { codeSubject } = req.query;

        if (!codeSubject) return handleErrorClient(res, 400, "Faltan parámetros");

        const [userNotas, error] = await assignGradesStudentsService({ codeSubject: codeSubject });

        if (error) return handleErrorClient(res, 400, error);

        handleSuccess(res, 201, "Notas asignadas exitosamente", userNotas);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
}; 

export async function calificarAlumno(req, res) {
    try {
        const { rutUser, idCalificacion, nota } = req.body;
        console.log(rutUser, idCalificacion, nota);

        if (!rutUser || !idCalificacion || !nota) return handleErrorClient(res, 400, "Faltan parámetros");

        const [userNotas, error] = await calificarAlumnoService({ studentRut: rutUser, idCalificacion: idCalificacion, nota: nota });

        if (error) return handleErrorClient(res, 400, error);

        handleSuccess(res, 201, "Nota asignada exitosamente", userNotas);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
}