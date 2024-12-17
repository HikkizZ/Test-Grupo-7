import { Router } from "express";
import {
    createForo,
    getForos,
    getForo,
    updateForo,
    deleteForo,
    getForosByCurso,
    downloadFile
} from "../controllers/foro.controller.js";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";

const router = Router();

// Aplicar autenticación JWT a todas las rutas
router.use(authenticateJWT);

// Definición de rutas para foros
router
    .post("/", verifyRole(["Profesor","admin"]), createForo) // Crear un foro
    .get("/all", verifyRole(["Profesor", "Alumno","admin","administrador"]), getForos) // Obtener todos los foros
    .get("/curso/:cursoCode", verifyRole(["Profesor", "Alumno","admin"]), getForosByCurso) // Obtener foros por curso
    .get("/:id", verifyRole(["Profesor", "Alumno","admin"]), getForo) // Obtener un foro por ID
    .patch("/:id", verifyRole(["Profesor","admin","Encargado"]), updateForo) // Actualizar un foro
    .delete("/:id", verifyRole(["Profesor","admin"]), deleteForo) // Eliminar un foro
    .get("/:foroId/download/:fileName", verifyRole(["Profesor", "Alumno"]), downloadFile); // Descargar archivo adjunto

export default router;