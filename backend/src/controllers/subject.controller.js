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
    subjectBodyValidation
} from "../validations/subject.validation.js";

export async function createSubject(req, res) { //* This function creates a subject.
    try {
        const { name, description, cursoId } = req.body;

        const { error } = subjectBodyValidation.validate({ name, description, cursoId }); //? Validating the body parameters.

        if (error) return handleErrorClient(res, 400, error.message); //? If the body parameters are invalid, return a 400 error.

        const [subjectCreated, errorSubject] = await createSubjectService({ name, description, cursoId }); //? Creating the subject.

        if (errorSubject) return handleErrorClient(res, 400, errorSubject); //? If an error occurred while creating the subject, return a 400 error.

        handleSuccess(res, 201, "Subject created", subjectCreated); //? If the subject is created, return the subject.
    } catch (error) {
        handleErrorServer(res, 500, error.message); //? If an error occurred, return a 500 error.
    }
};

export async function getSubject(req, res) { //* This function gets a subject by id and name.
    try {
        const { id, name } = req.query;

        const { error } = subjectQueryValidation.validate({ id, name }); //? Validating the query parameters.

        if (error) return handleErrorClient(res, 400, error.message); //? If the query parameters are invalid, return a 400 error.

        const [subjectFound, errorSubject] = await getSubjectService({ idSubject: id, nameSubject: name }); //? Getting the subject.

        if (errorSubject) return handleErrorClient(res, 400, errorSubject); //? If an error occurred while getting the subject, return a 400 error.

        handleSuccess(res, 200, "Subject found", subjectFound); //? If the subject is found, return the subject.
    } catch (error) {
        handleErrorServer(res, 500, error.message); //? If an error occurred, return a 500 error.
    }
};

export async function getSubjects(req, res) { //* This function gets all the subjects.
    try {
        const [subjects, errorSubjects] = await getSubjectsService(); //? Getting the subjects.

        if (errorSubjects) return handleErrorClient(res, 400, errorSubjects); //? If an error occurred while getting the subjects, return a 400 error.

        handleSuccess(res, 200, "Subjects found", subjects); //? If the subjects are found, return the subjects.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message); //? If an error occurred, return a 500 error.
    }
};

export async function updateSubject(req, res) { //* This function updates a subject by id and name.
    try {
        const { id, name } = req.query;

        const { body } = req;

        const { error: queryError } = subjectQueryValidation.validate({ id, name }); //? Validating the query parameters.

        if (queryError) return handleErrorClient(res, 400, queryError.message); //? If the query parameters are invalid, return a 400 error.
        
        const { error: bodyError } = subjectBodyValidation.validate(body); //? Validating the body parameters.

        if (bodyError) return handleErrorClient(res, 400, bodyError.message); //? If the body parameters are invalid, return a 400 error.
        const [subjectUpdated, errorSubject] = await updateSubjectService({ idSubject: id, nameSubject: name }, body); //? Updating the subject.

        if (errorSubject) return handleErrorClient(res, 400, errorSubject); //? If an error occurred while updating the subject, return a 400 error.

        handleSuccess(res, 200, "Subject updated", subjectUpdated); //? If the subject is updated, return the subject.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message); //? If an error occurred, return a 500 error.
    }
};

export async function deleteSubject(req, res) { //* This function deletes a subject by id and name.
    try {
        const { id, name } = req.query;
        console.log(id, name);

        const { error } = subjectQueryValidation.validate({ id, name }); //? Validating the query parameters.

        if (error) return handleErrorClient(res, 400, error.message); //? If the query parameters are invalid, return a 400 error.

        const [subjectDeleted, errorSubject] = await deleteSubjectService({ idSubject: id, nameSubject: name }); //? Deleting the subject.

        if (errorSubject) return handleErrorClient(res, 400, errorSubject); //? If an error occurred while deleting the subject, return a 400 error.

        handleSuccess(res, 200, "Subject deleted", subjectDeleted); //? If the subject is deleted, return the subject.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message); //? If an error occurred, return a 500 error.
    }
};