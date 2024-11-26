"use strict";

import { Router } from "express";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";
import {
    createPeriod,
    getPeriod,
    getPeriods,
    updatePeriod,
    deletePeriod,
} from "../controllers/period.controller.js";

const router = Router();

// Middleware global para autenticar JWT
router.use(authenticateJWT);

// Definición de las rutas para la entidad "Period"
router
    .get("/", getPeriod) // Obtener un período específico por id o nombre
    .get("/all", getPeriods) // Obtener todos los períodos
    .post("/", verifyRole("admin"), createPeriod) // Crear un período (solo administradores)
    .patch("/", verifyRole("admin"), updatePeriod) // Actualizar un período (solo administradores)
    .delete("/", verifyRole("admin"), deletePeriod); // Eliminar un período (solo administradores)


export default router;
