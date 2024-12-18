import { AppDataSource } from "../config/configDB.js";
import News from "../models/news.models.js";
import User from "../models/user.model.js";

// Servicio para crear una nueva noticia
export async function createNewsService({tituloNews, autorId, contenido, imagenPortada}) {
    try { 
        const newsRepository = AppDataSource.getRepository(News);
        const userRepository = AppDataSource.getRepository(User);
        
        // Buscamos al usuario por su ID
        const autor = await userRepository.findOne({ where: { id: autorId } });
        if (!autor) {
            return [null, "Usuario no encontrado"];
        }

        // Creamos la nueva noticia con los datos proporcionados
        const news = newsRepository.create({
            tituloNews,
            autor,
            contenido,
            imagenPortada,
        });
        
        // Guardamos la noticia en la base de datos
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
        // Obtenemos todas las noticias de la base de datos, incluyendo la información del autor
        const news = await newsRepository.find({
            relations: ["autor"]
        });
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
        // Buscamos una noticia específica por su ID, incluyendo la información del autor
        const news = await newsRepository.findOne({ 
            where: { id },
            relations: ["autor"]
        });
        if (!news) return [null, "Noticia no encontrada."];
        return [news, null];
    } catch (error) {
        console.error("Error al obtener la noticia:", error);
        return [null, "Error al obtener la noticia."];
    }
}

// Servicio para actualizar una noticia existente
export async function updateNewService(id, { tituloNews, contenido, imagenPortada }, userId) {
    try {
      const newsRepository = AppDataSource.getRepository(News);
  
      // Buscamos la noticia por su ID, incluyendo la relación con el autor
      const news = await newsRepository.findOne({ 
        where: { id },
        relations: ["autor"]
      });
      if (!news) return [null, "La noticia no existe."];
      
      // Verificamos si el usuario que intenta actualizar es el autor de la noticia
      if (news.autor.id !== userId) {
        return [null, "No tienes permiso para editar esta noticia."];
      }
  
      // Actualizamos los campos de la noticia
      news.tituloNews = tituloNews || news.tituloNews;
      news.contenido = contenido || news.contenido;
      if (imagenPortada) {
        news.imagenPortada = imagenPortada;
      }
  
      // Actualizamos la fecha de modificación
      news.fechaUpdate = new Date();
  
      // Guardamos los cambios en la base de datos
      const newsActualizada = await newsRepository.save(news);
      return [newsActualizada, null];
    } catch (error) {
      console.error("Error al actualizar la noticia:", error);
      return [null, "Error al actualizar la noticia."];
    }
}

// Servicio para eliminar una noticia
export async function deleteNewService(id, userId) {
    try {
        const newsRepository = AppDataSource.getRepository(News);
        // Buscamos la noticia por su ID, incluyendo la relación con el autor
        const news = await newsRepository.findOne({ 
          where: { id },
          relations: ["autor"]
        });
        if (!news) return [null, "Noticia no encontrada."];
        
        // Verificamos si el usuario que intenta eliminar es el autor de la noticia
        if (news.autor.id !== userId) {
          return [null, "No tienes permiso para eliminar esta noticia."];
        }
        
        // Eliminamos la noticia de la base de datos
        await newsRepository.remove(news);
        return [news, null];
    } catch (error) {
        console.error("Error al eliminar la noticia:", error);
        return [null, "Error al eliminar la noticia."];
    }
}