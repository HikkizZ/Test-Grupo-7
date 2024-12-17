"use strict";

import { AppDataSource } from '../config/configDB.js';
import Curso from '../models/curso.model.js';
import User from '../models/user.model.js';
import { In } from 'typeorm';

export async function getCursoService(query) { //* This function gets a course by id, code, and name.
    try {
        const { idCurso, codeCurso, nameCurso } = query;

        const cursoRepository = AppDataSource.getRepository(Curso); //? Getting the course repository.

        const cursoFound = await cursoRepository.findOne({ //? Finding the course by id, code, and name.
            where: [{ id: idCurso }, { code: codeCurso }, { name: nameCurso }],
        });

        if (!cursoFound) return [null, "No se ha encontrado el curso."]; //? If the course is not found, return null and a message.

        return [{
            cursoFound: { //? Returning the course. Se muestra el id, nombre, nivel, año, sección y código del curso.
                name: cursoFound.name,
                code: cursoFound.code,
                subjects: cursoFound.subjects,
                students: cursoFound.students.map(student => ({ //? Getting the students of the course.
                    name: student.name,
                    rut: student.rut,
                    email: student.email,
                })),
            },
        }, null];
    } catch (error) {
        console.error("Ocurró un error al encontrar el curso:", error);
        return [null, "Error interno del servidor"];
    }
};

export async function getCursosService() { //* This function gets all the courses.
    try {
        const cursoRepository = AppDataSource.getRepository(Curso); //? Getting the course repository.

        const cursos = await cursoRepository.find({ 
            relations: ["subjects", "students"], //? Getting the subjects of the courses.
        }); //? Finding all the courses.

        if (!cursos || cursos.length === 0) return [null, "Cursos no encontrados."]; //? If the courses are not found, return null and a message.

        return [{
            cursos: cursos.map(curso => ({ //? Returning the courses. Se muestra el id, nombre, nivel, año, sección y código del curso.
                id: curso.id,
                name: curso.name,
                code: curso.code,
                level: curso.level,
                section: curso.section,
                year: curso.year,
                subjects: curso.subjects,
                students: curso.students.map(student => ({ //? Getting the students of the course.
                    name: student.name,
                    rut: student.rut,
                    email: student.email,
                })),
            })),
        }, null];
    } catch (error) {
        console.error("Ocurrió un error al encontrar los cursos:", error);
        return [null, "Error interno del servidor"];
    }
};

export async function createCursoService(body) { //* This function creates a course.
    try {
        const cursoRepository = AppDataSource.getRepository(Curso); //? Getting the course repository.

        const cursoExist = await cursoRepository.findOne({ //? Finding the course by name or code.
            where: [
                { name: body.name },
                { code: generatedSubjectCode(body.year, body.level, body.section) }
            ]
        }); 

        if (cursoExist) return [null, "Error al crear el curso. El curso ya existe"]; //? If the course already exists, return null and a message.

        const newCurso = cursoRepository.create({
            name: body.name,
            level: body.level,
            year: body.year,
            section: body.section,
            code: generatedSubjectCode(body.year, body.level, body.section), //? Generating the course code.
        }); 

        const cursoCreated = await cursoRepository.save(newCurso); //? Saving the new course.

        return [cursoCreated, null];
    } catch (error) {
        console.error("Ocurrió un error al crear el curso:", error);
        return [null, "Error interno del servidor"];
    }
};

export async function updateCursoService(query, body) { //* This function updates a course by id, code, and name.
    console.log("query:", query);
    console.log("body:", body);
    try {
        const { idCurso, codeCurso } = query;

        const cursoRepository = AppDataSource.getRepository(Curso); //? Getting the course repository.

        const cursoFound = await cursoRepository.findOne({ //? Finding the course by id, code, and name.
            where: [{ id: idCurso }, { code: codeCurso }],
        });

        if (!cursoFound) return [null, "Curso no encontrado"]; //? If the course is not found, return null and a message.

        const existingCurso = await cursoRepository.findOne({ //? Finding the course by code and name.
            where: [
                { code: body.code },
                { name: body.name }
            ]
        });

        if (existingCurso) return [null, "Ya existe un curso con estos datos"]; //? If the course already exists, return null and a message.

        const newCode = generatedSubjectCode(body.year, body.level, body.section); //? Generating the course code.
        
        const existingCode = await cursoRepository.findOne({ where: { code: newCode } }); //? Finding the course by code.
        if (existingCode) return [null, "Ya existe un curso con estos datos"]; //? If the course already exists, return null and a message.

        cursoFound.code = newCode; //? Updating the course code.
        
        const cursoUpdated = await cursoRepository.save({ ...cursoFound, ...body }); //? Updating the course.

        return [{
            cursoUpdated: { //? Returning the course. Se muestra el id, nombre, nivel, año, sección y código del curso.
                name: cursoUpdated.name,
                code: cursoUpdated.code,
                level: cursoUpdated.level,
                section: cursoUpdated.section,
                year: cursoUpdated.year,
                subjects: cursoUpdated.subjects,
                students: cursoUpdated.students
            },
        }, null];
    } catch (error) {
        console.error("Ocurrió un error al actualizar el curso:", error);
        return [null, "Error interno del servidor"];
    }
};

