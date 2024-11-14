"use strict";

import Joi from 'joi';

export const reservationQueryValidation = Joi.object({ //* This is the reservation query validation schema.
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
        "boolean.base": "The available must be a boolean.",
    }),
    tipoReserva: Joi.string()
        .valid("recurso", "sala")
        .messages({
            "string.base": "The reservation type must be a string.",
            "string.valid": "The reservation type must be either 'recurso' or 'sala'.",
        }),
})
.or("id", "devuelto", "tipoReserva")
.messages({
    "object.unknown": "The query must have at least one field: id, devuelto or tipoReserva.",
    "object.missing": "The query must have at least one field: id, devuelto or tipoReserva.",
});

export const reservationBodyValidation = Joi.object({ //* This is the reservation body validation schema.
    fechaDesde: Joi.string()
    .pattern(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/) // Formato DD/MM/YYYY HH:MM
    .required()
    .custom((value, helpers) => {
        const fechaDesde = new Date(value.split("/").reverse().join(" ").replace(" ", "T"));
        const now = new Date();

        if (fechaDesde < now) {
            return helpers.message("fechaDesde no puede ser anterior al día vigente.");
        }
        return value;
    }, 'fechaDesde validation'),

fechaHasta: Joi.string()
    .pattern(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/) // Formato DD/MM/AAAA HH:MM
    .required()
    .custom((value, helpers) => {
        const fechaHasta = new Date(value.split("/").reverse().join(" ").replace(" ", "T"));
        const now = new Date();

        if (fechaHasta < now) {
            return helpers.message("fechaHasta no puede ser anterior al día vigente.");
        }
        return value;
    }, 'fechaHasta validation')
    .custom((value, helpers) => {
        const { fechaDesde } = helpers.state.ancestors[0];
        const fechaDesdeDate = new Date(fechaDesde.split("/").reverse().join(" ").replace(" ", "T"));
        const fechaHastaDate = new Date(value.split("/").reverse().join(" ").replace(" ", "T"));

        if (fechaHastaDate <= fechaDesdeDate) {
            return helpers.message("fechaHasta debe ser posterior a fechaDesde.");
        }
        return value;
    }, 'fechaHasta after fechaDesde validation'),

tipoReserva: Joi.string()
    .valid("recurso", "sala")
    .required(),

recurso_id: Joi.number()
    .integer()
    .when('tipoReserva', {
        is: 'recurso',
        then: Joi.required(),
        otherwise: Joi.allow(null)
    }),

sala_id: Joi.number()
    .integer()
    .when('tipoReserva', {
        is: 'sala',
        then: Joi.required(),
        otherwise: Joi.allow(null)
    }),

devuelto: Joi.boolean()
.default(false),

encargado_id: Joi.number()
.integer()
.required(),
profesor_id: Joi.number()
.integer()
.required()
});

export default reservationValidationSchema;