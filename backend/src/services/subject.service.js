"use strict";

import { AppDataSource } from "../config/configDB.js";
import Subject from "../models/subject.model.js";
import Curso from "../models/curso.model.js";
import User from "../models/user.model.js";
import { Not } from "typeorm";

export async function getSubjectService(query) { //* This function gets a subject by id and name.
    try {
        const { idSubject, codeSubject } = query; //? Getting the id and name of the subject.

        const subjectRepository = AppDataSource.getRepository(Subject); //? Getting the subject repository.

        const subjectFound = await subjectRepository.findOne({ //? Finding the subject by id and name.
            where: [{ id: idSubject }, { code: codeSubject }],
            relations: ["curso", "teacher"],
        });

        if (!subjectFound) return [null, "Asingatura no encontrada"]; //? If the subject is not found, return null and a message.

        return [subjectFound, null];
    } catch (error) {
        console.error("An error occurred while getting the subject:", error);
        return [null, "Internal server error."];
    }
};

export async function getSubjectsService() { //* This function gets all the subjects.
    try {
        const subjectRepository = AppDataSource.getRepository(Subject); //? Getting the subject repository.

        const subjects = await subjectRepository.find({ //? Finding all the subjects.
            relations: ["curso", "teacher"], //? Getting the course and teacher of the subjects.
        });

        if (!subjects || subjects.length === 0) return [null, "Asignaturas no encontradas"]; //? If the subjects are not found, return null and a message.

        return [subjects, null];
    } catch (error) {
        console.error("An error occurred while getting the subjects:", error);
        return [null, "Internal server error."];
    }
};

export async function createSubjectService(body) { //* This function creates a subject.
    try {
        const subjectRepository = AppDataSource.getRepository(Subject); //? Getting the subject repository.
        const cursoRepository = AppDataSource.getRepository(Curso); //? Getting the course repository.
        const userRepository = AppDataSource.getRepository(User); //? Getting the user repository.

        const { name, description, cursoCode, rutProfesor } = body; //? Getting the body parameters: name, description, cursoCode.

        //° Verificar si el curso existe.
        const cursoFound = await cursoRepository.findOne({ where: { code: cursoCode } }); //? Finding the course by id.
        if (!cursoFound) return [null, "Curso no encontrado."]; //? If the course is not found, return null and a message.

        //° Verificar si el profesor existe.
        const teacherFound = await userRepository.findOne({
            where: { rut: rutProfesor, role: "profesor"} }); //? Finding the teacher by rut.
        if (!teacherFound) return [null, "Profesor no encontrado."]; //? If the teacher is not found, return null and a message.
        
        //° Verificar si la asignatura ya existe.
        const subjectExist = await subjectRepository.findOne({ //? Finding the subject by name and course.
            where: { name: name, curso: cursoFound } }); 
        if (subjectExist) return [null, "La asignatura ya existe."]; //? If the subject is found, return null and a message.
        
        //° Generar el código de la asignatura.
        const codeSubject = generateSubjectCode(name, cursoFound.code);

        const newSubject = subjectRepository.create({ //? Creating a new subject.
            name: name,
            description: description,
            curso: cursoFound,
            teacher: teacherFound,
            code: codeSubject,
        });

        const subjectCreated = await subjectRepository.save(newSubject); //? Saving the new subject.

        return [subjectCreated, null];
    } catch (error) {
        console.error("An error occurred while creating the subject:", error);
        return [null, "Internal server error."];
    }
};

export async function updateSubjectService(query, body) { //* This function updates a subject by id and name.
    try {
        const { idSubject, codeSubject } = query; //? Getting the id and name of the subject.
        
        const subjectRepository = AppDataSource.getRepository(Subject);
        const cursoRepository = AppDataSource.getRepository(Curso);
        const userRepository = AppDataSource.getRepository(User);

        const subjectFound = await subjectRepository.findOne({
            where: [{ id: idSubject }, { code: codeSubject }],
            relations: ["curso", "teacher"],
        });
        if (!subjectFound) return [null, "Asignatura no encontrada"];

        //° Buscar el curso por código si se proporciona.
        if (body.cursoCode) {
            const curso = await cursoRepository.findOne({ where: { code: body.cursoCode } });
            if (!curso) return [null, "Curso no encontrado."];
            subjectFound.curso = curso;
        }

        //° Buscar el profesor por rut si se proporciona.
        if (body.rutProfesor) {
            const teacher = await userRepository.findOne({
                where: { rut: body.rutProfesor, role: "profesor" }
            });
            if (!teacher) return [null, "Profesor no encontrado."];
            subjectFound.teacher = teacher;
        }

        //° Actualizar los campos básicos si son proporcionados
        if (body.name) subjectFound.name = body.name;
        if (body.description) subjectFound.description = body.description;

        //° Verificar si la asignatura ya existe en otro registro (excluir el actual por ID)
        const subjectExist = await subjectRepository.findOne({
            where: {
                name: subjectFound.name,
                curso: subjectFound.curso,
                id: Not(subjectFound.id) // Excluye el registro actual
            }
        });
        if (subjectExist) return [null, "Ya existe otra asignatura con el mismo nombre en el curso"];

        //° Generar el código solo si el nombre o curso se actualizan
        if (body.name || body.cursoCode) {
            const newCode = generateSubjectCode(subjectFound.name, subjectFound.curso.code);
            const subjectExistCode = await subjectRepository.findOne({
                where: { code: newCode, id: Not(subjectFound.id) } // Excluir el registro actual
            });
            if (subjectExistCode) return [null, "Ya existe otra asignatura con este código"];

            subjectFound.code = newCode; // Actualizar el código si es necesario
        }

        const subjectUpdated = await subjectRepository.save(subjectFound);

        return [subjectUpdated, null];
    } catch (error) {
        console.error("An error occurred while updating the subject:", error);
        return [null, "Internal server error."];
    }
};


export async function deleteSubjectService(query) { //* This function deletes a subject by id and name.
    try {
        const { idSubject, codeSubject } = query; //? Getting the id and name of the subject.

        const subjectRepository = AppDataSource.getRepository(Subject); //? Getting the subject repository.

        const subjectFound = await subjectRepository.findOne({ where: [{id: idSubject}, { code: codeSubject }] }); //? Finding the subject by id.

        if (!subjectFound) return [null, "Asignatura no encontrada"]; //? If the subject is not found, return null and a message.

        const subjectDeleted = await subjectRepository.delete(subjectFound.id); //? Deleting the subject.

        return [subjectDeleted, null];
    } catch (error) {
        console.error("An error occurred while deleting the subject:", error);
        return [null, "Internal server error."];
    }
};

function generateSubjectCode(subjectName, cursoCode) {
    // Separar el nombre de la asignatura en palabras
    const words = subjectName.split(" ");
    if (words.length > 1) {
        // Si hay más de una palabra, tomar la primera letra de cada palabra
        if (words.length === 2) {
            // Si solo hay dos palabras, tomar las primeras dos letras de la primera palabra y la primera letra de la segunda palabra
            const abbreviation = words[0].slice(0, 2).toUpperCase() + words[1].charAt(0).toUpperCase();
            return `${abbreviation}${cursoCode}`; // Combinar con el código del curso
        }
        const abbreviation = words.map(word => word[0].toUpperCase()).join("");
        return `${abbreviation}${cursoCode}`; // Combinar con el código del curso
    }

    // Si solo hay una palabra, abreviar el nombre a 3 letras
    const abbreviation = subjectName.slice(0, 3).toUpperCase(); // Abreviar el nombre a 3 letras
    return `${abbreviation}${cursoCode}`; // Combinar con el código del curso
}
