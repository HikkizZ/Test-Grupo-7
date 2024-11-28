import { Router } from "express";
import { createRoom, getRooms, updateRoom, getRoom, deleteRoom } from "../controllers/room.controller.js";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";

const router = Router();

router
    .use(authenticateJWT);

router
    .post("/", verifyRole("admin"), createRoom) // Crear una aula
    .get("/all", verifyRole (["Encargado", "admin", "Profesor", "Alumno"]), getRooms) // Listar aulas (disponibles y no disponibles)
    .get("/detail/", verifyRole (["Encargado", "admin", "Profesor", "Alumno"]), getRoom) // Mostrar información de un aula en particular
    .patch("/update/", verifyRole(["Encargado", "admin"]), updateRoom) // Actualizar aula
    .delete("/delete/", verifyRole("admin"), deleteRoom); // Eliminar un aula

export default router;
