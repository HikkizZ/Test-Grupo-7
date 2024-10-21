/*
Las validaciones son funciones que nos ayudan a validar los datos de entrada. En este caso, la validación de usuario
nos ayuda a validar los datos de entrada de los usuarios. Por ejemplo, podemos validar que el nombre del usuario
sea una cadena de caracteres, que el rut del usuario sea un rut válido, que la contraseña del usuario tenga una
longitud mínima, etc.
*/

"use strict";
import Joi from "joi"; //* Joi is a schema description language and data validator for JavaScript.

//? This is a custom validator that checks if the email domain is gmail.cl.
const domainEmailValidator = (value, helper) => {
    if (!value.endsWith("gmail.cl")) {
        return helper.message("The email domain must be gmail.cl.");
    }
    return value;
};

export const userQueryValidation = Joi.object({ //* This is the user query validation schema.
    id: Joi.number().positive().integer().optional().messages({
        "number.base": "The id must be a number.",
        "number.positive": "The id must be a positive number.",
        "number.integer": "The id must be an integer.",
        "any.required": "The id is required.",
    }),
    email: Joi.string()
        .min(15)
        .max(50)
        .email()
        .optional()
        .messages({
            "string.empty": "The email is required.",
            "any.required": "The email is required.",
            "string.base": "The email must be a string.",
            "string.email": "The email must be a valid email ending with gmail.cl.",
            "string.min": "The email must be at least 15 characters long.",
            "string.max": "The email must be at most 50 characters long.",
        })
        .custom(domainEmailValidator, "domain email validation"),
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
            "string.pattern.base": "The rut must be a valid rut. Example: 12.345.678-9 or 12345678-9.",
        })
})
.or("id", "email", "rut")
.messages({
    "object.unknown": "The query must have at least one field: id, email, or rut.",
    "object.missing": "The query must have at least one field: id, email, or rut.",
});

export const userBodyValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(70)
        .optional()
        .pattern(new RegExp("^[a-zA-Z\\s]+$")) //* This is a regex pattern for the name. Example: John Doe.
        .messages({
            "string.empty": "The name is required.",
            "any.required": "The name is required.",
            "string.base": "The name must be a string.",
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name must be at most 70 characters long.",
            "string.pattern.base": "The name must be a valid name.",
        }),
        email: Joi.string()
        .min(15)
        .max(50)
        .email()
        .optional()
        .messages({
            "string.empty": "The email is required.",
            "any.required": "The email is required.",
            "string.base": "The email must be a string.",
            "string.email": "The email must be a valid email ending with gmail.cl.",
            "string.min": "The email must be at least 15 characters long.",
            "string.max": "The email must be at most 50 characters long.",
        })
        .custom(domainEmailValidator, "domain email validation"),
        password: Joi.string()
        .min(8)
        .max(25)
        .optional()
        .pattern(new RegExp("^[a-zA-Z0-9]+$")) //* This is a regex pattern for the password. Example: password123.
        .messages({
            "string.empty": "The password is required.",
            "any.required": "The password is required.",
            "string.base": "The password must be a string.",
            "string.min": "The password must be at least 8 characters long.",
            "string.max": "The password must be at most 25 characters long.",
            "string.pattern.base": "The password must be a valid password. Only letters and numbers.",
        }),
        newPassword: Joi.string()
        .min(8)
        .max(25)
        .optional()
        .pattern(new RegExp("^[a-zA-Z0-9]+$")) //* This is a regex pattern for the password. Example: password123.
        .messages({
            "string.empty": "The password is required.",
            "any.required": "The password is required.",
            "string.base": "The password must be a string.",
            "string.min": "The password must be at least 8 characters long.",
            "string.max": "The password must be at most 25 characters long.",
            "string.pattern.base": "The password must be a valid password. Only letters and numbers.",
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
            "string.pattern.base": "The rut must be a valid rut. Example: 12.345.678-9 or 12345678-9.",
        }),
        role: Joi.string()
        .min(4)
        .max(20)
        .optional()
        .messages({
            "string.empty": "The role is required.",
            "any.required": "The role is required.",
            "string.base": "The role must be a string.",
            "string.min": "The role must be at least 4 characters long.",
            "string.max": "The role must be at most 20 characters long.",
        }),
})
.or("name", "email", "password", "rut", "role")
.messages({
    "object.unknown": "No additional characters are allowed."
});