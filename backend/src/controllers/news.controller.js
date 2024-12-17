import { handleSuccess, handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";
import { newsValidation } from "../validations/news.validation.js";
import { createNewsService, getNewsService, getNewService, updateNewService, deleteNewService } from "../services/news.service.js";
import { upload } from "../middlewares/uploadArchive.middleware.js";
import multer from 'multer';

// Controlador para crear una nueva noticia
export async function createNews(req, res) {
    upload.single('imagenPortada')(req, res, async function(err) {
        if (err) {
            return handleErrorClient(res, 400, `Error en la subida de imagen: ${err.message}`);
        }

        try {
            const { tituloNews, nombreAutor, contenido } = req.body;
            let imagenPortada = null;

            if (req.file) {
                // Convertir la ruta del archivo a una URL relativa
                imagenPortada = `src/upload/images/${req.file.filename}`;
            }

            // Valida los datos de la noticia
            const { error } = newsValidation.validate({
                tituloNews,
                nombreAutor,
                contenido,
                imagenPortada,
            });

            if (error) {
                return handleErrorClient(res, 400, error.message);
            }

            // Llama al servicio para crear la noticia
            const [news, errorService] = await createNewsService({
                tituloNews,
                nombreAutor,
                contenido,
                imagenPortada,
            });

            if (errorService) {
                return handleErrorServer(res, 500, "Error al crear la noticia.", errorService);
            }

            handleSuccess(res, 201, "Noticia creada con éxito", news);
        } catch (error) {
            console.error("Error en el controlador al crear la noticia:", error);
            handleErrorServer(res, 500, "Error interno del servidor.", error.message);
        }
    });
}

// Controlador para obtener todas las noticias
export async function getNews(req, res) {
    try {
        const [news, error] = await getNewsService();
        if (error) return handleErrorServer(res, 500, error);

        if (!news.length) {
            return handleSuccess(res, 200, "No se encontraron noticias.", []);
        }

        handleSuccess(res, 200, "Noticias encontradas", news);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Controlador para obtener una noticia específica por ID
export async function getNewsId(req, res) {
    try {
        const { id } = req.params;

        const [news, error] = await getNewService(id);
        if (error) return handleErrorClient(res, 404, error);

        handleSuccess(res, 200, "Noticia encontrada", news);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}
// Controlador para actualizar una noticia existente
export async function updateNews(req, res) {
    try {
      const { id } = req.params;
      const { tituloNews, nombreAutor, contenido } = req.body;
      let updateData = { tituloNews, nombreAutor, contenido };
  
      // Verifica si se ha subido una nueva imagen
      if (req.file) {
        updateData.imagenPortada = `src/upload/images/${req.file.filename}`;
      }
  
      // Valida los datos de actualización
      const { error } = newsValidation.validate(updateData);
      if (error) {
        return handleErrorClient(res, 400, error.message);
      }
  
      // Obtén la noticia existente
      const [existingNews, getError] = await getNewService(id);
      if (getError) {
        return handleErrorClient(res, 404, getError);
      }
  
      // Si no se subió una nueva imagen, mantenemos la imagen que ya está
      if (!updateData.imagenPortada) {
        updateData.imagenPortada = existingNews.imagenPortada;
      }
  
      // Actualiza la noticia
      const [newsActualizada, errorService] = await updateNewService(id, updateData);
      if (errorService) {
        return handleErrorServer(res, 400, errorService);
      }
  
      handleSuccess(res, 200, "Noticia actualizada correctamente", newsActualizada);
    } catch (error) {
      console.error("Error al actualizar la noticia:", error);
      handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
  }
  
// Controlador para eliminar una noticia
export async function deleteNews(req, res) {
    try {
        const { id } = req.params;

        const [news, error] = await deleteNewService(id);
        if (error) return handleErrorClient(res, 404, error);

        handleSuccess(res, 200, "Noticia eliminada", news);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}
