"use strict";

import Actividad from "../models/actividad.js";
import { AppDataSource } from "../config/configDB.js"

export async function obtenerActividadesService (req, res) { //servicio para obtener actividades
  try {
    const actividadRepository = AppDataSource.getRepository(Actividad);

    const actividades = await actividadRepository.find();

    if (!actividades || actividades.length === 0) return [null, "No se encotraron actividades"];

    return [actividades, null]
  } catch (error) {
    return [null, "Internal server Error", error.message]
  }
};
export async function obtenerActividadPorIdService(req, res) { //servicio para obtener actividades por ID
  try {
    const actividadRepository = AppDataSource.getRepository(Actividad);

    const { id } = req.params; 

    const actividad = await actividadRepository.findOneBy({ id });

    if (!actividad) return [null, "No se encontró la actividad"];

    return [actividad, null];
  } catch (error) {
    return [null, "Internal server Error", error.message];
  }
};

export async function crearActividadService(body) {
  try {
    const actividadRepository = AppDataSource.getRepository(Actividad);
    const nuevaActividad = actividadRepository.create({
      tipo: body.tipo,
      dia: body.dia,
      hora_inicio: body.hora_inicio,
      hora_fin: body.hora_fin,
      descripcion: body.descripcion,
      creador: { id: body.creadorId } 
    });

    const actividadCreada = await actividadRepository.save(nuevaActividad);
    return [actividadCreada, null];
  } catch (error) {
    console.error("Error al crear la actividad:", error);
    throw error;
  }
}
export async function modificarActividadService(req, res) { //servicio de modificar actividades
  try {
    const actividadRepository = AppDataSource.getRepository(Actividad);
    const { id } = req.params; 
    const nuevosDatos = req.body; 

    await actividadRepository.update(id, nuevosDatos);
    const actividadActualizada = await actividadRepository.findOneBy({ id });

    if (!actividadActualizada) return [null, "No se encontró la actividad a actualizar"];

    return [actividadActualizada, null];
  } catch (error) {
    return [null, "Internal server Error", error.message];
  }
};

export async function eliminarActividadService(req, res) { //servicio para eliminar actividad
  try {
    const actividadRepository = AppDataSource.getRepository(Actividad);
    const { id } = req.params; 

    await actividadRepository.delete(id);

    return ["Actividad eliminada", null];
  } catch (error) {
    return [null, "Internal server Error", error.message];
  }
};