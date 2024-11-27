"use strict";

import { // Servicios
  obtenerActividadesService,
  obtenerActividadPorIdService,
  crearActividadService,
  modificarActividadService,
  eliminarActividadService
} from "../services/actividad.service.js";

import {
  handleSuccess,
  handleErrorServer,
  handleErrorClient
} from "../handlers/responseHandlers.js";

import {
  actividadBodyValidation
} from "../validations/actividad.validation.js";

export async function getActividades(req, res) {
  try {
    const [actividades, actividadesError] = await obtenerActividadesService(req);

    if (actividadesError) return handleErrorClient(res, 400, actividadesError);

    actividades === 0 ? handleSuccess(res, 204, "No se encontraron actividades") : handleSuccess(res, 200, "Actividades Encontradas", actividades);

  } catch (error) {
    handleErrorServer(res, 500, "Error interno del servidor", error.message);
  }
}

export async function getActividad(req, res) {
  try {
    const [actividad, actividadError] = await obtenerActividadPorIdService(req, res);

    if (actividadError) return handleErrorClient(res, 400, actividadError);

    handleSuccess(res, 200, "Actividad encontrada", actividad);

  } catch (error) {
    handleErrorSever(res, 500, "Error interno del servidor", error.message);
  }
}

export async function crearActividad(req, res) {
  try {
    console.log("req.body:", req.body);

    const { tipo, dia, hora_inicio, hora_fin, descripcion, creadorId } = req.body;

    console.log("Datos para crear actividad:", { tipo, dia, hora_inicio, hora_fin, descripcion, creadorId });

    const { error } = actividadBodyValidation.validate(req.body);

    if (error) {
      console.log("Error de validación:", error.message);
      return handleErrorClient(res, 400, "Validation Error", error.message);
    }

    const [actividadCreada, actividadError] = await crearActividadService({ tipo, dia, hora_inicio, hora_fin, descripcion, creadorId });

    if (actividadError) {
      console.log("Error al crear actividad:", actividadError);
      return handleErrorClient(res, 400, actividadError);
    }

    console.log("Actividad creada:", actividadCreada);
    handleSuccess(res, 201, "Actividad creada", actividadCreada);

  } catch (error) {
    console.error("Error en el bloque catch:", error);
    handleErrorServer(res, 500, "Error interno del servidor", error.message);
  }
}
export async function modificarActividad(req, res) {
  try {
    const { error } = actividadBodyValidation.validate(req.body);

    if (error) return handleErrorClient(res, 400, "Validation Error", error.message);

    const [actividadModificada, actividadError] = await modificarActividadService(req, res);

    if (actividadError) return handleErrorClient(res, 400, actividadError);

    handleSuccess(res, 200, "Actividad modificada", actividadModificada);

  } catch (error) {
    handleErrorServer(res, 500, "Error interno del servidor", error.message);
  }
}

export async function eliminarActividad(req, res) {
  try {
    const [mensaje, actividadError] = await eliminarActividadService(req, res);

    if (actividadError) return handleErrorClient(res, 400, actividadError);

    handleSuccess(res, 200, mensaje);

  } catch (error) {
    handleErrorServer(res, 500, "Error interno del servidor", error.message);
  }
}
