import News from "../models/news.models.js";
import { AppDataSource } from "../config/configDB.js";

export async function createNewsService({tituloNews, nombreAutor, contenido}) {
    try { 
        const newsRepository = AppDataSource.getRepository(News);
        const news = newsRepository.create({
            tituloNews,
            nombreAutor,
            contenido,
            // fechaPublicacion se establecerá automáticamente
        });
        await newsRepository.save(news);
        return [news,null];
    } catch (error) {
        console.error("No se pudo crear el anuncio",error);
        return [null, "error al crear el anuncio"];
    }
}

// Función para obtener todos los anuncios
export async function getNewsService() {
    try {
        const newsRepository = AppDataSource.getRepository(News);

        const news = await newsRepository.find();

        return [news, null];
    } catch (error) {
        console.error("Error al obtener los anuncios:", error);
        return [null, "Error al obtener los anuncios."];
    }
};

// Función para obtener un anuncio por su ID
export async function getNewService(id) {
    try {
        const newsRepository = AppDataSource.getRepository(News);

        const news= await newsRepository.findOne({ where: { id } });

        if (!news) return [null, "Anuncio no encontrado."];

        return [news,null];
    } catch (error) {
        console.error("Error al obtener el anuncio:", error);
        return [null, "Error al obtener el anuncio."];
    }
};

// Función para actualizar un anuncio
export async function updateNewService(id, { tituloNews, nombreAutor, contenido }) {
    try {
        const newsRepository = AppDataSource.getRepository(News);

        const news = await newsRepository.findOneBy({ id });
        if (!news) return [null, "La noticia no existe."];

        news.tituloNews = tituloNews;
        news.nombreAutor = nombreAutor;
        news.contenido = contenido; 
        // fechaPublicacion se actualizará automáticamente

        const newsActualizada = await newsRepository.save(news);

        return [newsActualizada, null];
    } catch (error) {
        console.error("Error al actualizar la noticia:", error);
        return [null, "Error al actualizar la noticia."];
    }
};

// Función para eliminar un anuncio
export async function deleteNewService(id) {
    try {
        const newsRepository = AppDataSource.getRepository(News);

        // Buscar el registro en la base de datos
        const news = await newsRepository.findOne({ where: { id } });

        if (!news) {
            return [null, "Anuncio no encontrado."];
        }

        // Eliminar el registro correctamente
        await newsRepository.remove(news);

        return [news, null];
    } catch (error) {
        console.error("Error al eliminar el anuncio:", error);
        return [null, "Error al eliminar el anuncio."];
    }
};

