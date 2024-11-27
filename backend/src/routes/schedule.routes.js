import { Router } from "express";
import {
    createSchedule,
    getSchedules,
    getSchedule,
    updateSchedule,
    deleteSchedule,
} from "../controllers/schedule.controller.js";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";

const router = Router();

router.use(authenticateJWT);

router
    .get("/", getSchedule) // Obtener un horario específico.
    .get("/all", getSchedules) // Listar todos los horarios.
    .post("/", verifyRole("admin"), createSchedule) // Crear un horario (solo para administradores).
    .patch("/", verifyRole("admin"), updateSchedule) // Actualizar un horario (solo para administradores).
    .delete("/", verifyRole("admin"), deleteSchedule); // Eliminar un horario (solo para administradores).

export default router;
