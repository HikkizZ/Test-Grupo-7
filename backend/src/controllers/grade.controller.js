"use strict";

import {
    createGradeService,
    getGradeService,
    getGradesService,
    updateGradeService,
    deleteGradeService
} from "../services/grade.service.js";

import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";

import {
    gradeQueryValidation,
    gradeBodyValidation
} from "../validations/grade.validation.js";

export async function createGrade(req, res) { //* This function creates a grade.
    try {
        const { grade, AlumnoId, SubjectId, ProfesorId, period } = req.body;

        const { error } = gradeBodyValidation.validate({ grade, AlumnoId, SubjectId, ProfesorId }); //? Validating the body parameters.

        if (error) return handleErrorClient(res, 400, error.message); //? If the body parameters are invalid, return a 400 error.

        const [gradeCreated, errorGrade] = await createGradeService({ grade, AlumnoId, SubjectId, ProfesorId, period }); //? Creating the grade.

        if (errorGrade) return handleErrorClient(res, 400, errorGrade); //? If an error occurred while creating the grade, return a 400 error.

        handleSuccess(res, 201, "Grade created", gradeCreated); //? If the grade is created, return the grade.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error", error.message); //? If an error occurred, return a 500 error.
    }
};

export async function getGrade(req, res) { //* This function gets a grade by id.
    try {
        const { id } = req.query;

        const { error } = gradeQueryValidation.validate({ id }); //? Validating the query parameters.

        if (error) return handleErrorClient(res, 400, error.message); //? If the query parameters are invalid, return a 400 error.

        const [gradeFound, errorGrade] = await getGradeService({ idGrade: id }); //? Getting the grade.

        if (errorGrade) return handleErrorClient(res, 400, errorGrade); //? If an error occurred while getting the grade, return a 400 error.

        handleSuccess(res, 200, "Grade found", gradeFound); //? If the grade is found, return the grade.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error", error.message); //? If an error occurred, return a 500 error.
    }
};

export async function getGrades(req, res) { //* This function gets all the grades.
    try {
        const [grades, errorGrades] = await getGradesService(); //? Getting the grades.

        if (errorGrades) return handleErrorClient(res, 400, errorGrades); //? If an error occurred while getting the grades, return a 400 error.

        handleSuccess(res, 200, "Grades found", grades); //? If the grades are found, return the grades.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error", error.message); //? If an error occurred, return a 500 error.
    }
};

export async function updateGrade(req, res) { //* This function updates a grade by id.
    try {
        const { id } = req.query;
        const data = req.body;

        const { error } = gradeQueryValidation.validate({ id }); //? Validating the query parameters.

        if (error) return handleErrorClient(res, 400, error.message); //? If the query parameters are invalid, return a 400 error.

        const [gradeUpdated, errorGrade] = await updateGradeService(id, data); //? Updating the grade.

        if (errorGrade) return handleErrorClient(res, 400, errorGrade); //? If an error occurred while updating the grade, return a 400 error.

        handleSuccess(res, 200, "Grade updated", gradeUpdated); //? If the grade is updated, return the grade.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error", error.message); //? If an error occurred, return a 500 error.
    }
}

export async function deleteGrade(req, res) { //* This function deletes a grade by id.
    try {
        const { id } = req.query;

        const { error } = gradeQueryValidation.validate({ id }); //? Validating the query parameters.

        if (error) return handleErrorClient(res, 400, error.message); //? If the query parameters are invalid, return a 400 error.

        const [gradeDeleted, errorGrade] = await deleteGradeService({ idGrade: id }); //? Deleting the grade.

        if (errorGrade) return handleErrorClient(res, 400, errorGrade); //? If an error occurred while deleting the grade, return a 400 error.

        handleSuccess(res, 200, "Grade deleted", gradeDeleted); //? If the grade is deleted, return the grade.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error", error.message); //? If an error occurred, return a 500 error.
    }
};