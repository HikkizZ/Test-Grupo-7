// Esquema de validación para crear o actualizar un foro
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
    // Validación del nombre del profesor
    nombreProfesor: Joi.string()
        .max(255)
        .required()
        .pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/) // Solo letras y espacios
        .messages({
            "string.empty": "El nombre del profesor es obligatorio.",
            "string.max": "El nombre del profesor no puede exceder los 255 caracteres.",
            "string.pattern.base": "El nombre del profesor solo puede contener letras y un único espacio entre palabras."
        }),
    // Validación de la categoría
    categoria: Joi.string()
        .valid("Tarea", "Contenido","Variedad")
        .required()
        .messages({
            "any.only": "La categoría debe ser una de las siguientes: tarea, contenido o variedad.",
        }),
    // Validación de la fecha
    contenido: Joi.string ()
        .max(10000)
        .required()
        .messages({
            "string.empty": "Debe agregar algún contenido",
            "string.max": "El numero de caracteres no puede exceder los 10000, resuma",
        }),
    fecha: Joi.string()
        .pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/)
        .required()
        .messages({
            "string.empty": "La fecha es obligatoria.",
            "string.pattern.base": "La fecha debe estar en el formato DD/MM/YYYY.",
        }),
});

