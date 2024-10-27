"use strict";

import Grade from "../models/grades.model.js";
import { AppDataSource } from "../config/configDB.js";

export async function addGrade(studentId, teacherId, subject, grade, weight) {
    const gradeRepository = AppDataSource.getRepository(Grade);

    const newGrade = gradeRepository.create({
        studentId,
        teacherId,
        subject,
        grade,
        weight,
    });

    await gradeRepository.save(newGrade);
    return newGrade;
}