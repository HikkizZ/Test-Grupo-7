import { handleSuccess, handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";
import { foroValidation } from "../validations/foro.validation.js";
import { createForoService, getForosService, getForoService, updateForoService, deleteForoService, getForosByCursoService } from "../services/foro.service.js";
import path from 'path';
import fs from 'fs';

// Función para crear un nuevo foro
export async function createForo(req, res) {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { titulo, categoria, contenido, level, section } = req.body;
        const archivos = req.files; // Archivos subidos
        const profesorId = req.user.id; // Asumimos que el ID del profesor está en req.user

        // Log the received data for debugging
        console.log('Received data:', { titulo, categoria, contenido, level, section, archivos });

        // Ensure all required fields are present
        if (!titulo || !categoria || !contenido || !level || !section) {
            return handleErrorClient(res, 400, "Todos los campos son obligatorios");
        }

        // Validar los datos recibidos
        const { error } = foroValidation.validate({ titulo, categoria, contenido, level, section });
        if (error) {
            return handleErrorClient(res, 400, error.details[0].message);
        }

        // Llamar al servicio para crear el foro
        const [foro, errorService] = await createForoService({
            titulo,
            level,
            section,
            categoria,
            contenido,
            archivos,
            profesorId,
 
        });

        // Manejar errores del servicio
        if (errorService) {
            console.error("Error al crear el foro:", errorService);
            return handleErrorServer(res, 500, "Error al crear el foro.");
        }

        // Enviar respuesta exitosa
        handleSuccess(res, 201, "Foro creado con éxito", foro);
    } catch (error) {
        console.error("Error en el controlador al crear el foro:", error);
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Función para obtener todos los foros
export async function getForos(req, res) {
    try {
        // Llamar al servicio para obtener todos los foros
        const [foros, error] = await getForosService();
        if (error) return handleErrorServer(res, 400, error);

        // Manejar el caso de que no se encuentren foros
        if (foros.length === 0) {
            return handleSuccess(res, 200, "No se encontraron foros.", []);
        }

        // Enviar respuesta exitosa con los foros encontrados
        handleSuccess(res, 200, "Foros encontrados", foros);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Función para obtener un foro por ID
export async function getForo(req, res) {
    try {
        // Extraer el ID de los parámetros de la ruta
        const { id } = req.params;

        // Llamar al servicio para obtener el foro por ID
        const [foro, error] = await getForoService(id);
        if (error) return handleErrorClient(res, 404, error);

        // Enviar respuesta exitosa con el foro encontrado
        handleSuccess(res, 200, "Foro encontrado", foro);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Función para actualizar un foro
export async function updateForo(req, res) {
    try {
        // Extraer el ID de los parámetros de la ruta y los datos del cuerpo de la solicitud
        const { id } = req.params;
        const { titulo, categoria, contenido, level, section } = req.body;
        const nuevosArchivosAdjuntos = req.files; // Nuevos archivos subidos
        const userId = req.user.id; // ID del usuario que intenta actualizar el foro

        // Validar los datos recibidos
        const { error } = foroValidation.validate({ titulo, categoria, contenido, level, section });
        if (error) {
            return handleErrorClient(res, 400, error.details[0].message);
        }

        // Llamar al servicio para actualizar el foro
        const [foroActualizado, errorService] = await updateForoService(id, {
            titulo,
            level,
            section,
            categoria,
            contenido,
            nuevosArchivosAdjuntos,
            level,
            section
        }, userId);

        // Manejar errores del servicio
        if (errorService) {
            return handleErrorClient(res, 400, errorService);
        }

        // Enviar respuesta exitosa con el foro actualizado
        handleSuccess(res, 200, "Foro actualizado correctamente", foroActualizado);
    } catch (error) {
        console.error("Error al actualizar el foro:", error);
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Función para eliminar un foro
export async function deleteForo(req, res) {
    try {
        // Extraer el ID de los parámetros de la ruta
        const { id } = req.params;
        const userId = req.user.id; // ID del usuario que intenta eliminar el foro

        // Llamar al servicio para eliminar el foro
        const [foro, error] = await deleteForoService(id, userId);
        if (error) return handleErrorClient(res, 404, error);

        // Enviar respuesta exitosa con el foro eliminado
        handleSuccess(res, 200, "Foro eliminado", foro);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Función para obtener foros por curso
export async function getForosByCurso(req, res) {
    try {
        // Extraer el nivel y sección del curso de los parámetros de la ruta
        const { level, section } = req.params;

        // Llamar al servicio para obtener los foros por curso
        const [foros, error] = await getForosByCursoService(parseInt(level), section);
        if (error) return handleErrorServer(res, 400, error);

        // Manejar el caso de que no se encuentren foros
        if (foros.length === 0) {
            return handleSuccess(res, 200, "No se encontraron foros para este curso.", []);
        }

        // Enviar respuesta exitosa con los foros encontrados
        handleSuccess(res, 200, "Foros encontrados para el curso", foros);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Función para descargar un archivo adjunto
export const downloadFile = async (req, res) => {
    try {
        const { foroId, fileName } = req.params;
        const [foro, error] = await getForoService(foroId);

        if (error) {
            return handleErrorClient(res, 404, "Foro no encontrado");
        }

        const file = foro.archivosAdjuntos.find(archivo => archivo.nombre === fileName);

        if (!file) {
            return handleErrorClient(res, 404, "Archivo no encontrado");
        }

        const filePath = path.join(__dirname, '..', file.archivoPath);

        if (fs.existsSync(filePath)) {
            res.download(filePath, file.nombre);
        } else {
            handleErrorClient(res, 404, "Archivo no encontrado en el servidor");
        }
    } catch (error) {
        console.error('Error al descargar el archivo:', error);
        handleErrorServer(res, 500, "Error al descargar el archivo", error.message);
    }
};