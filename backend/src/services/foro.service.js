import { AppDataSource } from "../config/configDB.js";
import { subidaArchivoService } from "../services/archivo.service.js";
import ForoSchema from "../models/foro.models.js";

// Función para crear un nuevo foro
export async function createForoService({ titulo, categoria, contenido, archivos, profesorId, level, section }) {
    try {
        // Obtener el repositorio de Foro
        const foroRepository = AppDataSource.getRepository(ForoSchema);
        
        // Procesar archivos adjuntos
        let archivosAdjuntos = [];
        if (archivos && archivos.length > 0) {
            for (let archivo of archivos) {
                const [newArchivo, error] = await subidaArchivoService({
                    nombre: archivo.originalname,
                    archivoPath: archivo.path
                });
                if (error) throw new Error(error);
                archivosAdjuntos.push(newArchivo);
            }
        }

        // Crear una nueva instancia de Foro
        const foro = foroRepository.create({
            titulo,
            categoria,
            contenido,
            archivosAdjuntos,
            profesorId,
            level,
            section
        });

        // Guardar el nuevo foro en la base de datos
        await foroRepository.save(foro);

        // Retornar el foro creado y null como error
        return [foro, null];
    } catch (error) {
        console.error("Error al crear el foro:", error);
        return [null, "Error al crear el foro."];
    }
}

// Función para obtener todos los foros
export async function getForosService() {
    try {
        // Obtener el repositorio de Foro
        const foroRepository = AppDataSource.getRepository(ForoSchema);

        // Obtener todos los foros de la base de datos con sus relaciones
        const foros = await foroRepository.find({
            relations: ["profesor", "curso"]
        });

        // Retornar los foros encontrados y null como error
        return [foros, null];
    } catch (error) {
        console.error("Error al obtener los foros:", error);
        return [null, "Error al obtener los foros."];
    }
}

// Función para obtener un foro por su ID
export async function getForoService(id) {
    try {
        // Obtener el repositorio de Foro
        const foroRepository = AppDataSource.getRepository(ForoSchema);

        // Buscar el foro por su ID con sus relaciones
        const foro = await foroRepository.findOne({
            where: { id },
            relations: ["profesor", "curso"]
        });

        // Si no se encuentra el foro, retornar null y un mensaje de error
        if (!foro) return [null, "Foro no encontrado."];

        // Retornar el foro encontrado y null como error
        return [foro, null];
    } catch (error) {
        console.error("Error al obtener el foro:", error);
        return [null, "Error al obtener el foro."];
    }
}

// Función para actualizar un foro
export async function updateForoService(id, { titulo, categoria, contenido, nuevosArchivosAdjuntos, level, section }, userId) {
    try {
        // Obtener el repositorio de Foro
        const foroRepository = AppDataSource.getRepository(ForoSchema);

        // Buscar el foro por su ID
        const foro = await foroRepository.findOne({ where: { id } });
        if (!foro) {
            return [null, "El foro no existe."];
        }

        // Verificar si el usuario tiene permiso para editar el foro
        if (foro.profesorId !== userId) {
            return [null, "No tienes permiso para editar este foro."];
        }

        // Actualizar los campos del foro
        foro.titulo = titulo;
        foro.categoria = categoria;
        foro.contenido = contenido;
        foro.level = level;
        foro.section = section;

        // Procesar archivos adjuntos si se proporcionan nuevos
        if (nuevosArchivosAdjuntos && nuevosArchivosAdjuntos.length > 0) {
            let archivosAdjuntosProcesados = [];
            for (let nuevoArchivo of nuevosArchivosAdjuntos) {
                const [archivoProcesado, error] = await subidaArchivoService({
                    nombre: nuevoArchivo.originalname,
                    archivoPath: nuevoArchivo.path
                });
                if (error) throw new Error(error);
                archivosAdjuntosProcesados.push(archivoProcesado);
            }
            // Reemplazar los archivos adjuntos existentes con los nuevos
            foro.archivosAdjuntos = archivosAdjuntosProcesados;
        }

        // Guardar los cambios en la base de datos
        const foroActualizado = await foroRepository.save(foro);

        // Retornar el foro actualizado y null como error
        return [foroActualizado, null];
    } catch (error) {
        console.error("Error al actualizar el foro:", error);
        return [null, "Error al actualizar el foro."];
    }
}

// Función para eliminar un foro
export async function deleteForoService(id, userId) {
    try {
        // Obtener el repositorio de Foro
        const foroRepository = AppDataSource.getRepository(ForoSchema);

        // Buscar el foro por su ID
        const foro = await foroRepository.findOne({ where: { id } });

        // Si no se encuentra el foro, retornar null y un mensaje de error
        if (!foro) return [null, "Foro no encontrado."];

        // Verificar si el usuario tiene permiso para eliminar el foro
        if (foro.profesorId !== userId) {
            return [null, "No tienes permiso para eliminar este foro."];
        }

        // Eliminar el foro de la base de datos
        await foroRepository.remove(foro);

        // Retornar el foro eliminado y null como error
        return [foro, null];
    } catch (error) {
        console.error("Error al eliminar el foro:", error);
        return [null, "Error al eliminar el foro."];
    }
}

// Función para obtener foros por curso (level y section)
export async function getForosByCursoService(level, section) {
    try {
        // Obtener el repositorio de Foro
        const foroRepository = AppDataSource.getRepository(ForoSchema);

        // Buscar los foros por el nivel y sección del curso
        const foros = await foroRepository.find({
            where: { level, section },
            relations: ["profesor", "curso"]
        });

        // Retornar los foros encontrados y null como error
        return [foros, null];
    } catch (error) {
        console.error("Error al obtener los foros del curso:", error);
        return [null, "Error al obtener los foros del curso."];
    }
}