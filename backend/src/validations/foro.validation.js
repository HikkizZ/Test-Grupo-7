import Joi from "joi";

// Validación para crear o actualizar un foro
export const foroValidation = Joi.object({
    titulo: Joi.string()
        .max(255)
        .required()
        .messages({
            "string.empty": "El título es obligatorio.",
            "string.max": "El título no puede exceder los 255 caracteres.",
        }),
    nombreProfesor: Joi.string()
        .max(255)
        .required()
        .pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/) // Solo letras y espacios
        .messages({
            "string.empty": "El nombre del profesor es obligatorio.",
            "string.max": "El nombre del profesor no puede exceder los 255 caracteres.",
            "string.pattern.base": "El nombre del profesor solo puede contener letras y un único espacio entre palabras."
        }),
    categoria: Joi.string()
        .valid("Tarea", "Contenido","Variedad")
        .required()
        .messages({
            "any.only": "La categoría debe ser una de las siguientes: tarea, contenido o variedad.",
        }),
    fecha: Joi.string()
        .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
        .required()
        .messages({
            "string.empty": "La fecha es obligatoria.",
            "string.pattern.base": "La fecha debe estar en el formato DD/MM/YYYY.",
        }),
});