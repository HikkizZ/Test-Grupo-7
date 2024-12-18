"use strict";

import { AppDataSource } from "../config/configDB.js";
import Calificacion from "../models/calificacion.model.js";
import Subject from "../models/subject.model.js";
import User from "../models/user.model.js";
import UserNotasSchema from "../models/userNotas.model.js";

export async function configCalificacionesService(body) {
    try {
        const subjectRepository = AppDataSource.getRepository(Subject);
        const calificacionRepository = AppDataSource.getRepository(Calificacion);

        const { codeSubject, cantidad } = body;

        //? Verificar si la asignatura existe
        const subjectFound = await subjectRepository.findOne({ where: { code: codeSubject } });
        if (!subjectFound) return [null, "No se encontró la asignatura"];

        //? Verificar si la asignatura ya tiene calificaciones configuradas
        const existingCalificaciones = await calificacionRepository.find({ where: { subject: subjectFound } });
        if (existingCalificaciones.length > 0) return [null, "La asignatura ya tiene calificaciones configuradas"];

        //? Verificar si la cantidad de calificaciones es válida (Mínimo 2 y máximo 10)
        if (cantidad < 2 || cantidad > 10) return [null, "Cantidad de calificaciones inválida"];

        //? Calcular el porcentaje de cada calificación
        const porcentajeBase = Math.floor(100 / cantidad);
        let lastPorcentaje = 100 - porcentajeBase * (cantidad - 1); // El último porcentaje es el porcentaje base + el residuo de la división

        //? Crear las calificaciones genéricas
        const calificaciones = [];
        for (let i = 0; i < cantidad; i++) {
            const porcentaje = i === cantidad - 1 ? lastPorcentaje : porcentajeBase;

            calificaciones.push(
                calificacionRepository.create({
                    name: `Calificación ${i + 1}`,
                    nota: null,
                    porcentaje: porcentaje,
                    subject: subjectFound,
                })
            );
        }

        //? Guardar las calificaciones
        await calificacionRepository.save(calificaciones);

        return [calificaciones, null];
    } catch (error) {
        console.error("Ocurrió un error al configurar las calificaciones en la asignatura: ", error);
        return [null, "Error interno del servidor"];
    }
};

export async function updateConfigCalificacionesService(query, body) {
    try {
        const { codeSubject } = query;
        const { cantidad } = body;

        const subjectRepository = AppDataSource.getRepository(Subject);
        const calificacionRepository = AppDataSource.getRepository(Calificacion);

        //? Verificar si la asignatura existe
        const subjectFound = await subjectRepository.findOne({
            where: { code: codeSubject },
            relations: ["calificaciones"]
        });
        if (!subjectFound) return [null, "No se encontró la asignatura"];

        const currentCalificaciones = await calificacionRepository.find({ where: { subject: {id: subjectFound.id} } });

        const currentCantidad = currentCalificaciones.length;

        //? Verificar si la cantidad de calificaciones es válida (Mínimo 2 y máximo 10)
        if (cantidad < 2 || cantidad > 10) return [null, "Cantidad de calificaciones inválida"];

        if (cantidad > currentCantidad) {
            //? Agregar calificaciones adicionales a las existentes
            const porcentajeBase = Math.floor(100 / cantidad);
            let lastPorcentaje = 100 - porcentajeBase * (cantidad - 1);

            for (let i = currentCantidad; i < cantidad; i++) {
                const porcentaje = i === cantidad - 1 ? lastPorcentaje : porcentajeBase;

                const newCalificacion = calificacionRepository.create({
                    name: `Calificación ${i + 1}`,
                    porcentaje: porcentaje,
                    subject: subjectFound,
                });

                await calificacionRepository.save(newCalificacion);
            }
        } else if (cantidad < currentCantidad) {
            //? Eliminar calificaciones sobrantes
            const calificacionesToRemove = currentCalificaciones.slice(cantidad);
            await calificacionRepository.remove(calificacionesToRemove);
        }

        //? Calcular el porcentaje de cada calificación
        const updatedCalificaciones = await calificacionRepository.find({ where: { subject: {id: subjectFound.id} }});
        const porcentajeBase = Math.floor(100 / updatedCalificaciones.length);
        let lastPorcentaje = 100 - porcentajeBase * (updatedCalificaciones.length - 1);

        //? Actualizar los porcentajes de las calificaciones
        updatedCalificaciones.forEach((calificacion, index) => {
            calificacion.porcentaje = index === updatedCalificaciones.length - 1 ? lastPorcentaje : porcentajeBase;
        });

        await calificacionRepository.save(updatedCalificaciones);

        return [updatedCalificaciones, null];
    } catch (error) {
        console.error("Ocurrió un error al actualizar la configuración de las calificaciones en la asignatura: ", error);
        return [null, "Error interno del servidor"];
    }
};

