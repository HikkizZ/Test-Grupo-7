import { Router } from "express";
import {
    createNews,
    getNews,
    getNewsId,
    updateNews,
    deleteNews
} from "../controllers/news.controller.js";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";

const router = Router();

// Aplicar autenticación
router.use(authenticateJWT);

// rutas de acceso
router
    .post("/", verifyRole(["admin", "Profesor", "Encargado"]), createNews) // Crear
    .get("/all", verifyRole(["Encargado", "admin", "Profesor", "Alumno"]), getNews) // Listar todas
    .get("/:id", verifyRole(["Encargado", "admin", "Profesor", "Alumno"]), getNewsId) // Por ID
    .patch("/:id", verifyRole(["Encargado", "admin", "Profesor"]), updateNews) // Actualizar
    .delete("/:id", verifyRole(["admin"]), deleteNews); // Eliminar

export default router;