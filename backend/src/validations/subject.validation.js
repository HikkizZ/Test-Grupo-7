"use strict";
import Joi from 'joi';

export const subjectQueryValidation = Joi.object({ //* This is the subject query validation schema.
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "The id must be a number.",
            "number.positive": "The id must be a positive number.",
            "number.integer": "The id must be an integer.",
        }),
    name: Joi.string()
        .min(3)
        .max(35)
        .messages({
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 35 characters long.",
            "string.empty": "The name should not be empty.",
        }),
});

export const subjectBodyValidation = Joi.object({ //* This is the subject body validation schema.
    name: Joi.string()
        .min(3)
        .max(35)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 35 characters long.",
            "string.empty": "The name should not be empty.",
            "string.pattern.base": "The name must only contain letters and spaces.",
        }),
    description: Joi.string()
        .max(255)
        .optional()
        .messages({
            "string.base": "The description must be a string.",
            "string.max": "The description must be at most 255 characters long.",
        }),
    cusoId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "The course id must be a number.",
            "number.positive": "The course id must be a positive number.",
            "number.integer": "The course id must be an integer.",
            "any.required": "The course id is required.",
        }),
})
.or("name", "description", "cursoId")
.unknown(false)
messages({
    "object.unknown": "The request contains invalid properties.",
    "object.missing": "The request must contain at least one property.",
});