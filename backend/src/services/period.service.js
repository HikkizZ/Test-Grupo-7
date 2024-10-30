"use strict";
import Period from '../models/period.model.js';
import { AppDataSource } from '../config/configDB.js';


export async function getAllPeriods() {
    const periodRepository = AppDataSource.getRepository(Period); // Utiliza el repositorio
    return await periodRepository.find();
}


export async function getPeriodById(id) {
    const periodRepository = AppDataSource.getRepository(Period);
    return await periodRepository.findOne({ where: { id } });
}


export async function createPeriod(data) {
    const { name, startTime, endTime } = data;

    const periodRepository = AppDataSource.getRepository(Period);
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
    const periodRepository = AppDataSource.getRepository(Period);
    const period = await periodRepository.findOne({ where: { id } });
    if (!period) return null;
    
    period.name = data.name || period.name;
    period.startTime = data.startTime || period.startTime;
    period.endTime = data.endTime || period.endTime;

    return await periodRepository.save(period);
}


export async function deletePeriod(id) {
    const periodRepository = AppDataSource.getRepository(Period);
    const period = await periodRepository.findOne({ where: { id } });
    if (!period) return null;

    return await periodRepository.remove(period);
}
