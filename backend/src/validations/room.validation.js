"use strict";

import Joi from "joi";

export const roomQueryValidation = Joi.object({
    id: Joi.number()
        .positive()
        .integer()
        .optional()
        .messages({
            "number.base": "The id must be a number.",
            "number.positive": "The id must be a positive number.",
            "number.integer": "The id must be an integer.",
            "any.required": "The id is required.",
        }),
    name: Joi.string()
        .min(3)
        .max(70)
        .optional()
        .messages({
            "string.empty": "The name is required.",
            "any.required": "The name is required.",
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 70 characters long.",
        }),
        capacity: Joi.number()
        .positive()
        .integer()
        .optional()
        .messages({
            "number.base": "The capacity must be a number.",
            "number.positive": "The capacity must be a positive number.",
            "number.integer": "The capacity must be an integer.",
        }),
    roomType: Joi.string()
        .valid("laboratorio", "computacion", "clases")
        .optional()
        .messages({
            "string.base": "The roomType must be a string.",
            "any.only": "The roomType must be one of: laboratorio, computacion, clases.",
        }),
})
.or("id", "name", "size", "roomType")
.messages({
    "object.unknown": "The query must have at least one field: id, name, size, or roomType.",
    "object.missing": "The query must have at least one field: id, name, size, or roomType.",
});

export const roomBodyValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(70)
        .optional()
        .messages({
            "string.empty": "The name cannot be empty.",
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 70 characters long.",
        }),
        capacity: Joi.number()
        .positive()
        .integer()
        .optional()
        .messages({
            "number.base": "The capacity must be a number.",
            "number.positive": "The capacity must be a positive number.",
            "number.integer": "The capacity must be an integer.",
        }),
    roomType: Joi.string()
        .valid("laboratorio", "computacion", "clases")
        .optional()
        .messages({
            "string.base": "The roomType must be a string.",
            "any.only": "The roomType must be one of: laboratorio, computacion, clases.",
        }),
})
.or("name", "size", "roomType")
.messages({
    "object.missing": "At least one of the fields (name, size, roomType) must be provided.",
    "object.unknown": "Don't send more properties than the ones required.",
});