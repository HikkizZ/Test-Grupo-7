"use strict";

import {
    addGrade
} from "../services/grades.service.js";

import {
    handleSuccess,
    //handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";

export async function createGrade(req, res) {
    try {
        const { studentId, subject, grade, weight } = req.body;
        const teacherId = req.user.id; // Asumimos que el usuario autenticado es el profesor
        const newGrade = await addGrade(studentId, teacherId, subject, grade, weight);
        res.status(201).json(newGrade);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}