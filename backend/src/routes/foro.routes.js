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

// Aplicar autenticación JWT a todas las rutas
router.use(authenticateJWT);

// Definición de rutas para noticias
router
    .post("/", verifyRole(["admin", "Profesor", "Encargado"]), createNews) // Crear una noticia
    .get("/all", verifyRole(["Encargado", "admin", "Profesor", "Alumno"]), getNews) // Obtener todas las noticias
    .get("/:id", verifyRole(["Encargado", "admin", "Profesor", "Alumno"]), getNewsId) // Obtener una noticia por ID
    .patch("/:id", verifyRole(["Encargado", "admin", "Profesor"]), updateNews) // Actualizar una noticia
    .delete("/:id", verifyRole(["admin"]), deleteNews); // Eliminar una noticia

export default router;
