"use strict";
import Joi from "joi";

// Validación de datos para la creación y actualización de periodos
export const periodValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty": "The period name is required.",
            "any.required": "The period name is required.",
            "string.base": "The period name must be a string.",
            "string.min": "The period name must be at least 3 characters long.",
            "string.max": "The period name must be at most 50 characters long.",
        }),
    startTime: Joi.string()
        .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .required()
        .messages({
            "string.empty": "The start time is required.",
            "any.required": "The start time is required.",
            "string.pattern.base": "The start time must be in HH:MM format.",
        }),
    endTime: Joi.string()
        .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .required()
        .messages({
            "string.empty": "The end time is required.",
            "any.required": "The end time is required.",
            "string.pattern.base": "The end time must be in HH:MM format.",
        })
    
}).messages({
    "object.unknown": "The request contains unknown fields."
});

export async function createPeriod(req, res) {
    const { error } = periodValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    // Lógica para crear el periodo después de pasar la validación
}
