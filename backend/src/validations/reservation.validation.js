"use strict";

import Joi from 'joi';
import { parse, isValid } from 'date-fns';

// Función para validar formatos de fecha para queries
function validateDate(value, helpers) {
    const trimmedValue = value.trim();
    const dateRegex = /^\d{2}-\d{2}-\d{4}(\s\d{2}:\d{2})?$/;

    if (!dateRegex.test(trimmedValue)) {
        return helpers.error("any.invalid");
    }

    const formats = ["dd-MM-yyyy", "dd-MM-yyyy HH:mm"];
    const isValidDate = formats.some((format) => isValid(parse(trimmedValue, format, new Date())));

    if (!isValidDate) {
        return helpers.error("any.invalid");
    }

    return trimmedValue;
}

// Función para convertir y validar fechas para el cuerpo
function parseDate(value, helpers) {
    const trimmedValue = value.trim();
    const parsedDate = parse(trimmedValue, "dd-MM-yyyy HH:mm", new Date());

    if (!isValid(parsedDate)) {
        return helpers.message(
            "Fecha inválida. El formato debe ser 'DD-MM-YYYY HH:mm', por ejemplo: '25-12-2024 10:00'."
        );
    }
    return parsedDate;
}

// Función para truncar la fecha actual a nivel de minutos
function truncateDateToMinutes(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
}

// Validaciones para queries
export const reservationQueryValidation = Joi.object({
    id: Joi.number().integer().positive().messages({
        "number.base": "The id must be a number.",
        "number.positive": "The id must be a positive number.",
        "number.integer": "The id must be an integer.",
    }),
    devuelto: Joi.boolean().messages({
        "boolean.base": "The devuelto must be a boolean.",
    }),
    tipoReserva: Joi.string().valid("recurso", "sala").messages({
        "string.base": "The reservation type must be a string.",
        "string.valid": "The reservation type must be either 'recurso' or 'sala'.",
    }),
    estado: Joi.string().valid("pendiente", "aprobada", "rechazada").messages({
        "string.base": "The reservation status must be a string.",
        "string.valid": "The reservation status must be either 'pendiente', 'aprobada', or 'rechazada'.",
    }),
    fechaDesde: Joi.string().custom(validateDate, 'Validación de formato de fecha').messages({
        "any.invalid": "El campo 'fechaDesde' debe seguir el formato 'DD-MM-YYYY' o 'DD-MM-YYYY HH:mm'.",
    }),
    fechaHasta: Joi.string().custom(validateDate, 'Validación de formato de fecha').messages({
        "any.invalid": "El campo 'fechaHasta' debe seguir el formato 'DD-MM-YYYY' o 'DD-MM-YYYY HH:mm'.",
    }),
})
.or("id", "devuelto", "tipoReserva", "estado", "fechaDesde", "fechaHasta")
.messages({
    "object.unknown": "The query must have at least one field: id, devuelto, tipoReserva, estado, fechaDesde, or fechaHasta.",
    "object.missing": "The query must have at least one field: id, devuelto, tipoReserva, estado, fechaDesde, or fechaHasta.",
});

// Validaciones para el cuerpo de las reservas
export const reservationBodyValidation = Joi.object({
    fechaDesde: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/)
        .required()
        .custom((value, helpers) => {
            const fechaDesde = parseDate(value, helpers);
            const now = truncateDateToMinutes(new Date()); // Fecha actual truncada a minutos

            if (fechaDesde < now) {
                return helpers.message("La fecha desde no puede ser anterior al momento actual.");
            }
            return value;
        })
        .messages({
            "string.pattern.base": "El campo 'fechaDesde' debe seguir el formato 'DD-MM-YYYY HH:mm'.",
            "any.required": "El campo 'fechaDesde' es obligatorio.",
        }),

    fechaHasta: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/)
        .required()
        .custom((value, helpers) => {
            const fechaHasta = parseDate(value, helpers);
            const now = truncateDateToMinutes(new Date()); // Fecha actual truncada a minutos

            if (fechaHasta < now) {
                return helpers.message("La fecha hasta no puede ser anterior al momento actual.");
            }
            return value;
        })
        .messages({
            "string.pattern.base": "El campo 'fechaHasta' debe seguir el formato 'DD-MM-YYYY HH:mm'.",
            "any.required": "El campo 'fechaHasta' es obligatorio.",
        }),

    tipoReserva: Joi.string().valid("recurso", "sala").required().messages({
        "any.required": "El tipo de reserva es obligatorio.",
        "any.only": "El tipo de reserva debe ser 'recurso' o 'sala'.",
    }),

    recurso_id: Joi.number()
        .integer()
        .when("tipoReserva", {
            is: "recurso",
            then: Joi.required(),
            otherwise: Joi.allow(null),
        })
        .messages({
            "any.required": "El ID del recurso es obligatorio cuando el tipo de reserva es 'recurso'.",
        }),

    sala_id: Joi.number()
        .integer()
        .when("tipoReserva", {
            is: "sala",
            then: Joi.required(),
            otherwise: Joi.allow(null),
        })
        .messages({
            "any.required": "El ID de la sala es obligatorio cuando el tipo de reserva es 'sala'.",
        }),

    devuelto: Joi.boolean()
        .default(false)
        .messages({
            "boolean.base": "El campo 'devuelto' debe ser un valor booleano.",
        }),

    estado: Joi.string()
        .valid("pendiente", "aprobada", "rechazada")
        .default("pendiente")
        .messages({
            "any.only": "El estado debe ser 'pendiente', 'aprobada' o 'rechazada'.",
        }),
}).custom((value, helpers) => {
    const fechaDesde = parse(value.fechaDesde, "dd-MM-yyyy HH:mm", new Date());
    const fechaHasta = parse(value.fechaHasta, "dd-MM-yyyy HH:mm", new Date());

    if (fechaHasta <= fechaDesde) {
        return helpers.message("La fecha hasta debe ser posterior a la fecha desde.");
    }
    return value;
}, 'Validación cruzada entre fechaDesde y fechaHasta');