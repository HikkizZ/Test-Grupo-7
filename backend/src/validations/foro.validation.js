import Joi from "joi";

// Validación para crear o actualizar un foro
export const foroValidation = Joi.object({
    // Validación del título
    titulo: Joi.string()
        .max(255)
        .required()
        .messages({
            "string.empty": "El título es obligatorio.",
            "string.max": "El título no puede exceder los 255 caracteres.",
        }),
    // Validación de la categoría
    categoria: Joi.string()
        .valid("Tarea", "Contenido", "Variedad")
        .required()
        .messages({
            "any.only": "La categoría debe ser una de las siguientes: Tarea, Contenido o Variedad.",
        }),
    // Validación del contenido
    contenido: Joi.string()
        .max(10000)
        .required()
        .messages({
            "string.empty": "Debe agregar algún contenido",
            "string.max": "El número de caracteres no puede exceder los 10000, resuma",
        }),
    // Validación del nivel del curso
    level: Joi.number()
        .integer()
        .min(1)
        .max(4)
        .required()
        .messages({
            "number.base": "El nivel debe ser un número.",
            "number.integer": "El nivel debe ser un número entero.",
            "number.min": "El nivel debe ser al menos 1.",
            "number.max": "El nivel no puede ser mayor que 4.",
            "any.required": "El nivel es obligatorio.",
        }),
    // Validación de la sección del curso
    section: Joi.string()
        .length(1)
        .regex(/^[A-Z]$/)
        .required()
        .messages({
            "string.base": "La sección debe ser una cadena de texto.",
            "string.length": "La sección debe ser una sola letra.",
            "string.pattern.base": "La sección debe ser una letra mayúscula.",
            "any.required": "La sección es obligatoria.",
        }),
});
