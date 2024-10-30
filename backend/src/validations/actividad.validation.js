import Joi from "joi";

export const actividadBodyValidation = Joi.object({
  tipo: Joi.string()
    .valid('extracurricular', 'consulta')
    .required()
    .messages({
      'string.base': 'El tipo debe ser un string.',
      'string.empty': 'El tipo no debe estar vacío.',
      'any.only': 'El tipo debe ser "extracurricular" o "consulta".',
      'any.required': 'El tipo es requerido.',
    }),
  dia: Joi.number()
    .integer()
    .min(1)
    .max(7)
    .required()
    .messages({
      'number.base': 'El día debe ser un número.',
      'number.integer': 'El día debe ser un número entero.',
      'number.min': 'El día debe estar entre 1 y 7.',
      'number.max': 'El día debe estar entre 1 y 7.',
      'any.required': 'El día es requerido.',
    }),
  hora_inicio: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .required()
    .messages({
      'string.base': 'La hora de inicio debe ser un string.',
      'string.empty': 'La hora de inicio no debe estar vacía.',
      'string.pattern.base': 'La hora de inicio debe tener el formato HH:MM:SS.',
      'any.required': 'La hora de inicio es requerida.',
    }),
  hora_fin: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .required()
    .messages({
      'string.base': 'La hora de fin debe ser un string.',
      'string.empty': 'La hora de fin no debe estar vacía.',
      'string.pattern.base': 'La hora de fin debe tener el formato HH:MM:SS.',
      'any.required': 'La hora de fin es requerida.',
    }),
  descripcion: Joi.string()
    .max(255)
    .optional()
    .allow('')
    .messages({
      'string.base': 'La descripción debe ser un string.',
      'string.max': 'La descripción no debe exceder los 255 caracteres.',
    }),
  creadorId: Joi.number().integer().required() // Validación para creadorId
});