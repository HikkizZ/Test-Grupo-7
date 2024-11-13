// routes/reservation.routes.js
import { Router } from "express";
import { requestReservation, approveReservation, denyReservation } from "../controllers/reservation.controller.js";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";
import { verifyRole } from "../middlewares/authorization.middleware.js";

const router = Router();

router
    .use(authenticateJWT);

router
    .post("/request", verifyRole("Profesor"), requestReservation) // Solicitud de reserva
    .patch("/approve/:reservationId", verifyRole("Encargado"), approveReservation) // Aprobar reserva
    .patch("/deny/:reservationId", verifyRole("Encargado"), denyReservation); // Denegar reserva

export default router;
