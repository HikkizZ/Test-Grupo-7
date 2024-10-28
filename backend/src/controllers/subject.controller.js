"use strict";

import {
    createSubjectService,
    getSubject,
    getAllSubject,
    enrollStudentInSubjectService
} from "../services/subject.service.js";

import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";

export async function createSubject(req, res) {
    const { name, year, level, section, teacherRut } = req.body;
    try {
        const [newSubject, errorMessage] = await createSubjectService(name, year, level, section, teacherRut);
        if (errorMessage) {
            res.status(400).json({ message: errorMessage });
        } else {
            res.status(201).json(newSubject);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getAllSubjects(req, res) {
    try{
        const subjects = await getAllSubject();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getSubjectById(req, res) {
    const { id } = req.params;
    try {
        const subject = await getSubject(id);
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getSubjectByStudent(req, res) {
    try {
        const { studentId } = req.params;

        const subjects = await getSubjectByStudentService(studentId);
        handleSuccess(res, 200, "Subjects found successfully", subjects);
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message);
    }
}

export async function enrollStudentInSubject(req, res) {
    try {
        const { studentId, subjectId } = req.body;

        const [enrollment, errorMessage ] = await enrollStudentInSubjectService(studentId, subjectId);

        if (errorMessage) {
            handleErrorClient(res, 400, errorMessage);
        } else {
            handleSuccess(res, 201, "Student enrolled in subject successfully", enrollment);
        }
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message);
    }
}

export async function assignTeacherToSubject(req, res) {
    try {
        const { teacherRut, subjectId } = req.body;

        const userRepository = AppDataSource.getRepository(User);

        const subjectRepository = AppDataSource.getRepository(Subject);

        const teacher = await userRepository.findOne({ where: { rut: teacherRut, role: "Profesor" } });

        if (!teacher) { handleErrorClient(res, 404, "The teacher is not found."); }

        const subject = await subjectRepository.findOne({ where: { id: subjectId } });

        if (!subject) { handleErrorClient(res, 404, "The subject is not found."); }

        subject.teacherId = teacher.id;

        assignment = await subjectRepository.save(subject);

        handleSuccess(res, 200, "Teacher assigned to subject successfully", assignment);
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message);
    }
}