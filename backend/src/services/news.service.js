import { AppDataSource } from "../config/configDB.js";
import News from "../models/news.models.js";

// Servicio para crear una nueva noticia
export async function createNewsService({tituloNews, nombreAutor, contenido, imagenPortada}) {
    try { 
        const newsRepository = AppDataSource.getRepository(News);
        // Crea una nueva instancia de noticia con los datos proporcionados
        const news = newsRepository.create({
            tituloNews,
            nombreAutor,
            contenido,
            imagenPortada,
        });
        // Guarda la nueva noticia en la base de datos
        await newsRepository.save(news);
        return [news, null];
    } catch (error) {
        console.error("No se pudo crear la noticia", error);
        return [null, "Error al crear la noticia"];
    }
}

// Servicio para obtener todas las noticias
export async function getNewsService() {
    try {
        const newsRepository = AppDataSource.getRepository(News);
        // Obtiene todas las noticias de la base de datos
        const news = await newsRepository.find();
        return [news, null];
    } catch (error) {
        console.error("Error al obtener las noticias:", error);
        return [null, "Error al obtener las noticias."];
    }
}

// Servicio para obtener una noticia específica por su ID
export async function getNewService(id) {
    try {
        const newsRepository = AppDataSource.getRepository(News);
        // Busca una noticia específica por su ID
        const news = await newsRepository.findOne({ where: { id } });
        if (!news) return [null, "Noticia no encontrada."];
        return [news, null];
    } catch (error) {
        console.error("Error al obtener la noticia:", error);
        return [null, "Error al obtener la noticia."];
    }
}

// Servicio para actualizar una noticia existente
export async function updateNewService(id, { tituloNews, nombreAutor, contenido, imagenPortada }) {
    try {
      const newsRepository = AppDataSource.getRepository(News);
  
      // Busca la noticia por su ID
      const news = await newsRepository.findOneBy({ id });
      if (!news) return [null, "La noticia no existe."];
  
      // Actualiza los campos de la noticia
      news.tituloNews = tituloNews || news.tituloNews;
      news.nombreAutor = nombreAutor || news.nombreAutor;
      news.contenido = contenido || news.contenido;
      if (imagenPortada) {
        news.imagenPortada = imagenPortada;
      }
  
      // Actualiza la fecha de edición
      news.fechaUpdate = new Date();
  
      // Guarda los cambios en la base de datos
      const newsActualizada = await newsRepository.save(news);
      return [newsActualizada, null];
    } catch (error) {
      console.error("Error al actualizar la noticia:", error);
      return [null, "Error al actualizar la noticia."];
    }
  }
// Servicio para eliminar una noticia
export async function deleteNewService(id) {
    try {
        const newsRepository = AppDataSource.getRepository(News);
        // Busca la noticia por su ID
        const news = await newsRepository.findOne({ where: { id } });
        if (!news) return [null, "Noticia no encontrada."];
        
        // Elimina la noticia de la base de datos
        await newsRepository.remove(news);
        return [news, null];
    } catch (error) {
        console.error("Error al eliminar la noticia:", error);
        return [null, "Error al eliminar la noticia."];
    }
}