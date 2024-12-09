import { handleSuccess, handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";
import { foroValidation } from "../validations/foro.validation.js";
import { createForoService, getForosService, getForoService, updateForoService, deleteForoService } from "../services/foro.service.js";

// Crear un nuevo anuncio
export async function createForo(req, res) {
    try {
        const { titulo, nombreProfesor, categoria, fecha } = req.body;

        // Validamos los datos entrantes con foroValidation
        const { error } = foroValidation.validate({ titulo, nombreProfesor, categoria, fecha });
        if (error) {
            return handleErrorClient(res, 400, error.message); // Error en la validación
        }

        // Formateamos la fecha desde el formato DD/MM/YYYY a un objeto Date
        const [dia, mes, anio] = fecha.split("/");
        const fechaFormateada = new Date(anio, mes - 1, dia);

        if (isNaN(fechaFormateada)) {
            return handleErrorClient(res, 400, "La fecha proporcionada no es válida.");
        }

        const [foro, errorService] = await createForoService({
            titulo,
            nombreProfesor,
            categoria,
            fecha: fechaFormateada,
        });

        if (errorService) {
            console.error("Error al crear el anuncio:", errorService);
            return handleErrorServer(res, 500, "Error al crear el anuncio.");
        }

        handleSuccess(res, 201, "Anuncio creado con éxito", foro); // Respuesta exitosa
    } catch (error) {
        console.error("Error en el controlador al crear el anuncio:", error);
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Obtener todos los anuncios
export async function getForos(req, res) {
    try {
        const [foros, error] = await getForosService();
        if (error) return handleErrorServer(res, 400, error);

        if (foros.length === 0) {
            return handleSuccess(res, 200, "No se encontraron anuncios.", []);
        }

        handleSuccess(res, 200, "Anuncios encontrados", foros);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Obtener un anuncio por ID
export async function getForo(req, res) {
    try {
        const { id } = req.params;

        const [foro, error] = await getForoService(id);
        if (error) return handleErrorClient(res, 404, error);

        handleSuccess(res, 200, "Anuncio encontrado", foro);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Actualizar un anuncio
export async function updateForo(req, res) {
    try {
        const { id } = req.params;
        const { titulo, nombreProfesor, categoria, fecha } = req.body;

        // Validar datos entrantes con Joi
        const { error } = foroValidation.validate({ titulo, nombreProfesor, categoria, fecha });
        if (error) {
            return handleErrorClient(res, 400, error.message); // Error de validación
        }

        // Formatear la fecha al formato esperado
        const [dia, mes, anio] = fecha.split("/");
        const fechaFormateada = new Date(anio, mes - 1, dia);

        if (isNaN(fechaFormateada)) {
            return handleErrorClient(res, 400, "La fecha proporcionada no es válida.");
        }

        // Llamar al servicio de actualización
        const [foroActualizado, errorService] = await updateForoService(id, {
            titulo,
            nombreProfesor,
            categoria,
            fecha: fechaFormateada,
        });

        if (errorService) {
            return handleErrorServer(res, 400, errorService);
        }

        handleSuccess(res, 200, "Anuncio actualizado correctamente", foroActualizado);
    } catch (error) {
        console.error("Error al actualizar el anuncio:", error);
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Eliminar un anuncio
export async function deleteForo(req, res) {
    try {
        const { id } = req.params;

        const [foro, error] = await deleteForoService(id);
        if (error) return handleErrorClient(res, 404, error);

        handleSuccess(res, 200, "Anuncio eliminado", foro);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}