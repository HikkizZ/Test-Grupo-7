"use strict";

import Period from "../models/period.model.js";
import { AppDataSource } from "../config/configDB.js";

//* Servicio para obtener un período por id o nombre.
export async function getPeriodService(query) {
    try {
        const { idPeriod, namePeriod } = query;

        const periodRepository = AppDataSource.getRepository(Period); //* Obtiene el repositorio de la entidad Period.

        const periodFound = await periodRepository.findOne({
            where: [{ id: idPeriod }, { name: namePeriod }], //* Busca el período por id o nombre.
        });

        if (!periodFound) return [null, "Período no encontrado."]; //* Si no se encuentra, devuelve un mensaje de error.

        return [periodFound, null]; //* Devuelve el período encontrado y ningún error.
    } catch (error) {
        console.error("Ocurrió un error al obtener el período:", error);
        return [null, "Error interno del servidor."]; //* Devuelve un mensaje de error en caso de fallo.
    }
}

//* Servicio para obtener todos los períodos.
export async function getPeriodsService() {
    try {
        const periodRepository = AppDataSource.getRepository(Period); //* Obtiene el repositorio de la entidad Period.

        const periods = await periodRepository.find(); //* Recupera todos los períodos de la base de datos.

        if (!periods || periods.length === 0) return [null, "No se encontraron períodos."]; //* Si no hay períodos, devuelve un mensaje.

        return [periods, null]; //* Devuelve la lista de períodos y ningún error.
    } catch (error) {
        console.error("Ocurrió un error al obtener los períodos:", error);
        return [null, "Error interno del servidor."]; //* Devuelve un mensaje de error en caso de fallo.
    }
}

//* Servicio para crear un nuevo período.
export async function createPeriodService(body) {
    try {
        const periodRepository = AppDataSource.getRepository(Period); //* Obtiene el repositorio de la entidad Period.

        const existingPeriod = await periodRepository.findOne({
            where: { name: body.name }, //* Busca si ya existe un período con el mismo nombre.
        });

        if (existingPeriod) return [null, "El período ya existe."]; //* Si ya existe, devuelve un mensaje de error.

        const newPeriod = periodRepository.create({
            name: body.name, //* Nombre del período.
            startTime: body.startTime, //* Hora de inicio.
            endTime: body.endTime, //* Hora de fin.
        });

        const periodCreated = await periodRepository.save(newPeriod); //* Guarda el nuevo período en la base de datos.

        return [periodCreated, null]; //* Devuelve el período creado y ningún error.
    } catch (error) {
        console.error("Ocurrió un error al crear el período:", error);
        return [null, "Error interno del servidor."]; //* Devuelve un mensaje de error en caso de fallo.
    }
}

//* Servicio para actualizar un período existente.
export async function updatePeriodService(query, body) {
    try {
        const { idPeriod, namePeriod } = query;

        const periodRepository = AppDataSource.getRepository(Period); //* Obtiene el repositorio de la entidad Period.

        const periodFound = await periodRepository.findOne({
            where: [{ id: idPeriod }, { name: namePeriod }], //* Busca el período por id o nombre.
        });

        if (!periodFound) return [null, "Período no encontrado."]; //* Si no se encuentra, devuelve un mensaje de error.

        const updatedPeriod = await periodRepository.save({
            ...periodFound, //* Mezcla los datos existentes del período encontrado.
            ...body, //* Actualiza con los nuevos datos enviados en el cuerpo.
        });

        return [updatedPeriod, null]; //* Devuelve el período actualizado y ningún error.
    } catch (error) {
        console.error("Ocurrió un error al actualizar el período:", error);
        return [null, "Error interno del servidor."]; //* Devuelve un mensaje de error en caso de fallo.
    }
}

//* Servicio para eliminar un período existente.
export async function deletePeriodService(query) {
    try {
        const { idPeriod, namePeriod } = query;

        const periodRepository = AppDataSource.getRepository(Period); //* Obtiene el repositorio de la entidad Period.

        const periodFound = await periodRepository.findOne({
            where: [{ id: idPeriod }, { name: namePeriod }], //* Busca el período por id o nombre.
        });

        if (!periodFound) return [null, "Período no encontrado."]; //* Si no se encuentra, devuelve un mensaje de error.

        const periodDeleted = await periodRepository.remove(periodFound); //* Elimina el período encontrado.

        return [periodDeleted, null]; //* Devuelve el período eliminado y ningún error.
    } catch (error) {
        console.error("Ocurrió un error al eliminar el período:", error);
        return [null, "Error interno del servidor."]; //* Devuelve un mensaje de error en caso de fallo.
    }
}
