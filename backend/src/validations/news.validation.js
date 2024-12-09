import Joi from "joi";

// Definimos el esquema de validación para una noticia
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
        
    nombreAutor: Joi.string()
        .min(3)
        .max(60)
        .required()
        .messages({
            "string.base": "El nombre del autor debe ser una cadena de texto.",
            "string.min": "El nombre del autor debe tener al menos 3 caracteres.",
            "string.max": "El nombre del autor debe tener como máximo 60 caracteres.",
            "any.required": "El nombre del autor es obligatorio."
        }),

    contenido: Joi.string()
        .min(10)
        .max(5000)
        .required()
        .messages({
            "string.base": "El contenido debe ser una cadena de texto.",
            "string.min": "El contenido debe tener al menos 10 caracteres.",
            "string.max": "El contenido debe tener como máximo 3000 caracteres.",
            "any.required": "El contenido es obligatorio."
        }),

});