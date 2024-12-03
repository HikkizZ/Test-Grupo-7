"use strict";

import {
    createCursoService,
    deleteCursoService,
    getCursosService,
    getCursoService,
    updateCursoService
} from "../services/curso.service.js";

import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";

import {
    createCursoBodyValidation,
    updateCursoBodyValidation,
    cursoQueryValidation,
} from "../validations/curso.validation.js";

export async function createCurso(req, res) { //* This function creates a course.
    try {
        const { name, level, year, section } = req.body; //? Getting the body parameters: name, level, year, section.

        const { error } = createCursoBodyValidation.validate({ name, level, year, section }); //? Validating the body parameters.

        if (error) return handleErrorClient(res, 400, error.message); //? If the body parameters are invalid, return a 400 error.

        const [cursoCreated, errorCurso] = await createCursoService({ name, level, year, section }); //? Creating the course.

        if (errorCurso) return handleErrorClient(res, 400, errorCurso); //? If an error occurred while creating the course, return a 400 error.

        handleSuccess(res, 201, "Curso creado", cursoCreated); //? If the course is created, return the course.
    } catch (error) {
        handleErrorServer(res, 500, error.message); //? If an error occurred, return a 500 error.
    }
};

export async function getCurso(req, res) { //* This function gets a course by id, code, and name.
    try {
        const { id, code, name } = req.query; //? Getting the query parameters: id, code, name.

        const { error } = cursoQueryValidation.validate({ id, code, name }); //? Validating the query parameters.

        if (error) return handleErrorClient(res, 400, error.message); //? If the query parameters are invalid, return a 400 error.

        const [cursoFound, errorCurso] = await getCursoService({ idCurso: id, codeCurso: code, nameCurso: name }); //? Getting the course.

        if (errorCurso) return handleErrorClient(res, 400, errorCurso); //? If an error occurred while getting the course, return a 400 error.

        handleSuccess(res, 200, "Curso encontrado", cursoFound); //? If the course is found, return the course.
    } catch (error) {
        handleErrorServer(res, 500, error.message); //? If an error occurred, return a 500 error.
    }
};

export async function getCursos(req, res) { //* This function gets all the courses.
    try {
        const [cursos, errorCursos] = await getCursosService(); //? Getting the courses.

        if (errorCursos) return handleErrorClient(res, 400, errorCursos); //? If an error occurred while getting the courses, return a 400 error.

        handleSuccess(res, 200, "Cursos encontrados", cursos); //? If the courses are found, return the courses.
    } catch (error) {
        handleErrorServer(res, 500, error.message); //? If an error occurred, return a 500 error.
    }
};

export async function updateCurso(req, res) { //* This function updates a course by id, code, and name.
    try {
        const { id, code, name } = req.query; //? Getting the query parameters: id, code, name.
        const { name: newName, level, year, section } = req.body; //? Getting the body parameters: name, level, year, section.

        const { error } = cursoQueryValidation.validate({ id, code, name }); //? Validating the query parameters.

        if (error) return handleErrorClient(res, 400, error.message); //? If the query parameters are invalid, return a 400 error.

        const { error: errorBody } = updateCursoBodyValidation.validate({ name: newName, level, year, section }); //? Validating the body parameters.

        if (errorBody) return handleErrorClient(res, 400, errorBody.message); //? If the body parameters are invalid, return a 400 error.

        const [cursoUpdated, errorCurso] = await updateCursoService({ idCurso: id, codeCurso: code, nameCurso: name }, { name: newName, level, year, section }); //? Updating the course.

        if (errorCurso) return handleErrorClient(res, 400, errorCurso); //? If an error occurred while updating the course, return a 400 error.

        handleSuccess(res, 200, "Curso actualizado", cursoUpdated); //? If the course is updated, return the course.
    } catch (error) {
        handleErrorServer(res, 500, error.message); //? If an error occurred, return a 500 error.
    }
};

export async function deleteCurso(req, res) { //* This function deletes a course by id, code, and name.
    try {
        const { id, code, name } = req.query; //? Getting the query parameters: id, code, name.

        const { error } = cursoQueryValidation.validate({ id, code, name }); //? Validating the query parameters.

        if (error) return handleErrorClient(res, 400, error.message); //? If the query parameters are invalid, return a 400 error.

        const [cursoDeleted, errorCurso] = await deleteCursoService({ idCurso: id, codeCurso: code, nameCurso: name }); //? Deleting the course.

        if (errorCurso) return handleErrorClient(res, 400, errorCurso); //? If an error occurred while deleting the course, return a 400 error.

        handleSuccess(res, 200, "Curso eliminado", cursoDeleted); //? If the course is deleted, return the course.
    } catch (error) {
        handleErrorServer(res, 500, error.message); //? If an error occurred, return a 500 error.
    }
};