"use strict";

import Joi from "joi";

//* Validation for querying Horarios
export const horarioQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "The id must be a number.",
            "number.positive": "The id must be a positive number.",
            "number.integer": "The id must be an integer.",
        }),
    teacherId: Joi.string()
        .min(9)
        .max(12)
        .pattern(/^\d{1,2}(\.\d{3}){2}-[\dkK]$|^\d{7,8}-[\dkK]$/)
        .messages({
            "string.base": "The teacherId (RUT) must be a string.",
            "string.min": "The teacherId (RUT) must be at least 9 characters long.",
            "string.max": "The teacherId (RUT) must be at most 12 characters long.",
            "string.pattern.base": "The teacherId (RUT) must be a valid format (e.g., 12.345.678-9).",
        }),
    subjectId: Joi.string()
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.base": "The subjectId must be a string.",
            "string.pattern.base": "The subjectId must not contain special characters.",
        }),
    cursoId: Joi.string()
        .min(5)
        .max(7)
        .pattern(/^[0-9A-Z-]+$/)
        .messages({
            "string.base": "The cursoId (code) must be a string.",
            "string.min": "The cursoId (code) must be at least 5 characters long.",
            "string.max": "The cursoId (code) must be at most 7 characters long.",
            "string.pattern.base": "The cursoId (code) must contain only numbers, uppercase letters, and dashes.",
        }),
    classroomId: Joi.string()
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.base": "The classroomId must be a string.",
            "string.pattern.base": "The classroomId must not contain special characters.",
        }),
    dayOfWeek: Joi.string()
        .valid("Lunes", "Martes", "Miércoles", "Jueves", "Viernes")
        .messages({
            "any.only": "The dayOfWeek must be one of ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].",
            "string.base": "The dayOfWeek must be a string.",
        }),
    periodId: Joi.string()
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .required()
        .messages({
            "string.base": "The periodId must be a string.",
            "string.pattern.base": "The periodId must not contain special characters.",
            "any.required": "The periodId is required.",
        }),
})
.or("id", "teacherId", "subjectId", "cursoId", "classroomId", "dayOfWeek", "periodID")
.unknown(false)
.messages({
    "object.unknown": "The query contains invalid properties.",
    "object.missing": "The query must contain at least one property.",
});

//* Validation for creating or updating Horarios
export const horarioBodyValidation = Joi.object({
    teacherId: Joi.string()
        .min(9)
        .max(12)
        .pattern(/^\d{1,2}(\.\d{3}){2}-[\dkK]$|^\d{7,8}-[\dkK]$/) 
        .required()
        .messages({
            "string.base": "The teacherId (RUT) must be a string.",
            "string.min": "The teacherId (RUT) must be at least 9 characters long.",
            "string.max": "The teacherId (RUT) must be at most 12 characters long.",
            "string.pattern.base": "The teacherId (RUT) must be a valid format (e.g., 12.345.678-9).",
            "any.required": "The teacherId (RUT) is required.",
        }),
    subjectId: Joi.string()
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/) 
        .required()
        .messages({
            "string.base": "The subjectId must be a string.",
            "string.pattern.base": "The subjectId must not contain special characters.",
            "any.required": "The subjectId is required.",
        }),
    cursoId: Joi.string()
        .min(5)
        .max(7)
        .pattern(/^[0-9A-Z-]+$/)
        .required()
        .messages({
            "string.base": "The cursoId (code) must be a string.",
            "string.min": "The cursoId (code) must be at least 5 characters long.",
            "string.max": "The cursoId (code) must be at most 7 characters long.",
            "string.pattern.base": "The cursoId (code) must contain only numbers, uppercase letters, and dashes.",
            "any.required": "The cursoId (code) is required.",
        }),
    classroomId: Joi.string()
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .required()
        .messages({
            "string.base": "The classroomId must be a string.",
            "string.pattern.base": "The classroomId must not contain special characters.",
            "any.required": "The classroomId is required.",
        }),
    dayOfWeek: Joi.string()
        .valid("Lunes", "Martes", "Miércoles", "Jueves", "Viernes")
        .required()
        .messages({
            "any.only": "The dayOfWeek must be one of ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].",
            "any.required": "The dayOfWeek is required.",
            "string.base": "The dayOfWeek must be a string.",
        }),
    periodId: Joi.string()
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .required()
        .messages({
            "string.base": "The periodId must be a string.",
            "string.pattern.base": "The periodId must not contain special characters.",
            "any.required": "The periodId is required.",
        }),
})
.unknown(false)
.messages({
    "object.unknown": "The body contains invalid properties.",
    "object.missing": "All required properties must be provided.",
});
