import Foro from "../models/foro.models.js";
import { AppDataSource } from "../config/configDB.js";

// Función para crear un nuevo anuncio
export async function createForoService({ titulo, nombreProfesor, categoria, fecha }) {
    try {
        const foroRepository = AppDataSource.getRepository(Foro);

        const foro = foroRepository.create({
            titulo,
            nombreProfesor,
            categoria,
            fecha: new Date(fecha), // Se guarda la fecha en formato ISO
        });

        await foroRepository.save(foro);

        return [foro, null];
    } catch (error) {
        console.error("Error al crear el anuncio:", error);
        return [null, "Error al crear el anuncio."];
    }
}

// Función para obtener todos los anuncios
export async function getForosService() {
    try {
        const foroRepository = AppDataSource.getRepository(Foro);

        const foros = await foroRepository.find();

        return [foros, null];
    } catch (error) {
        console.error("Error al obtener los anuncios:", error);
        return [null, "Error al obtener los anuncios."];
    }
}

// Función para obtener un anuncio por su ID
export async function getForoService(id) {
    try {
        const foroRepository = AppDataSource.getRepository(Foro);

        const foro = await foroRepository.findOne({ where: { id } });

        if (!foro) return [null, "Anuncio no encontrado."];

        return [foro, null];
    } catch (error) {
        console.error("Error al obtener el anuncio:", error);
        return [null, "Error al obtener el anuncio."];
    }
}

// Función para actualizar un anuncio
export async function updateForoService(id, { titulo, nombreProfesor, categoria, fecha }) {
    try {
        const foroRepository = AppDataSource.getRepository(Foro);

        // Verificar si existe el anuncio
        const foro = await foroRepository.findOneBy({ id });
        if (!foro) {
            return [null, "El anuncio no existe."];
        }

        // Convertir la fecha de "DD/MM/YYYY" a objeto Date
        const [dia, mes, anio] = fecha.split("/");
        const fechaObj = new Date(anio, mes - 1, dia);

        // Actualizar el anuncio
        foro.titulo = titulo;
        foro.nombreProfesor = nombreProfesor;
        foro.categoria = categoria;
        foro.fecha = fechaObj;

        const foroActualizado = await foroRepository.save(foro);

        return [foroActualizado, null];
    } catch (error) {
        console.error("Error al actualizar el anuncio:", error);
        return [null, "Error al actualizar el anuncio."];
    }
}


// Función para eliminar un anuncio
export async function deleteForoService(id) {
    try {
        const foroRepository = AppDataSource.getRepository(Foro);

        const foro = await foroRepository.findOne({ where: { id } });

        if (!foro) return [null, "Anuncio no encontrado."];

        await foroRepository.remove(foro);

        return [foro, null];
    } catch (error) {
        console.error("Error al eliminar el anuncio:", error);
        return [null, "Error al eliminar el anuncio."];
    }
}