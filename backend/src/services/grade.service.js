"use strict";

import Grade from "../models/grade.model.js";
import User from "../models/user.model.js";
import Subject from "../models/subject.model.js";

import { AppDataSource } from "../config/configDB.js";

export async function createGradeService(data){
    try {
        const gradeRepository = AppDataSource.getRepository(Grade); //? Getting the grade repository.
        const userRepository = AppDataSource.getRepository(User); //? Getting the user repository.
        const subjectRepository = AppDataSource.getRepository(Subject); //? Getting the subject repository.

        const alumno = await userRepository.findOne({ where: { id: data.AlumnoId } });
        if (!alumno) return [null, "Student not found."];

        const subject = await subjectRepository.findOne({ where: { id: data.SubjectId } });
        if (!subject) return [null, "Subject not found."];

        const profesor = await userRepository.findOne({ where: { id: data.ProfesorId } });
        if (!profesor) return [null, "Teacher not found."];

        const newGrade = gradeRepository.create({
            alumno: alumno,
            subject: subject,
            profesor: profesor,
            grade: data.grade,
            period: data.period,
        });

        const gradeCreated = await gradeRepository.save(newGrade);
        
        return [gradeCreated, null];
    } catch (error) {
        console.error("An error occurred while creating the grade:", error);
        return [null, "Internal server error."];
    }
};

export async function getGradeService(query){
    try {
        const { idGrade } = query;

        const gradeRepository = AppDataSource.getRepository(Grade);

        const gradeFound = await gradeRepository.findOne({
            where: { id: idGrade },
            relations: ["alumno", "subject", "profesor"],
        });

        if (!gradeFound) return [null, "Grade not found."];

        return [gradeFound, null];
    } catch (error) {
        console.error("An error occurred while finding the grade:", error);
        return [null, "Internal server error."];
    }
};

export async function getGradesService(filters = {}){
    try {
        const gradeRepository = AppDataSource.getRepository(Grade);

        // Construir condiciones dinámicamente en función de los filtros proporcionados
        const conditions = {};

        if (filters.studentId) {
            conditions.Alumno = { id: filters.studentId }; // Relación con el alumno
        }
        if (filters.subjectId) {
            conditions.Subject = { id: filters.subjectId }; // Relación con la asignatura
        }
        if (filters.period) {
            conditions.period = filters.period; // Filtrar por período
        }

        const grades = await gradeRepository.find({
            where: conditions,
            relations: ["alumno", "subject", "profesor"],
        });

        if (!grades || grades.length === 0) return [null, "Grades not found."];

        return [grades, null];
    } catch (error) {
        console.error("An error occurred while finding the grades:", error);
        return [null, "Internal server error."];
    }
};

export async function updateGradeService(id, data){
    try {
        const gradeRepository = AppDataSource.getRepository(Grade);

        const gradeFound = await gradeRepository.findOne({ where: { id } });

        if (!gradeFound) return [null, "Grade not found."];

        const gradeUpdated = await gradeRepository.update(id, data);

        return [gradeUpdated, null];
    } catch (error) {
        console.error("An error occurred while updating the grade:", error);
        return [null, "Internal server error."];
    }
}

export async function deleteGradeService(query){
    try {
        const { idGrade } = query;

        const gradeRepository = AppDataSource.getRepository(Grade);

        const gradeFound = await gradeRepository.findOne({ where: { id: idGrade } });

        if (!gradeFound) return [null, "Grade not found."];

        const gradeDeleted = await gradeRepository.delete(gradeFound.id);

        return [gradeDeleted, null];
    } catch (error) {
        console.error("An error occurred while deleting the grade:", error);
        return [null, "Internal server error."];
    }
};