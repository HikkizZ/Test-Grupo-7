import Joi from "joi";

// Esquema de validación para las noticias
export const newsValidation = Joi.object({
    tituloNews: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.base": "El título de la noticia debe ser una cadena de texto.",
            "string.min": "El título de la noticia debe tener al menos 3 caracteres.",
            "string.max": "El título de la noticia debe tener como máximo 100 caracteres.",
            "any.required": "El título de la noticia es obligatorio."
        }),
        
    contenido: Joi.string()
        .min(1)
        .max(20000)
        .required()
        .messages({
            "string.base": "El contenido debe ser una cadena de texto.",
            "string.min": "El contenido debe tener al menos 10 caracteres.",
            "string.max": "El contenido debe tener como máximo 20000 caracteres.",
            "any.required": "El contenido es obligatorio."
        }),

    imagenPortada: Joi.string()
        .optional()
        .max(255)
        .messages({
            "string.base": "La imagen de portada debe ser una cadena de texto.",
            "string.max": "La ruta de la imagen de portada debe tener como máximo 255 caracteres.",
        }),

    fechaUpdate: Joi.date()
        .optional()
        .messages({
            "date.base": "La fecha de actualización debe ser una fecha válida.",
        }),
});