"use strict";

import {
    addGrade
} from "../services/grades.service.js";

import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";

export async function createGrade(req, res) {
    try {
        const { studentId, subject, grade, weight } = req.body;
        const teacherId = req.user.id; // Asumimos que el usuario autenticado es el profesor
        const newGrade = await addGrade(studentId, teacherId, subject, grade, weight);
        handleSuccess(res, 201, "Grade created successfully", newGrade);
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message);
    }
}

export async function getGradesByStudent(req, res) {
    try {
        const { studentId, subjectId } = req.params;

        const grades = await gradeRepository.find({
            where: { studentId, subjectId }
        });

        const total = grades.reduce((sum, grade) => sum + grade.grade, 0);
        const averageSubject = grades.length ? total / grades.length : 0;

        handleSuccess(res, 200, "Grades found successfully", { grades, averageSubject });
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message);
    }
}