// Importaciones necesarias
import Foro from "../models/foro.models.js";
import { AppDataSource } from "../config/configDB.js";
import { subidaArchivoService } from "../services/archivo.service.js";

// Función para crear un nuevo anuncio
export async function createForoService({ titulo, nombreProfesor, categoria, fecha, contenido, archivos }) {
    try {
        // Obtener el repositorio de Foro
        const foroRepository = AppDataSource.getRepository(Foro);
        
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
            nombreProfesor,
            categoria,
            contenido,
            fecha,
            archivosAdjuntos
        });

        // Guardar el nuevo foro en la base de datos
        await foroRepository.save(foro);

        // Retornar el foro creado y null como error
        return [foro, null];
    } catch (error) {
        console.error("Error al crear el anuncio:", error);
        return [null, "Error al crear el anuncio."];
    }
}


// Función para obtener todos los anuncios
export async function getForosService() {
    try {
        // Obtener el repositorio de Foro
        const foroRepository = AppDataSource.getRepository(Foro);

        // Obtener todos los foros de la base de datos
        const foros = await foroRepository.find();

        // Retornar los foros encontrados y null como error
        return [foros, null];
    } catch (error) {
        console.error("Error al obtener los anuncios:", error);
        return [null, "Error al obtener los anuncios."];
    }
}

// Función para obtener un anuncio por su ID
export async function getForoService(id) {
    try {
        // Obtener el repositorio de Foro
        const foroRepository = AppDataSource.getRepository(Foro);

        // Buscar el foro por su ID
        const foro = await foroRepository.findOne({ where: { id } });

        // Si no se encuentra el foro, retornar null y un mensaje de error
        if (!foro) return [null, "Anuncio no encontrado."];

        // Retornar el foro encontrado y null como error
        return [foro, null];
    } catch (error) {
        console.error("Error al obtener el anuncio:", error);
        return [null, "Error al obtener el anuncio."];
    }
}

// Función para actualizar un anuncio
export async function updateForoService(id, { titulo, nombreProfesor, categoria, contenido, fecha }) {
    try {
        // Obtener el repositorio de Foro
        const foroRepository = AppDataSource.getRepository(Foro);

        // Buscar el foro por su ID
        const foro = await foroRepository.findOneBy({ id });
        if (!foro) {
            return [null, "El anuncio no existe."];
        }

        // Actualizar los campos del foro
        foro.titulo = titulo;
        foro.nombreProfesor = nombreProfesor;
        foro.categoria = categoria;
        foro.contenido = contenido;
        foro.fecha = fecha;

        // Guardar los cambios en la base de datos
        const foroActualizado = await foroRepository.save(foro);

        // Retornar el foro actualizado y null como error
        return [foroActualizado, null];
    } catch (error) {
        console.error("Error al actualizar el anuncio:", error);
        return [null, "Error al actualizar el anuncio."];
    }
}

// Función para eliminar un anuncio
export async function deleteForoService(id) {
    try {
        // Obtener el repositorio de Foro
        const foroRepository = AppDataSource.getRepository(Foro);

        // Buscar el foro por su ID
        const foro = await foroRepository.findOne({ where: { id } });

        // Si no se encuentra el foro, retornar null y un mensaje de error
        if (!foro) return [null, "Anuncio no encontrado."];

        // Eliminar el foro de la base de datos
        await foroRepository.remove(foro);

        // Retornar el foro eliminado y null como error
        return [foro, null];
    } catch (error) {
        console.error("Error al eliminar el anuncio:", error);
        return [null, "Error al eliminar el anuncio."];
    }
}