"use strict";
import Joi from "joi";

const domainEmailValidator = (value, helper) => {
    if (!value.endsWith("@gmail.cl")) return helper.message("The email domain is invalid. It must be @gmail.cl.");
    return value;
}

export const authValidation = Joi.object({
    email: Joi.string()
        .min(15)
        .max(50)
        .email()
        .required()
        .messages({
            "string.empty": "The email is required.",
            "any.required": "The email is required.",
            "string.base": "The email must be a string.",
            "string.email": "The email must be a valid email.",
            "string.min": "The email must be at least 15 characters long.",
            "string.max": "The email must be at most 50 characters long.",
        })
        .custom(domainEmailValidator, "domain email validation"),
    password: Joi.string()
        .min(8)
        .max(25)
        .pattern(new RegExp("^[a-zA-Z0-9]+$"))
        .required()
        .messages({
            "string.empty": "The password is required.",
            "any.required": "The password is required.",
            "string.base": "The password must be a string.",
            "string.min": "The password must be at least 8 characters long.",
            "string.max": "The password must be at most 25 characters long.",
            "string.pattern.base": "The password must be a valid password. Only letters and numbers.",
        }),
}).messages({
    "object.unknown": "The request contains unknown fields.",
});

export const registerValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(70)
        .pattern(new RegExp("^[a-zA-Z\\s]+$"))
        .required()
        .messages({
            "string.empty": "The name is required.",
            "any.required": "The name is required.",
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 70 characters long.",
            "string.pattern.base": "The name must be a valid name.",
        }),
    rut: Joi.string()
        .min(9)
        .max(12)
        .optional()
        .pattern(/^\d{1,2}(\.\d{3}){2}-[\dkK]$|^\d{7,8}-[\dkK]$/) //* This is a regex pattern for the rut. Example: 12.345.678-9.
        .messages({
            "string.empty": "The rut is required.",
            "any.required": "The rut is required.",
            "string.base": "The rut must be a string.",
            "string.min": "The rut must be at least 9 characters long.",
            "string.max": "The rut must be at most 12 characters long.",
            "string.pattern.base": "The rut must be a valid rut.",
        }),
    email: Joi.string()
        .min(15)
        .max(50)
        .email()
        .required()
        .messages({
            "string.empty": "The email is required.",
            "any.required": "The email is required.",
            "string.base": "The email must be a string.",
            "string.email": "The email must be a valid email.",
            "string.min": "The email must be at least 15 characters long.",
            "string.max": "The email must be at most 50 characters long.",
        })
        .custom(domainEmailValidator, "domain email validation"),
    password: Joi.string()
        .min(8)
        .max(25)
        .pattern(new RegExp("^[a-zA-Z0-9]+$"))
        .required()
        .messages({
            "string.empty": "The password is required.",
            "any.required": "The password is required.",
            "string.base": "The password must be a string.",
            "string.min": "The password must be at least 8 characters long.",
            "string.max": "The password must be at most 25 characters long.",
            "string.pattern.base": "The password must be a valid password. Only letters and numbers.",
        })
}).messages({
    "object.unknown": "The request contains unknown fields.",
});