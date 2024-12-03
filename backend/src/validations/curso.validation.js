"use strict";

import Joi from "joi";

export const cursoQueryValidation = Joi.object({ //* This is the course query validation schema.
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
        .max(30)
        .messages({
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 35 characters long.",
            "string.empty": "The name should not be empty.",
        }),
    code: Joi.string()
        .min(5)
        .max(7)
        .pattern(/^[0-9A-Z-]+$/)
        .messages({
            "string.base": "The code must be a string.",
            "string.min": "The code must be at least 5 characters long.",
            "string.max": "The code must be at most 7 characters long.",
            "string.empty": "The code should not be empty.",
            "string.pattern.base": "The code must only contain numbers, letters, and dashes.",
        })
})
.or("id", "name", "code")
.unknown(false)
.messages({
    "object.unknown": "The request contains invalid properties.",
    "object.missing": "The request must contain at least one property.",
});

export const createCursoBodyValidation = Joi.object({ //* This is the course body validation schema.
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 30 characters long.",
            "string.empty": "The name should not be empty.",
            "string.pattern.base": "The name must only contain letters and spaces.",
            "any.required": "The name is required.",
        }),
    level: Joi.number()
        .integer()
        .positive()
        .min(1)
        .max(4)
        .required()
        .messages({
            "number.base": "The level must be a number.",
            "number.positive": "The level must be a positive number.",
            "number.integer": "The level must be an integer.",
            "number.min": "The level must be at least 1.",
            "number.max": "The level must be at most 4.",
            "any.required": "The level is required.",
        }),
    year: Joi.number()
        .integer()
        .positive()
        .min(2024)
        .max(2100)
        .required()
        .messages({
            "number.base": "The year must be a number.",
            "number.positive": "The year must be a positive number.",
            "number.integer": "The year must be an integer.",
            "number.min": "The year must be at least 2024.",
            "number.max": "The year must be at most 2100.",
            "any.required": "The year is required.",
        }),
    section: Joi.string()
        .length(1)
        .pattern(/^[A-Z]+$/)
        .required()
        .messages({
            "string.base": "The section must be a string.",
            "string.length": "The section must be 1 character long.",
            "string.empty": "The section should not be empty.",
            "string.pattern.base": "The section must only contain uppercase letters.",
            "any.required": "The section is required.",
        })
})
.or("name", "level", "year", "section")
.unknown(false)
.messages({
    "object.unknown": "The request contains invalid properties.",
    "object.missing": "The request must contain at least one property.",
});

export const updateCursoBodyValidation = Joi.object({ //* This is the course body validation schema.
    name: Joi.string()
        .min(3)
        .max(30)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .optional()
        .messages({
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 30 characters long.",
            "string.empty": "The name should not be empty.",
            "string.pattern.base": "The name must only contain letters and spaces.",
        }),
    level: Joi.number()
        .integer()
        .positive()
        .min(1)
        .max(4)
        .optional()
        .messages({
            "number.base": "The level must be a number.",
            "number.positive": "The level must be a positive number.",
            "number.integer": "The level must be an integer.",
            "number.min": "The level must be at least 1.",
            "number.max": "The level must be at most 4.",
        }),
    year: Joi.number()
        .integer()
        .positive()
        .min(2020)
        .max(2100)
        .optional()
        .messages({
            "number.base": "The year must be a number.",
            "number.positive": "The year must be a positive number.",
            "number.integer": "The year must be an integer.",
            "number.min": "The year must be at least 2020.",
            "number.max": "The year must be at most 2100.",
        }),
    section: Joi.string()
        .length(1)
        .pattern(/^[A-Z]+$/)
        .optional()
        .messages({
            "string.base": "The section must be a string.",
            "string.length": "The section must be 1 character long.",
            "string.empty": "The section should not be empty.",
            "string.pattern.base": "The section must only contain uppercase letters.",
        })
})
.or("name", "level", "year", "section")
.unknown(false)
.messages({
    "object.unknown": "The request contains invalid properties.",
    "object.missing": "The request must contain at least one property.",
});