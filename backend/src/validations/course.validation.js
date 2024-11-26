"use strict";
import Joi from "joi";


export const courseValidation = Joi.object({
    courseName: Joi.string()
        .pattern(/^(Primero|Segundo|Tercero|Cuarto|Quinto|Sexto|Septimo|Octavo) (Medio|Básico) [A-Z]$/)
        .required()
        .messages({
            "string.empty": "El nombre del curso es obligatorio.",
            "any.required": "El nombre del curso es obligatorio.",
            "string.pattern.base": "El curso debe estar en el formato correcto, como 'Primero Medio A', 'Segundo Básico B', etc.",
        })
});