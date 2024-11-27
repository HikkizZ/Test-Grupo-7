"use strict";

import Schedule from "../models/schedule.model.js"; // Importa el modelo de Schedule.
import { AppDataSource } from "../config/configDB.js"; // Importa la configuración de la base de datos.
import User from "../models/user.model.js"; // Importa el modelo de usuarios
import Curso from "../models/curso.model.js"; // Importa el modelo de Curso
import Room from "../models/room.model.js"; // Importa el modelo de Room
import Subject from "../models/subject.model.js"; // Importa el modelo de Subject
import Period from "../models/period.model.js"; // Importa el modelo de Period
//* Servicio para obtener un horario por id o nombre.
export async function getScheduleService(query) {
    try {
        const { idSchedule} = query;

        const scheduleRepository = AppDataSource.getRepository(Schedule); //* Obtiene el repositorio de la entidad Schedule.

        const scheduleFound = await scheduleRepository.findOne({
            where: [{ id: idSchedule}], //* Busca el horario por id o nombre.
        });

        if (!scheduleFound) return [null, "Horario no encontrado."]; //* Si no se encuentra, devuelve un mensaje de error.

        return [scheduleFound, null]; //* Devuelve el horario encontrado.
    } catch (error) {
        console.error("Ocurrió un error al obtener el horario:", error);
        return [null, "Error interno del servidor."]; //* Devuelve un mensaje de error.
    }
}

//* Servicio para obtener todos los horarios.
export async function getSchedulesService() {
    try {
        const scheduleRepository = AppDataSource.getRepository(Schedule); //* Obtiene el repositorio de la entidad Schedule.

        const schedules = await scheduleRepository.find(); //* Recupera todos los horarios de la base de datos.

        if (!schedules || schedules.length === 0) return [null, "No se encontraron horarios."]; //* Si no hay horarios, devuelve un mensaje.

        return [schedules, null]; //* Devuelve la lista de horarios.
    } catch (error) {
        console.error("Ocurrió un error al obtener los horarios:", error);
        return [null, "Error interno del servidor."]; //* Devuelve un mensaje de error.
    }
}

//* Servicio para crear un nuevo horario.
export async function createScheduleService(body) {
    try {
        const scheduleRepository = AppDataSource.getRepository(Schedule); //* Obtiene el repositorio de la entidad Schedule.
        const userRepository = AppDataSource.getRepository(User); //* Repositorio de los usuarios
        const cursoRepository = AppDataSource.getRepository(Curso); //* Repositorio de cursos
        const roomRepository = AppDataSource.getRepository(Room); //* Repositorio de salas
        const subjectRepository = AppDataSource.getRepository(Subject); //* Repositorio de asignaturas
        const periodRepository = AppDataSource.getRepository(Period); //* Repositorio de periodos

        
        const existingSchedule = await scheduleRepository.findOne({
            where: {
                curso: { id: body.cursoId },
                teacher: { id: body.teacherId },
                room: { id: body.classroomId },
                subject: { id: body.subjectId },
                period: body.period,
                dayOfWeek: body.dayOfWeek,
            },
        });
        
        if (existingSchedule) {
            return [null, "El horario ya existe."]; // Si ya existe, devuelve un mensaje de error.
        }
        

        const teacher = await userRepository.findOne({
            where: { id: body.teacherId, role: "profesor" }, //* Buscar por ID y rol
        });
        if (!teacher) {
            return [null, "El usuario especificado no tiene el rol de profesor."]; //* Error si no es un profesor
        }
      
        // Verificar si el curso existe
        const curso = await cursoRepository.findOne({
            where: { id: body.cursoId },
        });
        if (!curso) {
            return [null, "El curso especificado no existe."];
        }

        
        //verifica que la sala está disponible
        const room = await roomRepository.findOne({
            where: { id: body.classroomId },
        });
        
        if (!room) {
            return [null, "La sala especificada no existe."];
        }
        
        /*if (room.available === false) {
            return [null, "La sala especificada no está disponible."];
        }*/
        

        // Verificar si la asignatura existe
        const subject = await subjectRepository.findOne({
            where: { id: body.subjectId },
        });
        if (!subject) {
            return [null, "La asignatura especificada no existe."];
        }

         // Verificar si el periodo existe
         const period = await periodRepository.findOne({
            where: { id: body.period },
        });
        if (!period) {
            return [null, "El periodo especificado no existe."];
        }
        
        const newSchedule = scheduleRepository.create({
            curso: { id: body.cursoId }, //* Relación con el curso
            teacher: { id: body.teacherId }, //* Relación con el profesor
            room: { id: body.classroomId }, //* Relación con el aula
            subject: { id: body.subjectId }, //* Relación con la asignatura
            period: body.period, //* Periodo
            dayOfWeek: body.dayOfWeek, //* Día de la semana
        });

        const scheduleCreated = await scheduleRepository.save(newSchedule); //* Guarda el nuevo horario en la base de datos.

        return [scheduleCreated, null]; //* Devuelve el horario creado.
    } catch (error) {
        console.error("Ocurrió un error al crear el horario:", error);
        return [null, "Error interno del servidor."]; //* Devuelve un mensaje de error.
    }
}

//* Servicio para actualizar un horario existente.
export async function updateScheduleService(query, body) {
    try {
        const { idSchedule} = query;

        const scheduleRepository = AppDataSource.getRepository(Schedule); //* Obtiene el repositorio de la entidad Schedule.
        
        const scheduleFound = await scheduleRepository.findOne({
            where: [{ id: idSchedule}], //* Busca el horario por id o nombre.
        });

        if (!scheduleFound) return [null, "Horario no encontrado."]; //* Si no se encuentra, devuelve un mensaje de error.

        const updatedSchedule = await scheduleRepository.save({
            ...scheduleFound, //* Mezcla los datos existentes del horario encontrado.
            ...body, //* Actualiza con los nuevos datos enviados en el cuerpo.
        });

        return [updatedSchedule, null]; //* Devuelve el horario actualizado.
    } catch (error) {
        console.error("Ocurrió un error al actualizar el horario:", error);
        return [null, "Error interno del servidor."]; //* Devuelve un mensaje de error.
    }
}

//* Servicio para eliminar un horario existente.
export async function deleteScheduleService(query) {
    try {
        const { idSchedule} = query;

        const scheduleRepository = AppDataSource.getRepository(Schedule); //* Obtiene el repositorio de la entidad Schedule.

        const scheduleFound = await scheduleRepository.findOne({
            where: [{ id: idSchedule }], //* Busca el horario por id o nombre.
        });

        if (!scheduleFound) return [null, "Horario no encontrado."]; //* Si no se encuentra, devuelve un mensaje de error.

        const scheduleDeleted = await scheduleRepository.remove(scheduleFound); //* Elimina el horario encontrado.

        return [scheduleDeleted, null]; //* Devuelve el horario eliminado.
    } catch (error) {
        console.error("Ocurrió un error al eliminar el horario:", error);
        return [null, "Error interno del servidor."]; //* Devuelve un mensaje de error.
    }
}

