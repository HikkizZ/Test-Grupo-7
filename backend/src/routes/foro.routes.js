import { Router } from "express";
import {
    createForo,
    getForos,
    getForo,
    updateForo,
    deleteForo
} from "../controllers/Foro.controller.js";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";

const router = Router();

// Aplicar autenticación a todas las rutas
router.use(authenticateJWT);

// Definición de rutas con autorización
router
    .post("/", verifyRole("admin", "Profesor", "Encargado"), createForo) // Crear un recurso
    .get("/all", verifyRole(["Encargado", "admin", "Profesor", "Alumno"]), getForos) // Listar recursos
    .get("/:id", verifyRole(["Encargado", "admin", "Profesor", "Alumno"]), getForo) // Ver un recurso
    .patch("/:id", verifyRole(["Encargado", "admin", "Profesor"]), updateForo) // Actualizar recurso
    .delete("/:id", verifyRole("admin", "Profesor", "Encargado"), deleteForo); // Eliminar recurso

export default router;
