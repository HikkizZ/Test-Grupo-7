import { Router } from "express";
import { createResource, getResources, getResource, updateResource, deleteResource } from "../controllers/resource.controller.js";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";

const router = Router();

router
    .use(authenticateJWT);

router
    .post("/", verifyRole(["admin", "Encargado"]), createResource) // Crear un recurso
    .get("/all", verifyRole (["Encargado", "admin", "Profesor", "Alumno"]), getResources) // Listar recursos (disponibles y no disponibles)
    .get("/detail/", verifyRole (["Encargado", "admin", "Profesor", "Alumno"]), getResource) // Mostrar información de un recurso en particular
    .patch("/update/", verifyRole(["Encargado", "admin"]), updateResource) // Actualizar recurso
    .delete("/delete/", verifyRole("admin"), deleteResource); // Eliminar un recurso

export default router;