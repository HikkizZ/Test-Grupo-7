"use strict";
import Period from '../models/period.model.js';
import { AppDataSource } from '../config/configDB.js';


//solicita ver todos los periodos creados
export async function getAllPeriods() {
    const periodRepository = AppDataSource.getRepository(Period); 
    return await periodRepository.find();
}

//solicita ver un periodo con la id
export async function getPeriodById(id) {
    const periodRepository = AppDataSource.getRepository(Period);
    return await periodRepository.findOne({ where: { id } });
}

export async function createPeriod(data) {
    const { name, startTime, endTime } = data;

    const periodRepository = AppDataSource.getRepository(Period);

    // Nueva validación: asegurar que `endTime` sea posterior a `startTime`
    if (startTime >= endTime) {
        throw new Error("El tiempo de finalización debe ser posterior al tiempo de inicio.");
    }

    // Nueva verificación: evitar duplicación de `startTime` y `endTime` en diferentes periodos
    const existingPeriodWithSameTimes = await periodRepository.findOne({
        where: { startTime, endTime }
    });
    if (existingPeriodWithSameTimes) {
        throw new Error("Ya existe un periodo con el mismo tiempo de inicio y finalización.");
    }

    // Verificación existente: evitar duplicación de nombres de periodos
    const existingPeriod = await periodRepository.findOne({ where: { name } });
    if (existingPeriod) {
        throw new Error("El nombre del periodo ya existe.");
    }

    const newPeriod = periodRepository.create({
        name,
        startTime,
        endTime
    });

    return await periodRepository.save(newPeriod);
}

export async function updatePeriod(id, data) {
    const { name, startTime, endTime } = data;
    const periodRepository = AppDataSource.getRepository(Period);
    const period = await periodRepository.findOne({ where: { id } });
    if (!period) return null;

    // Nueva verificación: evitar duplicación de `startTime` y `endTime` en diferentes periodos
    const existingPeriodWithSameTimes = await periodRepository.findOne({
        where: { startTime, endTime }
    });
    if (existingPeriodWithSameTimes && existingPeriodWithSameTimes.id !== id) {
        throw new Error("Ya existe un periodo con el mismo tiempo de inicio y finalización.");
    }

    period.name = name || period.name;
    period.startTime = startTime || period.startTime;
    period.endTime = endTime || period.endTime;

    return await periodRepository.save(period);
}

export async function deletePeriod(id) {
    const periodRepository = AppDataSource.getRepository(Period);
    const period = await periodRepository.findOne({ where: { id } });
    if (!period) return null;

    return await periodRepository.remove(period);
}
