"use strict";

import Joi from "joi";

export const resourceQueryValidation = Joi.object({
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
        .max(255)
        .optional()
        .messages({
            "string.empty": "The name is required.",
            "any.required": "The name is required.",
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 255 characters long.",
        }),
    brand: Joi.string()
        .min(2)
        .max(255)
        .optional()
        .messages({
            "string.empty": "The brand cannot be empty.",
            "string.base": "The brand must be a string.",
            "string.min": "The brand must be at least 2 characters long.",
            "string.max": "The brand must be at most 255 characters long.",
        }),
    resourceType: Joi.string()
        .valid("Tecnologia", "Equipo de Sonido", "Material Didactico")
        .optional()
        .messages({
            "string.base": "The resourceType must be a string.",
            "any.only": "The resourceType must be one of: Tecnologia, Equipo de Sonido, Material Didactico.",
        }),
})
.or("id", "name", "brand", "resourceType")
.messages({
    "object.unknown": "The query must have at least one field: id, name, brand, or resourceType.",
    "object.missing": "The query must have at least one field: id, name, brand, or resourceType.",
});

export const resourceBodyValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(255)
        .optional()
        .messages({
            "string.empty": "The name cannot be empty.",
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 255 characters long.",
        }),
    brand: Joi.string()
        .min(2)
        .max(255)
        .optional()
        .messages({
            "string.empty": "The brand cannot be empty.",
            "string.base": "The brand must be a string.",
            "string.min": "The brand must be at least 2 characters long.",
            "string.max": "The brand must be at most 255 characters long.",
        }),
    resourceType: Joi.string()
        .valid("Tecnologia", "Equipo de Sonido", "Material Didactico")
        .optional()
        .messages({
            "string.base": "The resourceType must be a string.",
            "any.only": "The resourceType must be one of: Tecnologia, Equipo de Sonido, Material Didactico.",
        }),
})
.or("name", "brand", "resourceType")
.messages({
    "object.missing": "At least one of the fields (name, brand, resourceType) must be provided.",
    "object.unknown": "Don't send more properties than the ones required.",
});