"use strict";

import Joi from "joi";

export const scheduleQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            "number.base": "The id must be a number.",
            "number.integer": "The id must be an integer.",
            "number.positive": "The id must be a positive number.",
        }),
    cursoId: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            "number.base": "The cursoId must be a number.",
            "number.integer": "The cursoId must be an integer.",
            "number.positive": "The cursoId must be a positive number.",
        }),
    teacherId: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            "number.base": "The teacherId must be a number.",
            "number.integer": "The teacherId must be an integer.",
            "number.positive": "The teacherId must be a positive number.",
        }),
    classroomId: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            "number.base": "The classroomId must be a number.",
            "number.integer": "The classroomId must be an integer.",
            "number.positive": "The classroomId must be a positive number.",
        }),
    subjectId: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            "number.base": "The subjectId must be a number.",
            "number.integer": "The subjectId must be an integer.",
            "number.positive": "The subjectId must be a positive number.",
        }),
    period: Joi.number()
        .integer()
        .positive()
        .optional()
        .messages({
            "number.base": "The period must be a number.",
            "number.integer": "The period must be an integer.",
            "number.positive": "The period must be a positive number.",
        }),
    dayOfWeek: Joi.string()
        .valid("Lunes", "Martes", "Miércoles", "Jueves", "Viernes")
        .optional()
        .messages({
            "any.only": "The dayOfWeek must be one of: Lunes, Martes, Miércoles, Jueves, Viernes.",
        }),
})
.or("id", "cursoId", "teacherId", "classroomId", "subjectId", "period", "dayOfWeek")
.messages({
    "object.missing": "At least one query parameter must be provided.",
    "object.unknown": "The query contains invalid properties.",
});

export const scheduleBodyValidation = Joi.object({
    cursoId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "The cursoId must be a number.",
            "number.integer": "The cursoId must be an integer.",
            "number.positive": "The cursoId must be a positive number.",
            "any.required": "The cursoId is required.",
        }),
    teacherId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "The teacherId must be a number.",
            "number.integer": "The teacherId must be an integer.",
            "number.positive": "The teacherId must be a positive number.",
            "any.required": "The teacherId is required.",
        }),
    classroomId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "The classroomId must be a number.",
            "number.integer": "The classroomId must be an integer.",
            "number.positive": "The classroomId must be a positive number.",
            "any.required": "The classroomId is required.",
        }),
    subjectId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "The subjectId must be a number.",
            "number.integer": "The subjectId must be an integer.",
            "number.positive": "The subjectId must be a positive number.",
            "any.required": "The subjectId is required.",
        }),
    period: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "The period must be a number.",
            "number.integer": "The period must be an integer.",
            "number.positive": "The period must be a positive number.",
            "any.required": "The period is required.",
        }),
    dayOfWeek: Joi.string()
        .valid("Lunes", "Martes", "Miércoles", "Jueves", "Viernes")
        .required()
        .messages({
            "any.only": "The dayOfWeek must be one of: Lunes, Martes, Miércoles, Jueves, Viernes.",
            "any.required": "The dayOfWeek is required.",
        }),
})
.unknown(false)
.messages({
    "object.unknown": "The body contains invalid properties.",
});
