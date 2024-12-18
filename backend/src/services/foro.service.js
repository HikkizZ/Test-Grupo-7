import { AppDataSource } from "../config/configDB.js";
import { subidaArchivoService } from "../services/archivo.service.js";
import ForoSchema from "../models/foro.models.js";

// Función para crear un nuevo foro
export async function createForoService({ titulo, categoria, contenido, archivos, profesorId, profesorNombre, profesorRut, level, section }) {
    try {
        // Obtener el repositorio de Foro
        const foroRepository = AppDataSource.getRepository(ForoSchema);
        
        // Procesa archivos adjuntos
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

        // Crea una nueva instancia de Foro
        const foro = foroRepository.create({
            titulo,
            categoria,
            contenido,
            archivosAdjuntos,
            profesorId,
            profesorNombre,
            profesorRut,
            level,
            section
        });

        // Guarda el nuevo foro en la base de datos
        await foroRepository.save(foro);

        // Retorna el foro creado y null como error
        return [foro, null];
    } catch (error) {
        console.error("Error al crear el foro:", error);
        return [null, "Error al crear el foro: " + error.message];
    }
}
// Función para actualizar un foro
export async function updateForoService(id, { titulo, categoria, contenido, nuevosArchivosAdjuntos, level, section }, userId) {
    try {
        // Obtener el repositorio de Foro
        const foroRepository = AppDataSource.getRepository(ForoSchema);

        // Busca el foro por su ID
        const foro = await foroRepository.findOne({ where: { id } });
        if (!foro) {
            return [null, "El foro no existe."];
        }

        // Verifica si el usuario tiene permiso para editar el foro
        if (foro.profesorId !== userId) {
            return [null, "No tienes permiso para editar este foro."];
        }

        // Actualiza los campos del foro
        if (titulo) foro.titulo = titulo;
        if (categoria) foro.categoria = categoria;
        if (contenido) foro.contenido = contenido;
        if (level) foro.level = level;
        if (section) foro.section = section;

        // Procesar nuevos archivos adjuntos si se proporcionan
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
            // Reemplazamos los archivos adjuntos existentes con los nuevos
            foro.archivosAdjuntos = archivosAdjuntosProcesados;
        }

        // Guardaoms los cambios en la base de datos
        const foroActualizado = await foroRepository.save(foro);

        // Retorna el foro actualizado y null como error
        return [foroActualizado, null];
    } catch (error) {
        console.error("Error al actualizar el foro:", error);
        return [null, "Error al actualizar el foro: " + error.message];
    }
}
// Función para obtener todos los foros
export async function getForosService() {
    try {
        const foroRepository = AppDataSource.getRepository(ForoSchema);

        const foros = await foroRepository.find({
            relations: ["profesor", "curso"]
        });

        return [foros, null];
    } catch (error) {
        console.error("Error al obtener los foros:", error);
        return [null, "Error al obtener los foros."];
    }
}

// Función para obtener un foro por su ID
export async function getForoService(id) {
    try {
        const foroRepository = AppDataSource.getRepository(ForoSchema);

        const foro = await foroRepository.findOne({
            where: { id },
            relations: ["profesor", "curso"]
        });

        if (!foro) return [null, "Foro no encontrado."];

        return [foro, null];
    } catch (error) {
        console.error("Error al obtener el foro:", error);
        return [null, "Error al obtener el foro."];
    }
}

// Función para eliminar un foro
export async function deleteForoService(id, userId) {
    try {
        const foroRepository = AppDataSource.getRepository(ForoSchema);

        const foro = await foroRepository.findOne({ where: { id } });

        if (!foro) return [null, "Foro no encontrado."];

        if (foro.profesorId !== userId) {
            return [null, "No tienes permiso para eliminar este foro."];
        }

        await foroRepository.remove(foro);

        return [foro, null];
    } catch (error) {
        console.error("Error al eliminar el foro:", error);
        return [null, "Error al eliminar el foro."];
    }
}