import { Router } from "express";

import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";

import {
    configCalificaciones,
    updateConfigCalificaciones,
    getCalificaciones,
    assignGradesStudents,
    calificarAlumno
} from "../controllers/calificacion.controller.js";

const router = Router();

router
    .use(authenticateJWT);

router
    .post('/', verifyRole(['admin', 'profesor']), configCalificaciones)
    .patch('/detail/', verifyRole(['admin', 'profesor']), updateConfigCalificaciones)
    .get('/', verifyRole(['admin', 'profesor', 'alumno']), getCalificaciones)
    .post('/assign/', verifyRole(['admin', 'profesor']), assignGradesStudents)
    .patch('/calificar/', verifyRole(['admin', 'profesor']), calificarAlumno);

export default router;