export async function editNameCalificacionesService(query, body) {
    try {
        const calificacionRepository = AppDataSource.getRepository(Calificacion);

        const { idCalificacion } = query;
        const { newName } = body;

        const calificacionFound = await calificacionRepository.findOne({ where: { id: idCalificacion } });
        if (!calificacionFound) return [null, "No se encontró la calificación"];

        calificacionFound.name = newName;

        await calificacionRepository.save(calificacionFound);

        return [calificacionFound, null];
    } catch (error) {
        console.error("Ocurrió un error al editar el nombre de la calificación: ", error);
        return [null, "Error interno del servidor"];
    }
};


export async function getCalificacionesService(query) {
    try {
        const subjectRepository = AppDataSource.getRepository(Subject);
        const calificacionRepository = AppDataSource.getRepository(Calificacion);

        const { codeSubject } = query;

        //? Verificar si la asignatura existe
        const subjectFound = await subjectRepository.findOne({ where: { code: codeSubject } });
        if (!subjectFound) return [null, "No se encontró la asignatura"];

        //? Obtener las calificaciones de la asignatura
        const calificaciones = await calificacionRepository.find({
            where: { subject: { id: subjectFound.id } },
            order: { id: "ASC" }
        });

        return [calificaciones, null];
    } catch (error) {
        console.error("Ocurrió un error al obtener las calificaciones de la asignatura: ", error);
        return [null, "Error interno del servidor"];
    }
};

export async function assignGradesStudentsService(query){
    try {
        const subjectRepository = AppDataSource.getRepository(Subject);

        const { codeSubject } = query;

        //? Verificar si la asignatura existe
        const subjectFound = await subjectRepository.findOne({ where: { code: codeSubject }, relations: ["students", "calificaciones"] });
        if (!subjectFound) return [null, "No se encontró la asignatura"];

        //? Verificar si la asignatura tiene calificaciones configuradas
        const calificaciones = await subjectFound.calificaciones;
        if (calificaciones.length === 0) return [null, "La asignatura no tiene calificaciones configuradas"];

        //? Verificar si la asignatura tiene alumnos inscritos
        const students = await subjectFound.students;
        if (students.length === 0) return [null, "La asignatura no tiene alumnos inscritos"];

        //? Mostar solo rut de los alumnos
        console.log(students.map(student => student.id));

        const usersNotas = students.flatMap(student => {
            return calificaciones.map(calificacion => ({
                nota: null,
                student: student.id,
                calificacion: calificacion.id,
                subject: subjectFound.id
            }
            ))
        });

        await AppDataSource
            .createQueryBuilder()
            .insert()
            .into('users_notas')
            .values(usersNotas)
            .execute();

        return ["Calificaciones asignadas a los estudiantes correctamente", null];
    } catch (error) {
        console.error("Ocurrió un error al asignar las calificaciones a los alumnos: ", error);
        return [null, "Error interno del servidor"];
    }
};

export async function calificarAlumnoService(body){
    try {
        const userNotasRepository = AppDataSource.getRepository(UserNotasSchema);

        const { studentRut, calificacionId, nota } = body;

        const userFound = await AppDataSource.getRepository(User).findOne({ where: { rut: studentRut } });

        //? Verificar si el alumno ya tiene una nota asignada
        const userNotaFound = await userNotasRepository.findOne({
            where: { student: userFound.id, calificacion: calificacionId },
            relations: ["student", "calificacion", "subject"] });

        if (!userNotaFound) return [null, "No se encontró la nota del alumno"];

        //? Actualizar la nota del alumno
        userNotaFound.nota = nota;

        await userNotasRepository.save(userNotaFound);

        return [{
            student: userNotaFound.student.rut,
            calificacion: userNotaFound.calificacion.name,
            subject: userNotaFound.subject.code,
            nota: userNotaFound.nota
        }, null];
    } catch (error) {
        console.error("Ocurrió un error al calificar al alumno: ", error);
        return [null, "Error interno del servidor"];
    }
}