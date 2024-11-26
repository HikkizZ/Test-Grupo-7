"use strict";

import Grade from "../models/grade.model.js";
import User from "../models/user.model.js";
import Subject from "../models/subject.model.js";

import { AppDataSource } from "../config/configDB.js";

export async function createGradeService(data){ //* This function creates a grade.
    try {
        const gradeRepository = AppDataSource.getRepository(Grade); //? Getting the grade repository.
        const userRepository = AppDataSource.getRepository(User); //? Getting the user repository.
        const subjectRepository = AppDataSource.getRepository(Subject); //? Getting the subject repository.

        const alumno = await userRepository.findOne({ where: { id: data.AlumnoId } }); //? Finding the student by id.
        if (!alumno) return [null, "Student not found."];

        const subject = await subjectRepository.findOne({ where: { id: data.SubjectId } }); //? Finding the subject by id.
        if (!subject) return [null, "Subject not found."];

        const profesor = await userRepository.findOne({ where: { id: data.ProfesorId } }); //? Finding the teacher by id.
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

export async function getGradeService(query){ //* This function gets a grade by id.
    try {
        const { idGrade } = query;

        const gradeRepository = AppDataSource.getRepository(Grade); //? Getting the grade repository.

        const gradeFound = await gradeRepository.findOne({ //? Finding the grade by id.
            where: { id: idGrade },
            relations: ["alumno", "subject", "profesor"], //? Getting the student, subject, and teacher of the grade.
        });

        if (!gradeFound) return [null, "Grade not found."];

        return [gradeFound, null];
    } catch (error) {
        console.error("An error occurred while finding the grade:", error);
        return [null, "Internal server error."];
    }
};

export async function getGradesService(filters = {}){ //* This function gets all the grades. It can be filtered by studentId, subjectId, and period.
    try {
        const gradeRepository = AppDataSource.getRepository(Grade); //? Getting the grade repository.

        const conditions = {}; //? Building conditions dynamically based on the provided filters

        if (filters.studentId) {
            conditions.Alumno = { id: filters.studentId }; // Relation with the student
        }
        if (filters.subjectId) {
            conditions.Subject = { id: filters.subjectId }; // Relation with the subject
        }
        if (filters.period) {
            conditions.period = filters.period; // Period of the grade
        }

        const grades = await gradeRepository.find({ //? Finding all the grades based on the conditions.
            where: conditions,
            relations: ["alumno", "subject", "profesor"], //? Getting the student, subject, and teacher of the grade.
        });

        if (!grades || grades.length === 0) return [null, "Grades not found."];

        return [grades, null];
    } catch (error) {
        console.error("An error occurred while finding the grades:", error);
        return [null, "Internal server error."];
    }
};

export async function updateGradeService(id, data){ //* This function updates a grade by id.
    try {
        const gradeRepository = AppDataSource.getRepository(Grade); //? Getting the grade repository.

        const gradeFound = await gradeRepository.findOne({ where: { id } }); //? Finding the grade by id.

        if (!gradeFound) return [null, "Grade not found."];

        const gradeUpdated = await gradeRepository.update(id, data);

        return [gradeUpdated, null];
    } catch (error) {
        console.error("An error occurred while updating the grade:", error);
        return [null, "Internal server error."];
    }
}

export async function deleteGradeService(query){ //* This function deletes a grade by id.
    try {
        const { idGrade } = query; //? Getting the id of the grade.

        const gradeRepository = AppDataSource.getRepository(Grade);

        const gradeFound = await gradeRepository.findOne({ where: { id: idGrade } }); //? Finding the grade by id.

        if (!gradeFound) return [null, "Grade not found."];

        const gradeDeleted = await gradeRepository.delete(gradeFound.id);

        return [gradeDeleted, null];
    } catch (error) {
        console.error("An error occurred while deleting the grade:", error);
        return [null, "Internal server error."];
    }
};