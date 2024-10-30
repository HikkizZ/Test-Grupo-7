import { Router } from "express";
import { createRoom, getRooms, updateRoom, getRoom, deleteRoom } from "../controllers/room.controller.js";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";

const router = Router();

router
    .use(authenticateJWT);

router
    .post("/", verifyRole("admin"), createRoom) // Crear una aula
    .get("/all", getRooms) // Listar aulas (disponibles y no disponibles)
    .patch("/detail/", verifyRole("Encargado"), updateRoom) // Actualizar aula
    .get("/detail/", getRoom) // Mostrar información de un aula en particular
    .delete("/detail/", verifyRole("admin"), deleteRoom); // Eliminar un aula

export default router;
