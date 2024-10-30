"use strict";
import Joi from "joi";


export const classroomValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty": "El nombre del salón es requerido.",
            "any.required": "El nombre del salón es requerido.",
            "string.base": "El nombre del salón debe ser un texto.",
            "string.min": "El nombre del salón debe tener al menos 3 caracteres.",
            "string.max": "El nombre del salón debe tener como máximo 50 caracteres.",
        }),
    size: Joi.number()
        .integer()
        .min(15)
        .max(45)
        .required()
        .messages({
            "number.base": "El tamaño del salón debe ser un número.",
            "number.integer": "El tamaño del salón debe ser un número entero.",
            "number.min": "El tamaño del salón debe ser al menos 15.",
            "number.max": "El tamaño del salón no debe exceder los 45.",
            "any.required": "El tamaño del salón es requerido.",
        })
}).messages({
    "object.unknown": "La solicitud contiene campos desconocidos."
});
