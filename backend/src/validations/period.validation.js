"use strict";
import Joi from "joi";

export const periodValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty": "The period name is required.",
            "any.required": "The period name is required.",
            "string.base": "The period name must be a string.",
            "string.min": "The period name must be at least 3 characters long.",
            "string.max": "The period name must be at most 50 characters long.",
        }),
    startTime: Joi.string()
        .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .required()
        .messages({
            "string.empty": "The start time is required.",
            "any.required": "The start time is required.",
            "string.pattern.base": "The start time must be in HH:MM format.",
        }),
    endTime: Joi.string()
        .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .required()
        .messages({
            "string.empty": "The end time is required.",
            "any.required": "The end time is required.",
            "string.pattern.base": "The end time must be in HH:MM format.",
        })
    
}).custom((values, helpers) => {
    const [startHour, startMinute] = values.startTime.split(":").map(Number);
    const [endHour, endMinute] = values.endTime.split(":").map(Number);
    
    if (
        endHour < startHour || 
        (endHour === startHour && endMinute <= startMinute)
    ) {
        return helpers.message("The end time must be later than the start time.");
    }
    
    return values;
}).messages({
    "object.unknown": "The request contains unknown fields."
});
