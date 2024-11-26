"use strict";
import Classroom from '../models/classroom.model'
import { AppDataSource } from '../config/configDB.js';

export async function getAllClassrooms() {
    const classroomRepository = AppDataSource.getRepository(Classroom);
    return await classroomRepository.find();
}

export async function getClassroomById(id) {
    const classroomRepository = AppDataSource.getRepository(Classroom);
    return await classroomRepository.findOne({ where: { id } });
}

export async function createClassroom(data) {
    const { name, size } = data;
    const classroomRepository = AppDataSource.getRepository(Classroom);

    const newClassroom = classroomRepository.create({
        name,
        size
    });

    return await classroomRepository.save(newClassroom);
}

export async function updateClassroom(id, data) {
    const classroomRepository = AppDataSource.getRepository(Classroom);

    const classroom = await classroomRepository.findOne({ where: { id } });
    if (!classroom) return null;

    classroom.name = data.name || classroom.name;
    classroom.size = data.size || classroom.size;

    return await classroomRepository.save(classroom);
}

export async function deleteClassroom(id) {
    const classroomRepository = AppDataSource.getRepository(Classroom);

    const classroom = await classroomRepository.findOne({ where: { id } });
    if (!classroom) return null;

    return await classroomRepository.remove(classroom);
}