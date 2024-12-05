// routes/reservation.routes.js
import { Router } from "express";
import { createReservationController, getReservationsController, getReservationController, updateReservationController, deleteReservationController } from "../controllers/reservation.controller.js";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";

const router = Router();

router
    .use(authenticateJWT);

router
    // .post("/request", verifyRole("Profesor"), requestReservation) // Solicitud de reserva
    // .patch("/approve/:reservationId", verifyRole("Encargado"), approveReservation) // Aprobar reserva
    // .patch("/deny/:reservationId", verifyRole("Encargado"), denyReservation); // Denegar reserva
    .post("/solicitar", verifyRole(["Profesor", "Alumno"]), createReservationController) // Solicitar reserva
    .get("/all", getReservationsController) // Listar reservas
    .get("/get", getReservationController) // Mostrar información de una reserva en particular
    .patch("/update", verifyRole("Encargado"), updateReservationController) // Actualizar una reserva
    .delete("/delete", verifyRole("admin"), deleteReservationController); // Eliminar una reserva
    
export default router;
