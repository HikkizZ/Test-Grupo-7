"use strict";

import {
    getSubjectService,
    getSubjectsService,
    createSubjectService,
    updateSubjectService,
    deleteSubjectService
} from "../services/subject.service.js";

import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";

import {
    subjectQueryValidation,
    createSubjectBodyValidation,
    updateSubjectBodyValidation
} from "../validations/subject.validation.js";

export async function createSubject(req, res) { //* This function creates a subject.
    try {
        const { name, description, cursoCode, rutProfesor } = req.body; //? Getting the body parameters: name, description, cursoCode.

        const { error } = createSubjectBodyValidation.validate({ name, description, cursoCode, rutProfesor }); //? Validating the body parameters.

        if (error) return handleErrorClient(res, 400, "Validation Error", [error.message]);

        const [subjectCreated, errorSubject] = await createSubjectService({ name, description, cursoCode, rutProfesor }); //? Creating the subject.

        if (errorSubject) return handleErrorClient(res, 400, "Error al crear la asignatura", errorSubject); //? If an error occurred while creating the subject, return a 400 error.

        handleSuccess(res, 201, "Asignatura creada exitosamente", subjectCreated); //? If the subject is created, return the subject.
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error.message); //? If an error occurred, return a 500 error.
    }
};

export async function getSubject(req, res) { //* This function gets a subject by id and name.
    try {
        const { id, code } = req.query; //? Getting the query parameters: id, name.

        const { error } = subjectQueryValidation.validate({ id, code }); //? Validating the query parameters.

        if (error) return handleErrorClient(res, 400, error.message); //? If the query parameters are invalid, return a 400 error.

        const [subjectFound, errorSubject] = await getSubjectService({ idSubject: id, codeSubject: code }); //? Getting the subject.

        if (errorSubject) return handleErrorClient(res, 400, errorSubject); //? If an error occurred while getting the subject, return a 400 error.

        handleSuccess(res, 200, "Asignatura encontrada", subjectFound); //? If the subject is found, return the subject.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message); //? If an error occurred, return a 500 error.
    }
};

export async function getSubjects(req, res) { //* This function gets all the subjects.
    try {
        const [subjects, errorSubjects] = await getSubjectsService(); //? Getting the subjects.

        if (errorSubjects) return handleErrorClient(res, 400, errorSubjects); //? If an error occurred while getting the subjects, return a 400 error.

        handleSuccess(res, 200, "Asignaturas encontradas", subjects); //? If the subjects are found, return the subjects.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message); //? If an error occurred, return a 500 error.
    }
};

export async function updateSubject(req, res) { //* This function updates a subject by id and name.
    try {
        const { id, code } = req.query; //? Getting the query parameters: id, name.

        const { name, description, cursoCode, rutProfesor } = req.body; //? Getting the body parameters.

        const { error: queryError } = subjectQueryValidation.validate({ id, code }); //? Validating the query parameters.
        if (queryError) return handleErrorClient(res, 400, queryError.message); //? If the query parameters are invalid, return a 400 error.
        
        const { error: bodyError } = updateSubjectBodyValidation.validate({ name, description, cursoCode, rutProfesor }); //? Validating the body parameters.
        if (bodyError) return handleErrorClient(res, 400, bodyError.message); //? If the body parameters are invalid, return a 400 error.
        
        const [subjectUpdated, errorSubject] = await updateSubjectService({ idSubject: id, codeSubject: code }, { name, description, cursoCode, rutProfesor }); //? Updating the subject.

        if (errorSubject) return handleErrorClient(res, 400, errorSubject); //? If an error occurred while updating the subject, return a 400 error.

        handleSuccess(res, 200, "Asignatura actualizada exitosamente", subjectUpdated); //? If the subject is updated, return the subject.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message); //? If an error occurred, return a 500 error.
    }
};

export async function deleteSubject(req, res) { //* This function deletes a subject by id and name.
    try {
        const { id, code } = req.query; //? Getting the query parameters: id, name.

        const { error } = subjectQueryValidation.validate({ id }); //? Validating the query parameters.

        if (error) return handleErrorClient(res, 400, error.message); //? If the query parameters are invalid, return a 400 error.

        const [subjectDeleted, errorSubject] = await deleteSubjectService({ idSubject: id, codeSubject: code }); //? Deleting the subject.

        if (errorSubject) return handleErrorClient(res, 400, errorSubject); //? If an error occurred while deleting the subject, return a 400 error.

        handleSuccess(res, 200, "Asignatura eliminada exitosamente", subjectDeleted); //? If the subject is deleted, return the subject.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message); //? If an error occurred, return a 500 error.
    }
};
