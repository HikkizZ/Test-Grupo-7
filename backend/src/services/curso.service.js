"use strict";

import Curso from '../models/curso.model.js';
import { AppDataSource } from '../config/configDB.js';

export async function getCursoService(query) { //* This function gets a course by id, code, and name.
    try {
        const { idCurso, codeCurso, nameCurso } = query;

        const cursoRepository = AppDataSource.getRepository(Curso); //? Getting the course repository.

        const cursoFound = await cursoRepository.findOne({ //? Finding the course by id, code, and name.
            where: [{ id: idCurso }, { code: codeCurso }, { name: nameCurso }],
        });

        if (!cursoFound) return [null, "No se ha encontrado el curso."]; //? If the course is not found, return null and a message.

        return [cursoFound, null];
    } catch (error) {
        console.error("Ocurró un error al encontrar el curso:", error);
        return [null, "Error interno del servidor."];
    }
};

export async function getCursosService() { //* This function gets all the courses.
    try {
        const cursoRepository = AppDataSource.getRepository(Curso); //? Getting the course repository.

        const cursos = await cursoRepository.find({ 
            relations: ["subjects"], //? Getting the subjects of the courses.
        }); //? Finding all the courses.

        if (!cursos || cursos.length === 0) return [null, "Cursos no encontrados."]; //? If the courses are not found, return null and a message.

        return [cursos, null];
    } catch (error) {
        console.error("Ocurrió un error al encontrar los cursos:", error);
        return [null, "Error interno del servidor."];
    }
};

export async function createCursoService(body) { //* This function creates a course.
    try {
        const cursoRepository = AppDataSource.getRepository(Curso); //? Getting the course repository.

        const cursoExist = await cursoRepository.findOne({
            where: { name: body.name },
        }); //? Finding the course by name.

        if (cursoExist) return [null, "El curso ya existe."];

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
        return [null, "Error interno del servidor."];
    }
};

export async function updateCursoService(query, body) { //* This function updates a course by id, code, and name.
    try {
        const { idCurso, codeCurso, nameCurso } = query;

        const cursoRepository = AppDataSource.getRepository(Curso); //? Getting the course repository.

        const cursoFound = await cursoRepository.findOne({ //? Finding the course by id, code, and name.
            where: [{ id: idCurso }, { code: codeCurso }, { name: nameCurso }],
        });

        if (!cursoFound) return [null, "Curso no encontrado."]; //? If the course is not found, return null and a message.

        const existingCurso = await cursoRepository.findOne({ //? Finding the course by code and name.
            where: [
                { code: body.code },
                { name: body.name }
            ]
        });

        if (existingCurso) return [null, "El curso ya existe."]; //? If the course already exists, return null and a message.

        const cursoUpdated = await cursoRepository.save({ ...cursoFound, ...body }); //? Updating the course.

        return [cursoUpdated, null];
    } catch (error) {
        console.error("Ocurrió un error al actualizar el curso:", error);
        return [null, "Error interno del servidor."];
    }
};

export async function deleteCursoService(query) { //* This function deletes a course by id, code, and name.
    try {
        const { idCurso, codeCurso, nameCurso } = query;

        const cursoRepository = AppDataSource.getRepository(Curso); //? Getting the course repository.

        const cursoFound = await cursoRepository.findOne({ //? Finding the course by id, code, and name.
            where: [{ id: idCurso }, { code: codeCurso }, { name: nameCurso }],
        });

        if (!cursoFound) return [null, "Curso no encontrado."]; //? If the course is not found, return null and a message.

        const cursoDeleted = await cursoRepository.remove(cursoFound); //? Removing the course.

        return [cursoDeleted, null];
    } catch (error) {
        console.error("Ocurrió un error al eliminar el curso:", error);
        return [null, "Error interno del servidor."];
    }
};

function generatedSubjectCode(year, level, section){ //* This function generates the course code.
    const yearcode = String(year).slice(-2); //? Getting the last two digits of the year.
    return `${level}${section.toUpperCase()}${'-'}${yearcode}`; //? Returning the course code. For example: 1A-24
};