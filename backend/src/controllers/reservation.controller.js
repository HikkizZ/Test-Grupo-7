"use strict";

import {
    createReservationService,
    getReservationsService,
    getReservationService,
    updateReservationService,
    deleteReservationService
} from '../services/reservation.service.js';

import {
    handleErrorClient,
    handleSuccess,
    handleErrorServer
} from "../handlers/responseHandlers.js"

import {
    reservationBodyValidation,
    reservationQueryValidation
} from '../validations/reservation.validation.js';

//Crear una nueva reservacion

export async function createReservationController(req, res) {
    try {
        const { error } = reservationBodyValidation.validate(req.body);

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message);

        const [reservation, reservationError] = await createReservationService(req);

        if (reservationError) return handleErrorServer(res, 400, reservationError);

        handleSuccess(res, 201, "Reservation created", reservation);
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error);
    }
};

export async function getReservationsController(req, res) {
    try {
        const [reservations, reservationsError] = await getReservationsService(req);

        if (reservationsError) return handleErrorServer(res, 400, reservationsError);

        reservations.length === 0 ? handleSuccess(res, 204, "No reservations found") : handleSuccess(res, 200, "Reservations found", reservations);
    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error);
    }
};

export async function getReservationController(req, res) {
    try {
        const { id, devuelto, tipoReserva, estado } = req.query;

        const { error } = reservationQueryValidation.validate({ id, devuelto, tipoReserva, estado });

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message);

        const [reservation, reservationError] = await getReservationService({ idReservation: id, devueltoReservation: devuelto, TipoReservaReservation: tipoReserva, estadoReservation: estado });

        if (reservationError) return handleErrorServer(res, 400, reservationError);

        handleSuccess(res, 200, "Reservation found", reservation);

    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error);
    }
}

export async function updateReservationController(req, res) {
    try {
        const { id } = req.query;
        const { devuelto, estado } = req.body;

        const { error } = reservationQueryValidation.validate({ id });

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message);

        const [reservation, reservationError] = await updateReservationService({ idReservation: id }, { devuelto, estado });

        if (reservationError) return handleErrorServer(res, 400, reservationError);

        handleSuccess(res, 200, "Reservation updated", reservation);

    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error);
    }
}

export async function deleteReservationController(req, res) {
    try {
        const { id } = req.query;

        const { error } = reservationQueryValidation.validate({ id });

        if (error) return handleErrorClient(res, 400, "Validation Error", error.message);

        const [reservation, reservationError] = await deleteReservationService({ idReservation: id });

        if (reservationError) return handleErrorServer(res, 400, reservationError);

        handleSuccess(res, 200, "Reservation deleted", reservation);

    } catch (error) {
        handleErrorServer(res, 500, "Internal Server Error", error);
    }
}