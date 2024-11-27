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
        })
})
.or("id", "name")
.messages({
    "object.unknown": "The query must have at least one field: id or name.",
    "object.missing": "The query must have at least one field: id or name.",
});

export const roomBodyValidation = Joi.object({
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
        })
})
.or("name")
.messages({
    "object.missing": "The name is required.",
    "object.unknown": "Don't send more properties than the ones required.",
});