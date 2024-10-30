"use strict";
import Joi from "joi";

// Esquema de validación para Asignatura
export const asignaturaValidation = Joi.object({
    asignaturaName: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.base": "El nombre de la asignatura debe ser una cadena de texto.",
            "string.empty": "El nombre de la asignatura es obligatorio.",
            "string.min": "El nombre de la asignatura debe tener al menos 3 caracteres.",
            "string.max": "El nombre de la asignatura no debe exceder los 50 caracteres.",
            "any.required": "El nombre de la asignatura es obligatorio."
        })
}).messages({
    "object.unknown": "La solicitud contiene campos desconocidos."
});
