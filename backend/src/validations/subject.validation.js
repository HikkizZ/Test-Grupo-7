"use strict";
import Joi from 'joi';

export const subjectQueryValidation = Joi.object({ //* This is the subject query validation schema.
    id: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            "number.base": "The id must be a number.",
            "number.positive": "The id must be a positive number.",
            "number.integer": "The id must be an integer.",
            "any.required": "The id is required.",
        }),
});

export const createSubjectBodyValidation = Joi.object({ //* This is the subject body validation schema.
    name: Joi.string()
        .min(3)
        .max(35)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .required()
        .messages({
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 35 characters long.",
            "string.pattern.base": "The name must only contain letters.",
            "string.empty": "The name should not be empty.",
            "any.required": "The name is required.",
        }),
    description: Joi.string()
        .max(255)
        .allow("", null) //? The description can be empty.
        .messages({
            "string.base": "The description must be a string.",
            "string.max": "The description must be at most 255 characters long.",
        }),
    cursoCode: Joi.string()
        .required()
        .messages({
            "string.base": "The cursoCode must be a string.",
            "string.empty": "The cursoCode should not be empty.",
            "any.required": "The cursoCode is required.",
        }),
    rutProfesor: Joi.string()
        .min(9)
        .max(12)
        .required()
        .pattern(/^\d{1,2}(\.\d{3}){2}-[\dkK]$|^\d{7,8}-[\dkK]$/) //* This is a regex pattern for the rut. Example: 12.345.678-9.
        .messages({
            "string.empty": "The rut is required.",
            "any.required": "The rut is required.",
            "string.base": "The rut must be a string.",
            "string.min": "The rut must be at least 9 characters long.",
            "string.max": "The rut must be at most 12 characters long.",
            "string.pattern.base": "The rut must be a valid rut."
        }),
})
.or("name", "description", "cursoCode", "rutProfesor")
.unknown(false)
.messages({
    "object.unknown": "The request contains invalid properties.",
    "object.missing": "The request must contain at least one property.",
});

export const updateSubjectBodyValidation = Joi.object({ //* This is the subject body validation schema.
    name: Joi.string()
        .min(3)
        .max(35)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .optional()
        .messages({
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 35 characters long.",
            "string.pattern.base": "The name must only contain letters.",
            "string.empty": "The name should not be empty.",
            "any.required": "The name is required.",
        }),
    description: Joi.string()
        .max(255)
        .allow("", null) //? The description can be empty.
        .messages({
            "string.base": "The description must be a string.",
            "string.max": "The description must be at most 255 characters long.",
        }),
    cursoCode: Joi.string()
        .optional()
        .messages({
            "string.base": "The cursoCode must be a string.",
            "string.empty": "The cursoCode should not be empty.",
            "any.required": "The cursoCode is required.",
        }),
    rutProfesor: Joi.string()
        .min(9)
        .max(12)
        .optional()
        .pattern(/^\d{1,2}(\.\d{3}){2}-[\dkK]$|^\d{7,8}-[\dkK]$/) //* This is a regex pattern for the rut. Example: 12.345.678-9.
        .messages({
            "string.empty": "The rut is required.",
            "any.required": "The teacher rut is required.",
            "string.base": "The rut must be a string.",
            "string.min": "The rut must be at least 9 characters long.",
            "string.max": "The rut must be at most 12 characters long.",
            "string.pattern.base": "The rut must be a valid rut.",
        }),
})
.or("name", "description", "cursoCode", "rutProfesor")
.unknown(false)
.messages({
    "object.unknown": "The request contains invalid properties.",
    "object.missing": "The request must contain at least one property.",
});
