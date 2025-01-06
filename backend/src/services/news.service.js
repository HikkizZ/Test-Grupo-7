import { AppDataSource } from "../config/configDB.js";
import News from "../models/news.models.js";
import User from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

//obtiene todos los correos electronicos registrados en la bd
async function getRecipientEmails() {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
        return users.map(user => user.email);
    } catch (error) {
        console.error("Error al obtener los correos de los usuarios:", error);
        return [];
    }
}

// Servicio para crear una nueva noticia
export async function createNewsService({tituloNews, autorId, contenido, imagenPortada}) {
    try { 
        const newsRepository = AppDataSource.getRepository(News);
        const userRepository = AppDataSource.getRepository(User);
        
        //  al usuario por su ID
        const autor = await userRepository.findOne({ where: { id: autorId } });
        if (!autor) {
            return [null, "Usuario no encontrado"];
        }

        // Crea la nueva noticia con los datos proporcionados
        const news = newsRepository.create({
            tituloNews,
            autor,
            contenido,
            imagenPortada,
        });
        
        // Guardamos la noticia en la base de datos
        await newsRepository.save(news);

        // Enviamos el correo electrónico
        const emailSubject = "Nueva noticia publicada";
        const emailText = `Se ha publicado una nueva noticia:
        Título: ${tituloNews}
        Autor: ${autor.nombre}
        Fecha de publicación: ${news.fechaPublicacion}`;
        const emailHtml = `
        <h1>Nueva noticia publicada</h1>
        <p><strong>Título:</strong> ${tituloNews}</p>
        <p><strong>Autor:</strong> ${autor.nombre}</p>
        <p><strong>Fecha de publicación:</strong> ${news.fechaPublicacion}</p>
        `;

        // Obtiene la lista de correos electrónicos de todos los usuarios registrados
        const recipientEmails = await getRecipientEmails();

        // Envia el correo a todos los usuarios registrados
        for (const email of recipientEmails) {
            try {
                await sendEmail(email, emailSubject, emailText, emailHtml);
            } catch (error) {
                console.error(`Error al enviar correo a ${email}:`, error);
                // Continua con el siguiente correo si hay un error
            }
        }

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
        // Obtiene todas las noticias de la base de datos, incluyendo la información del autor
        const news = await newsRepository.find({
            relations: ["autor"]
        });
        
        // Ajusta la ruta de la imagen para cada noticia
        news.forEach(item => {
            if (item.imagenPortada) {
                item.imagenPortada = `${BASE_URL}${item.imagenPortada}`;
            }
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
        // Busca una noticia específica por su ID, incluyendo la información del autor
        const news = await newsRepository.findOne({ 
            where: { id },
            relations: ["autor"]
        });
        if (!news) return [null, "Noticia no encontrada."];
        
        // Ajusta la ruta de la imagen si es necesario
        if (news.imagenPortada) {
            news.imagenPortada = `${BASE_URL}${news.imagenPortada}`;
        }
        
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
  
      // Busca la noticia por su ID, incluyendo la relación con el autor
      const news = await newsRepository.findOne({ 
        where: { id },
        relations: ["autor"]
      });
      if (!news) return [null, "La noticia no existe."];
      
      // Verifica si el usuario que intenta actualizar es el autor de la noticia
      if (news.autor.id !== userId) {
        return [null, "No tienes permiso para editar esta noticia."];
      }
  
      // Actualiza los campos de la noticia
      news.tituloNews = tituloNews || news.tituloNews;
      news.contenido = contenido || news.contenido;
      if (imagenPortada) {
        news.imagenPortada = imagenPortada;
      }
  
      // Actualiza la fecha de modificación
      news.fechaUpdate = new Date();
  
      // Guarda los cambios en la base de datos
      const newsActualizada = await newsRepository.save(news);
      
      // Ajusta la ruta de la imagen si es necesario
      if (newsActualizada.imagenPortada) {
        newsActualizada.imagenPortada = `${BASE_URL}${newsActualizada.imagenPortada}`;
      }
      
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
        // Busca la noticia por su ID, incluyendo la relación con el autor
        const news = await newsRepository.findOne({ 
          where: { id },
          relations: ["autor"]
        });
        if (!news) return [null, "Noticia no encontrada."];
        
        // Verifica si el usuario que intenta eliminar es el autor de la noticia
        if (news.autor.id !== userId) {
          return [null, "No tienes permiso para eliminar esta noticia."];
        }
        
        // Elimina la noticia de la base de datos
        await newsRepository.remove(news);
        return [news, null];
    } catch (error) {
        console.error("Error al eliminar la noticia:", error);
        return [null, "Error al eliminar la noticia."];
    }
}