"use strict";
import Classroom from '../models/classroom.model'
import { AppDataSource } from '../config/configDB.js';

// Obtener todos los salones
export async function getAllClassrooms() {
    const classroomRepository = AppDataSource.getRepository(Classroom);
    return await classroomRepository.find();
}

// Obtener un salón por ID
export async function getClassroomById(id) {
    const classroomRepository = AppDataSource.getRepository(Classroom);
    return await classroomRepository.findOne({ where: { id } });
}

// Crear un nuevo salón
export async function createClassroom(data) {
    const { name, size } = data;
    const classroomRepository = AppDataSource.getRepository(Classroom);

    // Crear y guardar una nueva instancia de Classroom
    const newClassroom = classroomRepository.create({
        name,
        size
    });

    return await classroomRepository.save(newClassroom);
}

// Actualizar un salón existente
export async function updateClassroom(id, data) {
    const classroomRepository = AppDataSource.getRepository(Classroom);

    const classroom = await classroomRepository.findOne({ where: { id } });
    if (!classroom) return null;

    classroom.name = data.name || classroom.name;
    classroom.size = data.size || classroom.size;

    return await classroomRepository.save(classroom);
}

// Eliminar un salón
export async function deleteClassroom(id) {
    const classroomRepository = AppDataSource.getRepository(Classroom);

    const classroom = await classroomRepository.findOne({ where: { id } });
    if (!classroom) return null;

    return await classroomRepository.remove(classroom);
}