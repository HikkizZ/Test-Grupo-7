"use strict";

import Joi from "joi";

export const periodQueryValidation = Joi.object({
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
        .max(50)
        .messages({
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 50 characters long.",
            "string.empty": "The name should not be empty.",
        }),
})
.unknown(false)
.messages({
    "object.unknown": "The request contains invalid properties.",
});


export const periodBodyValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 50 characters long.",
            "string.empty": "The name is required.",
        }),
    startTime: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) 
        .required()
        .messages({
            "string.base": "The startTime must be a string in HH:mm format.",
            "string.pattern.base": "The startTime must be in the format HH:mm:ss.",
            "string.empty": "The startTime is required.",
        }),
    endTime: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) 
        .required()
        .messages({
            "string.base": "The endTime must be a string in HH:mm format.",
            "string.pattern.base": "The endTime must be in the format HH:mm:ss.",
            "string.empty": "The endTime is required.",
        }),
})
.custom((value, helpers) => {
    if (value.startTime >= value.endTime) {
        return helpers.message("The startTime must be earlier than the endTime.");
    }
    return value;
})
.unknown(false);
