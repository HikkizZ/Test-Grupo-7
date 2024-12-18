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
    .post("/", verifyRole(["profesor", "admin", "encargado"]), createNews) // Crear
    .get("/all", verifyRole(["user","encargado", "admin", "profesor", "alumno"]), getNews) // Listar todas
    .get("/:id", verifyRole(["user","encargado", "admin", "profesor", "alumno"]), getNewsId) // Por ID
    .patch("/:id", verifyRole(["user","encargado", "admin", "profesor"]), updateNews) // Actualizar
    .delete("/:id", verifyRole(["user","admin"]), deleteNews); // Eliminar

export default router;