export async function deleteCursoService(query) { //* This function deletes a course by id, code, and name.
    try {
        const { idCurso, codeCurso, nameCurso } = query;

        const cursoRepository = AppDataSource.getRepository(Curso); //? Getting the course repository.

        const cursoFound = await cursoRepository.findOne({ //? Finding the course by id, code, and name.
            where: [{ id: idCurso }, { code: codeCurso }, { name: nameCurso }],
        });

        if (!cursoFound) return [null, "Curso no encontrado"]; //? If the course is not found, return null and a message.

        const cursoDeleted = await cursoRepository.remove(cursoFound); //? Removing the course.

        return [cursoDeleted, null];
    } catch (error) {
        console.error("Ocurrió un error al eliminar el curso:", error);
        return [null, "Error interno del servidor"];
    }
};

export async function addStudentsToCursoService(cursoCode, studentsRut) {
    try {
        const cursoRepository = AppDataSource.getRepository(Curso); //? Getting the course repository.
        const userRepository = AppDataSource.getRepository(User); //? Getting the user repository.

        const cursoFound = await cursoRepository.findOne({ where: { code: cursoCode }, relations: ['students'] }); //? Finding the course by code.
        if (!cursoFound) return [null, "Curso no encontrado"]; //? If the course is not found, return null and a message.
        console.log("studentsRut:", studentsRut);
        const students = await userRepository.find({ where: { rut: In(studentsRut), role: 'alumno'} }); //? Finding the students by rut.
        console.log("students:", students);
        if (!students || students.length === 0) return [null, "Estudiantes no encontrados"]; //? If the students are not found, return null and a message.
        
        students.forEach(student => {
            student.curso = cursoFound;
        }); //? Adding the students to the course.

        await userRepository.save(students); //? Saving the students.

        const updateCurso = await cursoRepository.findOne({ where: { code: cursoCode }, relations: ['students'] }); //? Finding the course by code.

        return [updateCurso, null];
    } catch (error) {
        console.error("Ocurrió un error al agregar los estudiantes al curso:", error);
        return [null, "Error interno del servidor"];
    }
};

export async function assingSubjectsToStudentsService(query) {
    try {
        const cursoRepository = AppDataSource.getRepository(Curso); //? Getting the course repository.

        const cursoFound = await cursoRepository.findOne({
            where: { code: query }, relations: ['students', 'subjects']
        }); //? Finding the course by code.

        console.log("cursoFound:", cursoFound);

        if (!cursoFound) return [null, "Curso no encontrado"]; //? If the course is not found, return null and a message.

        const { students, subjects } = cursoFound; //? Getting the students and subjects of the course.

        console.log("students:", students);
        console.log("subjects:", subjects);

        const studentSubjects = students.flatMap(student => {
            return subjects.map(subject => ({
                student_rut: student.rut,
                subject_id: subject.id,
            }));
        }); //? Getting the subjects of the students.

        await AppDataSource
            .createQueryBuilder()
            .insert()
            .into('student_subjects')
            .values(studentSubjects)
            .orIgnore()
            .execute(); //? Inserting the subjects of the students.

        return [{
            students: students.map(student => ({ //? Returning the students. Se muestra el nombre, rut y email del estudiante.
                name: student.name,
                rut: student.rut,
                email: student.email,
                subjects: subjects.map(subject => ({ //? Getting the subjects of the students.
                    id: subject.id,
                    name: subject.name
                })),
            })),
        }, null];
    } catch (error) {
        console.error("Ocurrió un error al asignar las asignaturas a los estudiantes:", error);
        return [null, "Error interno del servidor"];
    }
}

function generatedSubjectCode(year, level, section){ //* This function generates the course code.
    const yearcode = String(year).slice(-2); //? Getting the last two digits of the year.
    return `${level}${section.toUpperCase()}${'-'}${yearcode}`; //? Returning the course code. For example: 1A-24
};
