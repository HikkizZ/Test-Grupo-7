"use strict";

import Actividad from "../models/actividad.models.js";
import { AppDataSource } from "../config/configDB.js";

export async function obtenerActividadesService() {
    try {
        const actividadRepository = AppDataSource.getRepository(Actividad); // Getting the actividad repository.

        const actividades = await actividadRepository.find(); // Finding all the activities.

        if (!actividades || actividades.length === 0) return [null, "No se encontraron actividades."]; // If no activities found.

        return [actividades, null]; // Return the activities found.
    } catch (error) {
        console.error("An error occurred while getting the activities:", error);
        return [null, "Error interno del servidor."]; // Return an error message.
    }
}

export async function obtenerActividadPorIdService(id) {
    try {
        const actividadRepository = AppDataSource.getRepository(Actividad); // Getting the actividad repository.

        const actividad = await actividadRepository.findOne({
            where: { id }
        }); // Find activity by ID.

        if (!actividad) return [null, "Actividad no encontrada."]; // If no activity found.

        return [actividad, null]; // Return the activity found.
    } catch (error) {
        console.error("An error occurred while getting the activity by id:", error);
        return [null, "Error interno del servidor."]; // Return an error message.
    }
}

export async function crearActividadService(actividadData) {
    try {
        const actividadRepository = AppDataSource.getRepository(Actividad); // Getting the actividad repository.

        // Create a new activity.
        const actividad = actividadRepository.create(actividadData);

        await actividadRepository.save(actividad); // Save the activity to the database.

        return [actividad, null]; // Return the created activity.
    } catch (error) {
        console.error("An error occurred while creating the activity:", error);
        return [null, "Error interno del servidor."]; // Return an error message.
    }
}

export async function modificarActividadService(id, updatedData) {
    try {
        const actividadRepository = AppDataSource.getRepository(Actividad); // Getting the actividad repository.

        const actividad = await actividadRepository.findOne({
            where: { id }
        }); // Find activity by ID.

        if (!actividad) return [null, "Actividad no encontrada."]; // If no activity found.

        // Update the activity with the provided data.
        actividadRepository.merge(actividad, updatedData);

        await actividadRepository.save(actividad); // Save the updated activity.

        return [actividad, null]; // Return the updated activity.
    } catch (error) {
        console.error("An error occurred while updating the activity:", error);
        return [null, "Error interno del servidor."]; // Return an error message.
    }
}

export async function eliminarActividadService(id) {
    try {
        const actividadRepository = AppDataSource.getRepository(Actividad); // Getting the actividad repository.

        const actividad = await actividadRepository.findOne({
            where: { id }
        }); // Find activity by ID.

        if (!actividad) return [null, "Actividad no encontrada."]; // If no activity found.

        await actividadRepository.remove(actividad); // Remove the activity from the database.

        return [actividad, null]; // Return the deleted activity.
    } catch (error) {
        console.error("An error occurred while deleting the activity:", error);
        return [null, "Error interno del servidor."]; // Return an error message.
    }
}
