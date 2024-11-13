"use strict";

import Grade from "../models/grade.model.js";
import { AppDataSource } from "../config/configDB.js";

export async function createGradeService(data){
    try {
        const gradeRepository = AppDataSource.getRepository(Grade);

        const newGrade = gradeRepository.create({
            grade: data.grade,
            Alumno: { id: data.AlumnoId },
            Subject: { id: data.SubjectId },
            Profesor: { id: data.ProfesorId },
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
            relations: ["Alumno", "Subject", "Profesor"],
        });

        if (!gradeFound) return [null, "Grade not found."];

        return [gradeFound, null];
    } catch (error) {
        console.error("An error occurred while finding the grade:", error);
        return [null, "Internal server error."];
    }
};

export async function getGradesService(){
    try {
        const gradeRepository = AppDataSource.getRepository(Grade);

        const grades = await gradeRepository.find({
            relations: ["Alumno", "Subject", "Profesor"],
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

export async function deleteGradeService(id){
    try {
        const gradeRepository = AppDataSource.getRepository(Grade);

        const gradeFound = await gradeRepository.findOne({ where: { id } });

        if (!gradeFound) return [null, "Grade not found."];

        const gradeDeleted = await gradeRepository.delete(id);

        return [gradeDeleted, null];
    } catch (error) {
        console.error("An error occurred while deleting the grade:", error);
        return [null, "Internal server error."];
    }
};