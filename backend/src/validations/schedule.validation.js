"use strict";
import Joi from "joi";


export const scheduleValidation = Joi.object({
    cursoId: Joi.number()
        .positive()
        .integer()
        .required()
        .messages({
            "number.base": "The course ID must be a number.",
            "number.positive": "The course ID must be a positive number.",
            "number.integer": "The course ID must be an integer.",
            "any.required": "The course ID is required."
        }),
    teacherId: Joi.number()
        .positive()
        .integer()
        .required()
        .messages({
            "number.base": "The teacher ID must be a number.",
            "number.positive": "The teacher ID must be a positive number.",
            "number.integer": "The teacher ID must be an integer.",
            "any.required": "The teacher ID is required."
        }),
    classroomId: Joi.number()
        .positive()
        .integer()
        .required()
        .messages({
            "number.base": "The classroom ID must be a number.",
            "number.positive": "The classroom ID must be a positive number.",
            "number.integer": "The classroom ID must be an integer.",
            "any.required": "The classroom ID is required."
        }),
    subjectId: Joi.number()
        .positive()
        .integer()
        .required()
        .messages({
            "number.base": "The subject ID must be a number.",
            "number.positive": "The subject ID must be a positive number.",
            "number.integer": "The subject ID must be an integer.",
            "any.required": "The subject ID is required."
        }),
    period: Joi.number()
        .positive()
        .integer()
        .required()
        .messages({
            "number.base": "The period must be a number.",
            "number.positive": "The period must be a positive number.",
            "number.integer": "The period must be an integer.",
            "any.required": "The period is required."
        }),
    dayOfWeek: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required()
        .messages({
            "number.base": "The day of the week must be a number.",
            "number.integer": "The day of the week must be an integer.",
            "number.min": "The day of the week must be between 1 and 5.",
            "number.max": "The day of the week must be between 1 and 5.",
            "any.required": "The day of the week is required."
        })
}).messages({
    "object.unknown": "The request contains unknown fields."
});
