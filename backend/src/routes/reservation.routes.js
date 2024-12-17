// routes/reservation.routes.js
import { Router } from "express";
import { createReservationController, getReservationsController, getReservationController, updateReservationController, deleteReservationController } from "../controllers/reservation.controller.js";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";

const router = Router();

router
    .use(authenticateJWT);

router
    .post("/solicitar", verifyRole(["Profesor", "Alumno", "admin"]), createReservationController) // Solicitar reserva
    .get("/all", verifyRole (["Encargado", "admin", "Profesor", "Alumno"]), getReservationsController) // Listar reservas
    .get("/get", verifyRole (["Encargado", "admin", "Profesor", "Alumno"]), getReservationController) // Mostrar información de una reserva en particular
    .patch("/update", verifyRole(["Encargado", "admin"]), updateReservationController) // Actualizar una reserva
    .delete("/delete", verifyRole("admin"), deleteReservationController); // Eliminar una reserva
    
export default router;
