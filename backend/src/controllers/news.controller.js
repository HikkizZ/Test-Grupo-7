import { handleSuccess, handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";
import { newsValidation } from "../validations/news.validation.js";
import { createNewsService, getNewsService, getNewService, updateNewService, deleteNewService } from "../services/news.service.js";
import { upload } from "../middlewares/uploadArchive.middleware.js";
import multer from 'multer';

// Controlador para crear una nueva noticia
export async function createNews(req, res) {
    // Utilizamos el middleware de carga de archivos para manejar la imagen de portada
    upload.single('imagenPortada')(req, res, async function(err) {
        if (err) {
            return handleErrorClient(res, 400, `Error en la subida de imagen: ${err.message}`);
        }

        try {
            const { tituloNews, contenido } = req.body;
            let imagenPortada = null;

            // Si se subió una imagen, guardamos su ruta
            if (req.file) {
                imagenPortada = `src/upload/images/${req.file.filename}`;
            }

            // Validamos los datos de la noticia
            const { error } = newsValidation.validate({
                tituloNews,
                contenido,
                imagenPortada,
            });

            if (error) {
                return handleErrorClient(res, 400, error.message);
            }

            // Creamos la noticia utilizando el servicio
            const [news, errorService] = await createNewsService({
                tituloNews,
                autorId: req.user.id, // Usamos el ID del usuario autenticado como autor
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
// Controlador para obtener todas las noticias (usada en front y backend)
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

// Controlador para obtener una noticia por su ID (especifica para backend)
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
// Controlador update
export async function updateNews(req, res) {
  // Utilizamos el middleware de carga de archivos para manejar la imagen de portada
  upload.single('imagenPortada')(req, res, async function(err) {
    if (err) {
      return handleErrorClient(res, 400, `Error en la subida de imagen: ${err.message}`);
    }

    try {
      const { id } = req.params;
      const { tituloNews, contenido } = req.body;
      let updateData = { tituloNews, contenido };

      // Si se subió una nueva imagen, actualizamos su ruta
      if (req.file) {
        updateData.imagenPortada = `src/upload/images/${req.file.filename}`;
      }

      // Validamos los datos de actualización
      const { error } = newsValidation.validate(updateData);
      if (error) {
        return handleErrorClient(res, 400, error.message);
      }

      // Actualizamos la noticia utilizando el servicio
      const [newsActualizada, errorService] = await updateNewService(id, updateData, req.user.id);
      if (errorService) {
        return handleErrorClient(res, 403, errorService);
      }

      handleSuccess(res, 200, "Noticia actualizada correctamente", newsActualizada);
    } catch (error) {
      console.error("Error al actualizar la noticia:", error);
      handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
  });
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
