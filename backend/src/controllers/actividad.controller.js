"use strict";

import { 
    obtenerActividadesService, 
    obtenerActividadPorIdService, 
    crearActividadService, 
    modificarActividadService, 
    eliminarActividadService 
} from "../services/actividad.service.js";

import { 
    handleSuccess, 
    handleErrorClient, 
    handleErrorServer 
} from "../handlers/responseHandlers.js";

import { 
    actividadBodyValidation, 
    actividadQueryValidation
} from "../validations/actividad.validation.js";

//? This function is used to get all activities from the database.
export async function getActividades(req, res) {
    try {
        const [actividades, errorActividades] = await obtenerActividadesService(); // Get all the activities from the database.

        if (errorActividades) return handleErrorServer(res, 404, errorActividades); // If there is an error, return a message.

        actividades.length === 0
            ? handleErrorClient(res, 404, "No se encontraron actividades.")
            : handleSuccess(res, 200, "Actividades encontradas exitosamente", actividades); // Return the activities.
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message); // Return an error message.
    }
}

//? This function is used to get an activity by its ID from the database.
export async function getActividad(req, res) {
  try {
      // Cambiar de req.query a req.params para obtener el ID de la URL
      const { id } = req.params; // Ahora usamos req.params para obtener el ID

      // Validamos el ID
      const { error } = actividadQueryValidation.validate({ id });

      if (error) return handleErrorClient(res, 400, error.message); // Si hay un error de validación

      // Obtén la actividad por su ID
      const [actividad, errorActividad] = await obtenerActividadPorIdService(id);

      if (errorActividad) return handleErrorServer(res, 404, errorActividad); // Si hay un error al obtener la actividad

      // Si la actividad es encontrada, devolverla con un mensaje exitoso
      handleSuccess(res, 200, "Actividad encontrada exitosamente", actividad);
  } catch (error) {
      // Si ocurre un error en el servidor
      handleErrorServer(res, 500, "Error interno del servidor.", error.message);
  }
}

//? This function is used to create a new activity in the database.
export async function crearActividad(req, res) {
    try {
        const { tipo, dia, hora_inicio, hora_fin, descripcion, creadorId } = req.body; // Get the body parameters.

        // Validate the request body.
        const { error } = actividadBodyValidation.validate(req.body);

        if (error) return handleErrorClient(res, 400, "Error en la validación", error.message); // If there is an error, return a message.

        // Create the activity using the service function.
        const [actividadCreada, actividadError] = await crearActividadService({
            tipo, dia, hora_inicio, hora_fin, descripcion, creadorId
        });

        if (actividadError) return handleErrorClient(res, 400, "Error al crear la actividad", actividadError); // If there is an error, return a message.

        handleSuccess(res, 201, "Actividad creada exitosamente", actividadCreada); // Return the created activity.
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message); // Return an error message.
    }
}

export async function modificarActividad(req, res) {
  try {
      // Cambiar de req.query a req.params para obtener el ID de la URL
      const { id } = req.params;  // Ahora usamos req.params para obtener el ID

      const { body } = req; // Obtener los datos del cuerpo de la solicitud (los cambios)

      // Validar los parámetros de la URL y el cuerpo
      const { error: queryError } = actividadQueryValidation.validate({ id });
      const { error: bodyError } = actividadBodyValidation.validate(body);

      if (queryError) return handleErrorClient(res, 400, queryError.message); // Si hay un error en la validación del ID
      if (bodyError) return handleErrorClient(res, 400, bodyError.message); // Si hay un error en los datos del cuerpo

      // Actualizar la actividad utilizando la función de servicio
      const [actividadModificada, actividadError] = await modificarActividadService(id, body);

      if (actividadError) return handleErrorClient(res, 400, actividadError); // Si hay un error al modificar la actividad

      // Retornar la actividad modificada con un mensaje de éxito
      handleSuccess(res, 200, "Actividad modificada exitosamente", actividadModificada);
  } catch (error) {
      handleErrorServer(res, 500, "Error interno del servidor.", error.message); // Si ocurre un error en el servidor
  }
}


export async function eliminarActividad(req, res) {
  try {
      // Cambiar de req.query a req.params para obtener el ID de la URL
      const { id } = req.params;  // Ahora usamos req.params para obtener el ID

      // Validar el ID de la actividad
      const { error } = actividadQueryValidation.validate({ id });

      if (error) return handleErrorClient(res, 400, error.message); // Si hay un error de validación

      // Eliminar la actividad utilizando la función de servicio
      const [mensaje, actividadError] = await eliminarActividadService(id);

      if (actividadError) return handleErrorServer(res, 404, actividadError); // Si hay un error al eliminar la actividad

      // Retornar un mensaje de éxito
      handleSuccess(res, 200, "Actividad eliminada exitosamente", mensaje);
  } catch (error) {
      handleErrorServer(res, 500, "Error interno del servidor.", error.message); // Si ocurre un error en el servidor
  }
}
