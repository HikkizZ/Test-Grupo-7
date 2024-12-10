"use strict";

import Joi from 'joi';
import { parse, isValid } from 'date-fns'; // Importa las funciones de parse y isValid de date-fns

// Función para convertir y validar fechas
function parseDate(value) {
    const parsedDate = parse(value, "dd/MM/yyyy HH:mm", new Date());
    if (!isValid(parsedDate)) {
        throw new Error("Fecha inválida. El formato debe ser DD/MM/YYYY HH:mm, por ejemplo: '29/11/2024 08:10'.");
    }
    return parsedDate;
}

// Función para truncar la fecha actual a nivel de minutos
function truncateDateToMinutes(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
}

export const reservationQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "The id must be a number.",
            "number.positive": "The id must be a positive number.",
            "number.integer": "The id must be an integer.",
        }),
    devuelto: Joi.boolean()
        .messages({
            "boolean.base": "The devuelto must be a boolean.",
        }),
    tipoReserva: Joi.string()
        .valid("recurso", "sala")
        .messages({
            "string.base": "The reservation type must be a string.",
            "string.valid": "The reservation type must be either 'recurso' or 'sala'.",
        }),
    estado: Joi.string()
        .valid("pendiente", "aprobada", "rechazada")
        .messages({
            "string.base": "The reservation status must be a string.",
            "string.valid": "The reservation status must be either 'pendiente', 'aprobada', or 'rechazada'.",
        }),
    fechaDesde: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/) // Validación para el formato de fecha
        .messages({
            "string.pattern.base": "El campo 'fechaDesde' debe seguir el formato DD-MM-YYYY HH:mm, por ejemplo: '15-12-2024 10:00'.",
        }),
    fechaHasta: Joi.string()
        .pattern(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/) // Validación para el formato de fecha
        .messages({
            "string.pattern.base": "El campo 'fechaHasta' debe seguir el formato DD-MM-YYYY HH:mm, por ejemplo: '15-12-2024 10:00'.",
        }),
})
.or("id", "devuelto", "tipoReserva", "estado", "fechaDesde", "fechaHasta") // Al menos un filtro es obligatorio
.messages({
    "object.unknown": "The query must have at least one field: id, devuelto, tipoReserva, estado, fechaDesde, or fechaHasta.",
    "object.missing": "The query must have at least one field: id, devuelto, tipoReserva, estado, fechaDesde, or fechaHasta.",
});

export const reservationBodyValidation = Joi.object({
    fechaDesde: Joi.string()
        .pattern(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/) // Formato DD/MM/YYYY HH:MM
        .required()
        .messages({
            "string.pattern.base": "El campo 'fechaDesde' debe seguir el formato DD/MM/YYYY HH:mm, por ejemplo: '29/11/2024 08:10'.",
            "any.required": "El campo 'fechaDesde' es obligatorio.",
        })
        .custom((value, helpers) => {
            const fechaDesde = parseDate(value); // Convierte la fecha
            const now = truncateDateToMinutes(new Date()); // Trunca la fecha actual

            if (fechaDesde < now) {
                return helpers.message("La fecha desde no puede ser anterior al momento actual.");
            }
            return value;
        }, 'Validación de fechaDesde'),

    fechaHasta: Joi.string()
        .pattern(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/) // Formato DD/MM/YYYY HH:MM
        .required()
        .messages({
            "string.pattern.base": "El campo 'fechaHasta' debe seguir el formato DD/MM/YYYY HH:mm, por ejemplo: '29/11/2024 09:10'.",
            "any.required": "El campo 'fechaHasta' es obligatorio.",
        })
        .custom((value, helpers) => {
            const fechaHasta = parseDate(value); // Convierte la fecha
            const now = truncateDateToMinutes(new Date()); // Trunca la fecha actual

            if (fechaHasta < now) {
                return helpers.message("La fecha hasta no puede ser anterior al momento actual.");
            }
            return value;
        }, 'Validación de fechaHasta'),

    tipoReserva: Joi.string()
        .valid("recurso", "sala")
        .required()
        .messages({
            "any.required": "El tipo de reserva es obligatorio.",
            "any.only": "El tipo de reserva debe ser 'recurso' o 'sala'."
        }),

    recurso_id: Joi.number()
        .integer()
        .when('tipoReserva', {
            is: 'recurso',
            then: Joi.required(),
            otherwise: Joi.allow(null)
        })
        .messages({
            "any.required": "El ID del recurso es obligatorio cuando el tipo de reserva es 'recurso'.",
            "number.base": "El ID del recurso debe ser un número.",
        }),

    sala_id: Joi.number()
        .integer()
        .when('tipoReserva', {
            is: 'sala',
            then: Joi.required(),
            otherwise: Joi.allow(null)
        })
        .messages({
            "any.required": "El ID de la sala es obligatorio cuando el tipo de reserva es 'sala'.",
            "number.base": "El ID de la sala debe ser un número.",
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
            "any.only": "El estado debe ser 'pendiente', 'aprobada' o 'rechazada'."
        }),

    encargado_id: Joi.number()
        .integer()
        .when('estado', {
            is: 'pendiente',
            then: Joi.allow(null),
            otherwise: Joi.required()
        })
        .messages({
            "any.required": "El ID del encargado es obligatorio cuando el estado no es 'pendiente'.",
            "number.base": "El ID del encargado debe ser un número.",
        })
}).custom((value, helpers) => {
    // Validación cruzada entre fechaDesde y fechaHasta
    const fechaDesde = parseDate(value.fechaDesde);
    const fechaHasta = parseDate(value.fechaHasta);

    if (fechaHasta <= fechaDesde) {
        return helpers.message("La fecha hasta debe ser posterior a la fecha desde.");
    }

    return value;
}, 'Validación cruzada entre fechaDesde y fechaHasta');