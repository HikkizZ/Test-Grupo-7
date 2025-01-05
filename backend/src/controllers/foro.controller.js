import { handleSuccess, handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";
import { foroValidation } from "../validations/foro.validation.js";
import { createForoService, getForosService, getForoService, updateForoService, deleteForoService } from "../services/foro.service.js";
import path from 'path';
import fs from 'fs';

// Función para crear un nuevo foro
export async function createForo(req, res) {
    try {
        // Extrae datos del cuerpo de la solicitud y del usuario autenticado
        const { titulo, categoria, contenido, level, section } = req.body;
        const archivos = req.files;
        const profesorId = req.user.id;
        const profesorNombre = req.user.name;
        const profesorRut = req.user.rut;

        // Registra los datos recibidos para depuración
        console.log('Datos recibidos:', { titulo, categoria, contenido, level, section, archivos, profesorNombre, profesorRut });

        // Valida los datos recibidos
        const { error } = foroValidation.validate({ titulo, categoria, contenido, level, section });
        if (error) {
            return handleErrorClient(res, 400, error.details[0].message);
        }

        // Llama al servicio para crear el foro
        const [foro, errorService] = await createForoService({
            titulo,
            level,
            section,
            categoria,
            contenido,
            archivos,
            profesorId,
            profesorNombre,
            profesorRut,
        });

        // Maneja errores del servicio
        if (errorService) {
            console.error("Error al crear el foro:", errorService);
            return handleErrorServer(res, 500, errorService);
        }

        // Envia respuesta exitosa
        handleSuccess(res, 201, "Foro creado con éxito", foro);
    } catch (error) {
        console.error("Error en el controlador al crear el foro:", error);
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}
// Función para actualizar un foro
export async function updateForo(req, res) {
    try {
        // Extrae datos de los parámetros y del cuerpo de la solicitud
        const { id } = req.params;
        const { titulo, categoria, contenido, level, section } = req.body;
        const nuevosArchivosAdjuntos = req.files;
        const userId = req.user.id;

        // Valida los datos recibidos
        const { error } = foroValidation.validate({ titulo, categoria, contenido, level, section });
        if (error) {
            return handleErrorClient(res, 400, error.details[0].message);
        }

        // Llama al servicio para actualizar el foro
        const [foroActualizado, errorService] = await updateForoService(id, {
            titulo,
            level,
            section,
            categoria,
            contenido,
            nuevosArchivosAdjuntos,
        }, userId);

        // Maneja errores del servicio
        if (errorService) {
            return handleErrorClient(res, 400, errorService);
        }

        // Envia respuesta exitosa
        handleSuccess(res, 200, "Foro actualizado correctamente", foroActualizado);
    } catch (error) {
        console.error("Error al actualizar el foro:", error);
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}
// Función para obtener todos los foros
export async function getForos(req, res) {
    try {
        const [foros, error] = await getForosService();
        if (error) return handleErrorServer(res, 400, error);

        if (foros.length === 0) {
            return handleSuccess(res, 200, "No se encontraron foros.", []);
        }

        handleSuccess(res, 200, "Foros encontrados", foros);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Función para obtener un foro por ID
export async function getForo(req, res) {
    try {
        const { id } = req.params;

        const [foro, error] = await getForoService(id);
        if (error) return handleErrorClient(res, 404, error);

        handleSuccess(res, 200, "Foro encontrado", foro);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Función para eliminar un foro
export async function deleteForo(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const [foro, error] = await deleteForoService(id, userId);
        if (error) return handleErrorClient(res, 404, error);

        handleSuccess(res, 200, "Foro eliminado", foro);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}
export async function downloadForo(req, res) {
    try {
        const { id } = req.params;

        // Obtener el foro por su ID
        const [foro, error] = await getForoService(id);
        if (error) {
            return handleErrorClient(res, 404, error);
        }

        // Verificar si el foro tiene archivos adjuntos
        if (!foro.archivosAdjuntos || foro.archivosAdjuntos.length === 0) {
            return handleErrorClient(res, 404, "Este foro no tiene archivos adjuntos.");
        }

        // Obtener el primer archivo adjunto
        const archivo = foro.archivosAdjuntos[0];

        // Verificar si la ruta del archivo está disponible
        if (!archivo.archivo) {
            return handleErrorClient(res, 404, "La ruta del archivo no está disponible.");
        }

        // Construir la ruta completa del archivo
        const filePath = path.join(process.cwd(), archivo.archivo);

        // Verificar si el archivo existe en el servidor
        if (!fs.existsSync(filePath)) {
            return handleErrorClient(res, 404, "El archivo no se encuentra en el servidor.");
        }

        // Configurar los headers para la descarga
        res.setHeader('Content-Disposition', `attachment; filename="${archivo.nombre}"`);
        res.setHeader('Content-Type', 'application/pdf');

        // Enviar el archivo como respuesta
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}
