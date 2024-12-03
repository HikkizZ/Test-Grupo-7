"use strict";

import { AppDataSource } from "../config/configDB.js";
import Subject from "../models/subject.model.js";
import Curso from "../models/curso.model.js";
import User from "../models/user.model.js";
import { Not } from "typeorm";

export async function getSubjectService(query) { //* This function gets a subject by id and name.
    try {
        const { idSubject } = query; //? Getting the id and name of the subject.

        const subjectRepository = AppDataSource.getRepository(Subject); //? Getting the subject repository.

        const subjectFound = await subjectRepository.findOne({ //? Finding the subject by id and name.
            where: { id: idSubject },
            relations: ["curso", "teacher"],
        });

        if (!subjectFound) return [null, "Asingatura no encontrada"]; //? If the subject is not found, return null and a message.

        return [{
            id: subjectFound.id,
            name: subjectFound.name,
            description: subjectFound.description,
            curso: subjectFound.curso.code,
            teacher: subjectFound.teacher.name,
        }, null];
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

        return [{ //? Returning the subjects. Se muestra el id, nombre, descripción, curso y profesor de la asignatura.
            subjects: subjects.map(subject => ({
                id: subject.id,
                name: subject.name,
                description: subject.description,
                curso: subject.curso.code,
                teacher: subject.teacher.name,
            })),
        }, null];
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

        const newSubject = subjectRepository.create({ //? Creating a new subject.
            name: name,
            description: description,
            curso: cursoFound,
            teacher: teacherFound,
        });

        const subjectCreated = await subjectRepository.save(newSubject); //? Saving the new subject.

        return [{
            id: subjectCreated.id,
            name: subjectCreated.name,
            description: subjectCreated.description,
            curso: subjectCreated.curso.code,
            teacher: subjectCreated.teacher.name,
        }, null];
    } catch (error) {
        console.error("An error occurred while creating the subject:", error);
        return [null, "Internal server error."];
    }
};

export async function updateSubjectService(query, body) { //* This function updates a subject by id and name.
    try {
        const { idSubject } = query; //? Getting the id and name of the subject.
        
        const subjectRepository = AppDataSource.getRepository(Subject); //? Getting the subject repository.
        const cursoRepository = AppDataSource.getRepository(Curso); //? Getting the course repository.
        const userRepository = AppDataSource.getRepository(User); //? Getting the user repository.

        const subjectFound = await subjectRepository.findOne({ //? Finding the subject by id.
            where: { id: idSubject },
            relations: ["curso", "teacher"],
        });
        if (!subjectFound) return [null, "Asignatura no encontrada"]; //? If the subject is not found, return null and a message.

        //° Buscar el curso por código si se proporciona.
        if (body.cursoCode) {
            const curso = await cursoRepository.findOne({ where: { code: body.cursoCode } }); //? Se busca el curso por código.
            if (!curso) return [null, "Curso no encontrado."];
            subjectFound.curso = curso;
        }

        //° Buscar el profesor por rut si se proporciona.
        if (body.rutProfesor) {
            const teacher = await userRepository.findOne({
                where: { rut: body.rutProfesor, role: "profesor" }}); //? Se busca el profesor por rut.
            if (!teacher) return [null, "Profesor no encontrado."];
            subjectFound.teacher = teacher;
        }

        //° Actualizar los campos básicos si son proporcionados
        if (body.name) subjectFound.name = body.name;
        if (body.description) subjectFound.description = body.description;

        //° Verificar si la asignatura ya existe.
        const subjectExist = await subjectRepository.findOne({ //? Finding the subject by name and course.
            where: { name: subjectFound.name, curso: subjectFound.curso, id: Not(idSubject) } });
        if (subjectExist) return [null, "Ya existe otra asignatura con el mismo nombre en el curso"]; //? If the subject is found, return null and a message.

        const subjectUpdated = await subjectRepository.save(subjectFound); //? Saving the updated subject.

        return [{
            id: subjectUpdated.id,
            name: subjectUpdated.name,
            description: subjectUpdated.description,
            curso: subjectUpdated.curso.code,
            teacher: subjectUpdated.teacher?.name || null, //? If the teacher is null, return null.
        }, null];
    } catch (error) {
        console.error("An error occurred while updating the subject:", error);
        return [null, "Internal server error."];
    }
};

export async function deleteSubjectService(query) { //* This function deletes a subject by id and name.
    try {
        const { idSubject } = query; //? Getting the id and name of the subject.

        const subjectRepository = AppDataSource.getRepository(Subject); //? Getting the subject repository.

        const subjectFound = await subjectRepository.findOne({ where: { id: idSubject } }); //? Finding the subject by id.

        if (!subjectFound) return [null, "Asignatura no encontrada"]; //? If the subject is not found, return null and a message.

        const subjectDeleted = await subjectRepository.delete(subjectFound.id); //? Deleting the subject.

        return [subjectDeleted, null];
    } catch (error) {
        console.error("An error occurred while deleting the subject:", error);
        return [null, "Internal server error."];
    }
};
