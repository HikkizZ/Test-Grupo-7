"use strict";
import Schedule from '../models/schedule.model.js';
import { AppDataSource } from '../config/configDB.js';


export async function createSchedule(scheduleData) {
    const { cursoId, teacherId, classroomId, subjectId, period, dayOfWeek } = scheduleData;

    // Valida que la id sea de un usuario con rol de profesor
    const teacher = await AppDataSource.getRepository(User).findOne({ where: { id: teacherId, role: 'profesor' } });
    if (!teacher) {
        throw new Error('La ID no es de un usuario con rol de profesor.');
    }
    //Verifica que el profesor no tenga tope con otros horarios
    const teacherConflict = await Schedule.findOne({
        where: { teacherId, period, dayOfWeek }
    });
    if (teacherConflict) {
        throw new Error('El docente ya tiene una clase asignada en este periodo.');
    }

    const classroomConflict = await Schedule.findOne({
        where: { classroomId, period, dayOfWeek }
    });
    if (classroomConflict) {
        throw new Error('El aula ya está asignada a otro curso en este periodo.');
    }


    const newSchedule = Schedule.create({
        cursoId,
        teacherId,
        classroomId,
        subjectId,
        period,
        dayOfWeek,
    });

    await newSchedule.save();
    return newSchedule;
}

export async function getAllSchedules() {
    return await Schedule.find();
}

export async function getScheduleById(id) {
    return await Schedule.findOne({ where: { id } });
}

export async function updateSchedule(id, data) {
    const schedule = await Schedule.findOne({ where: { id } });
    if (!schedule) return null;

    const { cursoId, teacherId, classroomId, subjectId, period, dayOfWeek } = data;

    // Validar que la id sea de un usuario con rol profesor
    const teacher = await AppDataSource.getRepository(User).findOne({ where: { id: teacherId, role: 'profesor' } });
    if (!teacher) {
        throw new Error('El ID dado no es de un usuario con rol profesor.');
    }

    const teacherConflict = await Schedule.findOne({
        where: { teacherId, period, dayOfWeek, id: Not(id) }
    });
    if (teacherConflict) {
        throw new Error('El docente ya tiene una clase asignada en este periodo.');
    }

    const classroomConflict = await Schedule.findOne({
        where: { classroomId, period, dayOfWeek, id: Not(id) }
    });
    if (classroomConflict) {
        throw new Error('El aula ya está asignada a otro curso en este periodo.');
    }

    schedule.cursoId = cursoId || schedule.cursoId;
    schedule.teacherId = teacherId || schedule.teacherId;
    schedule.classroomId = classroomId || schedule.classroomId;
    schedule.subjectId = subjectId || schedule.subjectId;
    schedule.period = period || schedule.period;
    schedule.dayOfWeek = dayOfWeek || schedule.dayOfWeek;

    await schedule.save();
    return schedule;
}

export async function deleteSchedule(id) {
    const schedule = await Schedule.findOne({ where: { id } });
    if (!schedule) return null;

    await schedule.remove();
    return schedule;
}
