import { Router } from "express";
import {
    createHorario,
    getHorarios,
    getHorario,
    updateHorario,
    deleteHorario,
} from "../controllers/horario.controller.js";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";

const router = Router();

router.use(authenticateJWT);

router
    .get("/", verifyRole(["admin", "Profesor"]), getHorario) // Obtener un horario específico.
    .get("/all", verifyRole(["admin", "Profesor"]), getHorarios) // Listar todos los horarios.
    .post("/", verifyRole("admin"), createHorario) // Crear un horario (solo para administradores).
    .patch("/", verifyRole("admin"), updateHorario) // Actualizar un horario (solo para administradores).
    .delete("/", verifyRole("admin"), deleteHorario); // Eliminar un horario (solo para administradores).

export default router;