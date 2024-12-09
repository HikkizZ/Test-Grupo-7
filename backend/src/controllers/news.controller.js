import { handleSuccess, handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";
import { newsValidation } from "../validations/news.validation.js";
import { createNewsService, getNewsService, getNewService, updateNewService, deleteNewService } from "../services/news.service.js";

// Crear una nueva noticia
export async function createNews(req, res) {
    try {
      const { tituloNews, nombreAutor, contenido } = req.body;

      const { error } = newsValidation.validate({
        tituloNews,
        nombreAutor,
        contenido,
      });

      if (error) {
        return handleErrorClient(res, 400, error.message);
      }

      const [news, errorService] = await createNewsService({
        tituloNews,
        nombreAutor,
        contenido,
      });

      if (errorService) {
        return handleErrorServer(res, 500, "Error al crear la noticia.", errorService);
      }

      handleSuccess(res, 201, "Noticia creada con éxito", news);
    } catch (error) {
      console.error("Error en el controlador al crear la noticia:", error);
      handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}
// Obtener todas las noticias
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

// Obtener una noticia por ID
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

// Actualizar una noticia
export async function updateNews(req, res) {
    try {
      const { id } = req.params;
      const { tituloNews, nombreAutor, contenido } = req.body;

      const { error } = newsValidation.validate({
        tituloNews,
        nombreAutor,
        contenido,
      });

      if (error) {
        return handleErrorClient(res, 400, error.message); 
      }

      const [newsActualizada, errorService] = await updateNewService(id, {
        tituloNews,
        nombreAutor,
        contenido,
      });

      if (errorService) {
        return handleErrorServer(res, 400, errorService);
      }

      handleSuccess(res, 200, "Noticia actualizada correctamente", newsActualizada);
    } catch (error) {
      console.error("Error al actualizar la noticia:", error);
      handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Eliminar una noticia
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
