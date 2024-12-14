import { handleSuccess, handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";
import { foroValidation } from "../validations/foro.validation.js";
import { createForoService, getForosService, getForoService, updateForoService, deleteForoService } from "../services/foro.service.js";

// Función para crear un nuevo anuncio
export async function createForo(req, res) {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { titulo, nombreProfesor, categoria, contenido, fecha } = req.body;
        const archivos = req.files; // Archivos subidos

        // Validar los datos recibidos
        const { error } = foroValidation.validate({ titulo, nombreProfesor, categoria, contenido, fecha });
        if (error) {
            return handleErrorClient(res, 400, error.message);
        }

        // Llamar al servicio para crear el anuncio
        const [foro, errorService] = await createForoService({
            titulo,
            nombreProfesor,
            categoria,
            contenido,
            fecha,
            archivos
        });

        // Manejar errores del servicio
        if (errorService) {
            console.error("Error al crear el anuncio:", errorService);
            return handleErrorServer(res, 500, "Error al crear el anuncio.");
        }

        // Enviar respuesta exitosa
        handleSuccess(res, 201, "Anuncio creado con éxito", foro);
    } catch (error) {
        console.error("Error en el controlador al crear el anuncio:", error);
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Función para obtener todos los anuncios
export async function getForos(req, res) {
    try {
        // Llamar al servicio para obtener todos los anuncios
        const [foros, error] = await getForosService();
        if (error) return handleErrorServer(res, 400, error);

        // Manejar el caso de que no se encuentren anuncios
        if (foros.length === 0) {
            return handleSuccess(res, 200, "No se encontraron anuncios.", []);
        }

        // Enviar respuesta exitosa con los anuncios encontrados
        handleSuccess(res, 200, "Anuncios encontrados", foros);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Función para obtener un anuncio por ID
export async function getForo(req, res) {
    try {
        // Extraer el ID de los parámetros de la ruta
        const { id } = req.params;

        // Llamar al servicio para obtener el anuncio por ID
        const [foro, error] = await getForoService(id);
        if (error) return handleErrorClient(res, 404, error);

        // Enviar respuesta exitosa con el anuncio encontrado
        handleSuccess(res, 200, "Anuncio encontrado", foro);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Función para actualizar un anuncio
export async function updateForo(req, res) {
    try {
        // Extraer el ID de los parámetros de la ruta y los datos del cuerpo de la solicitud
        const { id } = req.params;
        const { titulo, nombreProfesor, categoria, contenido, fecha } = req.body;

        // Validar los datos recibidos
        const { error } = foroValidation.validate({ titulo, nombreProfesor, categoria, contenido, fecha });
        if (error) {
            return handleErrorClient(res, 400, error.message);
        }

        // Llamar al servicio para actualizar el anuncio
        const [foroActualizado, errorService] = await updateForoService(id, {
            titulo,
            nombreProfesor,
            categoria,
            contenido,
            fecha,
        });

        // Manejar errores del servicio
        if (errorService) {
            return handleErrorServer(res, 400, errorService);
        }

        // Enviar respuesta exitosa con el anuncio actualizado
        handleSuccess(res, 200, "Anuncio actualizado correctamente", foroActualizado);
    } catch (error) {
        console.error("Error al actualizar el anuncio:", error);
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}

// Función para eliminar un anuncio
export async function deleteForo(req, res) {
    try {
        // Extraer el ID de los parámetros de la ruta
        const { id } = req.params;

        // Llamar al servicio para eliminar el anuncio
        const [foro, error] = await deleteForoService(id);
        if (error) return handleErrorClient(res, 404, error);

        // Enviar respuesta exitosa con el anuncio eliminado
        handleSuccess(res, 200, "Anuncio eliminado", foro);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor.", error.message);
    }
}
export const downloadFile = async (req, res) => {
    try {
      const { foroId, fileName } = req.params;
      const foro = await getForo(foroId);
  
      if (!foro) {
        return res.status(404).json({ message: 'Foro no encontrado' });
      }
  
      const file = foro.archivosAdjuntos.find(archivo => archivo.nombre === fileName);
  
      if (!file) {
        return res.status(404).json({ message: 'Archivo no encontrado' });
      }
  
      const filePath = path.join(__dirname, '..', file.archivoPath);
  
      if (fs.existsSync(filePath)) {
        res.download(filePath, file.nombre);
      } else {
        res.status(404).json({ message: 'Archivo no encontrado en el servidor' });
      }
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      res.status(500).json({ message: 'Error al descargar el archivo', error: error.message });
    }
  };
  