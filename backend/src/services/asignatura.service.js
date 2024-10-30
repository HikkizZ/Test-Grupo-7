"use strict";

import Asignatura from "../models/asignatura.model.js";
import { AppDataSource } from "../config/configDB.js";

export async function getAsignaturaService(query) { //* Esta función obtiene una asignatura por id y nombre.
    try {
        const { idAsignatura, nameAsignatura } = query;

        const asignaturaRepository = AppDataSource.getRepository(Asignatura);

        const asignaturaFound = await asignaturaRepository.findOne({ 
            where: [{ id: idAsignatura }, { name: nameAsignatura }],
        });

        if (!asignaturaFound) return [null, "Asignatura no encontrada."]; 

        return [asignaturaFound, null];
    } catch (error) {
        console.error("Ocurrió un error al obtener la asignatura:", error);
        return [null, "Error interno del servidor."];
    }
};

export async function getAsignaturasService() { //* Esta función obtiene todas las asignaturas.
    try {
        const asignaturaRepository = AppDataSource.getRepository(Asignatura); 

        const asignaturas = await asignaturaRepository.find(); 

        if (!asignaturas || asignaturas.length === 0) return [null, "Asignaturas no encontradas."]; 

        return [asignaturas, null];
    } catch (error) {
        console.error("Ocurrió un error al obtener las asignaturas:", error);
        return [null, "Error interno del servidor."];
    }
};

export async function createAsignaturaService(body) { //* Esta función crea una asignatura.
    try {
        const asignaturaRepository = AppDataSource.getRepository(Asignatura);

        const newAsignatura = asignaturaRepository.create({
            name: body.name,
            description: body.description,
            curso: { id: body.cursoId }
        }); //? Crear una nueva asignatura.

        const asignaturaCreated = await asignaturaRepository.save(newAsignatura);

        return [asignaturaCreated, null];
    } catch (error) {
        console.error("Ocurrió un error al crear la asignatura:", error);
        return [null, "Error interno del servidor."];
    }
};

export async function updateAsignaturaService(query, body) { //* Esta función actualiza una asignatura por id y nombre.
    try {
        const { idAsignatura, nameAsignatura } = query;
        
        const asignaturaRepository = AppDataSource.getRepository(Asignatura); 

        const asignaturaFound = await asignaturaRepository.findOne({ 
            where: [{ id: idAsignatura }, { name: nameAsignatura }],
        });

        if (!asignaturaFound) return [null, "Asignatura no encontrada."]; 

        const asignaturaUpdated = await asignaturaRepository.update(idAsignatura, body); 

        return [asignaturaUpdated, null];
    } catch (error) {
        console.error("Ocurrió un error al actualizar la asignatura:", error);
        return [null, "Error interno del servidor."];
    }
};

export async function deleteAsignaturaService(query) { //* Esta función elimina una asignatura por id y nombre.
    try {
        const { idAsignatura, nameAsignatura } = query;

        const asignaturaRepository = AppDataSource.getRepository(Asignatura); 

        const asignaturaFound = await asignaturaRepository.findOne({ 
            where: [{ id: idAsignatura }, { name: nameAsignatura }],
        });

        if (!asignaturaFound) return [null, "Asignatura no encontrada."]; 

        const asignaturaDeleted = await asignaturaRepository.delete(idAsignatura); 

        return [asignaturaDeleted, null];
    } catch (error) {
        console.error("Ocurrió un error al eliminar la asignatura:", error);
        return [null, "Error interno del servidor."];
    }
};
