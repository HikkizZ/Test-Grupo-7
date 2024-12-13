"use strict";

import Horario from "../models/horario.model.js";
import { AppDataSource } from "../config/configDB.js";
import User from "../models/user.model.js";
import Curso from "../models/curso.model.js";
import Room from "../models/room.model.js";
import Subject from "../models/subject.model.js";
import Period from "../models/period.model.js";

//* Servicio para obtener un horario por ID
export async function getHorarioService(query) {
    try {
        const { idHorario } = query;

        const horarioRepository = AppDataSource.getRepository(Horario);

        const horarioFound = await horarioRepository.findOne({
            where: { id: idHorario },
            relations: ["curso", "teacher", "room", "subject", "period"],
        });

        if (!horarioFound) return [null, "Horario no encontrado."];

        return [{
            id: horarioFound.id,
            teacher: {
                name: horario.teacher.name,
                    rut: horario.teacher.rut,
            },
            subject: horarioFound.subject.name,
            curso: horarioFound.curso.name,
            classroom: horarioFound.room.name,
            dayOfWeek: horarioFound.dayOfWeek,
            period: {
                startTime: horarioFound.period.startTime,
                endTime: horarioFound.period.endTime,
            },
            
        }, null];
    } catch (error) {
        console.error("Error al obtener el horario:", error);
        return [null, "Error interno del servidor"];
    }
}

//* Servicio para obtener todos los horarios
export async function getHorariosService() {
    try {
        const horarioRepository = AppDataSource.getRepository(Horario);

        const horarios = await horarioRepository.find({
            relations: ["curso", "teacher", "room", "subject", "period"],
        });

        if (!horarios || horarios.length === 0) return [null, "No se encontraron horarios."];

        return [{
            horarios: horarios.map(horario => ({
                id: horario.id,
                teacher: {
                    name: horario.teacher.name,
                    rut: horario.teacher.rut,
                },
                subject: horario.subject.name,
                curso: horario.curso.name,
                classroom: horario.room.name,
                dayOfWeek: horario.dayOfWeek,
                period: {
                    startTime: horario.period.startTime,
                    endTime: horario.period.endTime,
                },
            })),
        }, null];
    } catch (error) {
        console.error("Error al obtener los horarios:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function createHorarioService(body) {
    try {
        const horarioRepository = AppDataSource.getRepository(Horario);
        const userRepository = AppDataSource.getRepository(User);
        const cursoRepository = AppDataSource.getRepository(Curso);
        const roomRepository = AppDataSource.getRepository(Room);
        const subjectRepository = AppDataSource.getRepository(Subject);
        const periodRepository = AppDataSource.getRepository(Period);


        const teacher = await userRepository.findOne({
            where: { rut: body.teacherId, role: "profesor" },
        });
        if (!teacher) return [null, "El usuario no es un profesor."];

        const curso = await cursoRepository.findOne({ where: { code: body.cursoId } });
        if (!curso) return [null, "El curso especificado no existe."];

        const room = await roomRepository.findOne({ where: { name: body.classroomId } });
        if (!room) return [null, "La sala especificada no existe."];

        const subject = await subjectRepository.findOne({ where: { name: body.subjectId } });
        if (!subject) return [null, "La asignatura especificada no existe."];

        const period = await periodRepository.findOne({ where: { name: body.periodId } });
        if (!period) return [null, "El periodo especificado no existe."];


        const conflictingHorario = await horarioRepository.findOne({
            where: {
                teacher: { id: teacher.id },
                dayOfWeek: body.dayOfWeek,
                period: { id: period.id },
            },
        });
        if (conflictingHorario) {
            return [
                null,
                `El profesor ${teacher.name} ya tiene un horario asignado el ${body.dayOfWeek} a las ${period.startTime}.`,
            ];
        }
        
        const existingHorario = await horarioRepository.findOne({
            where: {
                teacher: { id: teacher.id },
                subject: { id: subject.id },
                curso: { id: curso.id },
                room: { id: room.id },
                dayOfWeek: body.dayOfWeek,
                period: { id: period.id },
            },
        });
        if (existingHorario) return [null, "El horario ya existe."];

        const newHorario = horarioRepository.create({
            teacher: { id: teacher.id },
            subject: { id: subject.id },
            curso: { id: curso.id },
            room: { id: room.id },
            dayOfWeek: body.dayOfWeek,
            period: { id: period.id },
        });

        const horarioCreated = await horarioRepository.save(newHorario);

        const horarioWithRelations = await horarioRepository.findOne({
            where: { id: horarioCreated.id },
            relations: ["teacher", "subject", "curso", "room", "period"],
        });

        const response = {
            id: horarioWithRelations.id,
            teacher: horarioWithRelations.teacher.name,
            subject: horarioWithRelations.subject.name,
            curso: horarioWithRelations.curso.name,
            classroom: horarioWithRelations.room.name,
            dayOfWeek: horarioWithRelations.dayOfWeek,
            period: {
                name: horarioWithRelations.period.name,
                startTime: horarioWithRelations.period.startTime,
                endTime: horarioWithRelations.period.endTime,
            },
        };


        return [response, null];
    } catch (error) {
        console.error("Error al crear el horario:", error);
        return [null, "Error interno del servidor"];
    }
}

//* Servicio para actualizar un horario existente
export async function updateHorarioService(query, body) {
    try {
        const { idHorario } = query;

        const horarioRepository = AppDataSource.getRepository(Horario);

        const horarioFound = await horarioRepository.findOne({
            where: { id: idHorario },
        });

        if (!horarioFound) return [null, "Horario no encontrado."];

        const updatedHorario = await horarioRepository.save({
            ...horarioFound,
            ...body,
        });

        return [updatedHorario, null];
    } catch (error) {
        console.error("Error al actualizar el horario:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteHorarioService(query) {
    try {
        const { idHorario } = query;

        const horarioRepository = AppDataSource.getRepository(Horario);

        const horarioFound = await horarioRepository.findOne({
            where: { id: idHorario },
        });

        if (!horarioFound) return [null, "Horario no encontrado."];

        const horarioDeleted = await horarioRepository.remove(horarioFound);

        return [horarioDeleted, null];
    } catch (error) {
        console.error("Error al eliminar el horario:", error);
        return [null, "Error interno del servidor"];
    }
}