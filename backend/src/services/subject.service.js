"use strict";

import { AppDataSource } from "../config/configDB.js";
import Subject from "../models/subject.model.js";
import User from "../models/user.model.js";
import StudentSubjects from "../models/studentSubjects.model.js";

export async function createSubjectService(name, year, level, section, teacherRut) {
    try {
        const subjectRepository = AppDataSource.getRepository(Subject);
        const userRepository = AppDataSource.getRepository(User);

        const teacher = await userRepository.findOne({ where: { rut: teacherRut, role: "Profesor" } });

        if (!teacher) return [null, createErrorMessage({ teacherRut }, "The teacher is not found.")];

        const codigo = generatedSubjectCode(name, year, level, section);

        const newSubject = subjectRepository.create({
            name,
            codigo,
            level,
            year,
            section,
            teacherId: teacher.id
        });

        await subjectRepository.save(newSubject);

        return [newSubject, null];
    } catch (error) {
        console.error("Error al crear una asignatura: ", error);
        return [null, "Internal server error."];
    }
}

export async function getSubject(id) {
    const subjectRepository = AppDataSource.getRepository(Subject);
    const subjectFound = await asignaturaRepository.findOne({ where: { id } });
    if (!subjectFound) return [null, "Asignatura no encontrada"];
    return subjectFound;
}

export async function getAllSubject() {
    const subjectRepository = AppDataSource.getRepository(Subject);
    return await subjectRepository.find();
}

export async function enrollStudentInSubjectService(studentId, subjectId) {
    const studentSubjectsRepository = AppDataSource.getRepository(StudentSubjects);

    const subjectRepository = AppDataSource.getRepository(Subject);

    const userRepository = AppDataSource.getRepository(User);

    const student = await userRepository.findOne({ where: { id: studentId, role: "Alumno" } });

    if (!student) throw new Error("The student is not found.");

    const subject = await subjectRepository.findOne({ where: { id: subjectId } });

    if (!subject) throw new Error("The subject is not found.");

    const enrollment = studentSubjectsRepository.create({ studentId, subjectId });

    const enrollSaved = await studentSubjectsRepository.save(enrollment);

    return enrollSaved;
}

export async function getSubjectByStudentService(studentId) {
    const studentSubjectsRepository = AppDataSource.getRepository(StudentSubjects);

    const subjects = await studentSubjectsRepository.find({
        relations: ["subject", "subject.teacher"],
        where: { studentId }
    });

    return subjects.map(record => record.subject);
}


function generatedSubjectCode(name, year, level, section){
    const subjectCode = name.slice(0, 3).toUpperCase();
    const yearcode = String(year).slice(-2);
    return `${subjectCode}${yearcode}${level}${section.toUpperCase()}`;
};
