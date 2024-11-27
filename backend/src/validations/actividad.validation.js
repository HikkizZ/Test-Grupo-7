import Joi from "joi";

// Función para validar el horario de actividades
const validarHorarioActividad = (hora_inicio, hora_fin, dia) => {
  const diasPermitidos = [1, 2, 3, 4, 5]; // Lunes a viernes (1= lunes, 5= viernes)

  // Validación de día de la semana
  if (!diasPermitidos.includes(dia)) {
    return "La actividad solo puede realizarse de lunes a viernes.";
  }

  // Convertir la hora de inicio y fin a objetos TimeSpan
  const [horaInicio, minutoInicio] = hora_inicio.split(":").map(Number);
  const [horaFin, minutoFin] = hora_fin.split(":").map(Number);
  const horaInicioTimeSpan = new Date(0, 0, 0, horaInicio, minutoInicio, 0);
  const horaFinTimeSpan = new Date(0, 0, 0, horaFin, minutoFin, 0);

  // Rangos de horarios permitidos (usando objetos Date para facilitar la comparación)
  const horariosPermitidos = [
    { inicio: new Date(0, 0, 0, 8, 0, 0), fin: new Date(0, 0, 0, 9, 30, 0) },
    { inicio: new Date(0, 0, 0, 9, 40, 0), fin: new Date(0, 0, 0, 11, 0, 0) },
    { inicio: new Date(0, 0, 0, 11, 10, 0), fin: new Date(0, 0, 0, 12, 30, 0) },
    { inicio: new Date(0, 0, 0, 12, 40, 0), fin: new Date(0, 0, 0, 14, 0, 0) },
    { inicio: new Date(0, 0, 0, 15, 40, 0), fin: new Date(0, 0, 0, 17, 0, 0) },
    { inicio: new Date(0, 0, 0, 17, 10, 0), fin: new Date(0, 0, 0, 18, 40, 0) },
  ];

  // Validación de horario
  let horarioValido = false;
  for (const rango of horariosPermitidos) {
    if (horaInicioTimeSpan >= rango.inicio && horaFinTimeSpan <= rango.fin) {
      horarioValido = true;
      break;
    }
  }

  if (!horarioValido) {
    return "El horario de la actividad no está dentro de los rangos permitidos.";
  }

  // Verificar que la hora de fin no sea antes de la hora de inicio
  if (horaFinTimeSpan <= horaInicioTimeSpan) {
    return "La hora de fin debe ser posterior a la hora de inicio.";
  }

  return null; // Si todo es válido
};

// Validación para el cuerpo de la actividad
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
  creadorId: Joi.number().integer().required(), // Validación para creadorId
}).custom((value, helpers) => {
  const error = validarHorarioActividad(value.hora_inicio, value.hora_fin, value.dia);
  if (error) {
    return helpers.message(error);
  }
  return value;
});

// Validación para los parámetros de la query
export const actividadQueryValidation = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .optional()
    .messages({
      'number.base': 'El id debe ser un número entero.',
      'number.positive': 'El id debe ser un número positivo.',
    }),
  tipo: Joi.string()
    .valid('extracurricular', 'consulta')
    .optional()
    .messages({
      'string.base': 'El tipo debe ser un string.',
      'any.only': 'El tipo debe ser "extracurricular" o "consulta".',
    }),
  dia: Joi.number()
    .integer()
    .min(1)
    .max(7)
    .optional()
    .messages({
      'number.base': 'El día debe ser un número.',
      'number.min': 'El día debe estar entre 1 y 7.',
      'number.max': 'El día debe estar entre 1 y 7.',
    }),
  hora_inicio: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .optional()
    .messages({
      'string.base': 'La hora de inicio debe ser un string.',
      'string.pattern.base': 'La hora de inicio debe tener el formato HH:MM:SS.',
    }),
  hora_fin: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .optional()
    .messages({
      'string.base': 'La hora de fin debe ser un string.',
      'string.pattern.base': 'La hora de fin debe tener el formato HH:MM:SS.',
    }),
  descripcion: Joi.string()
    .max(255)
    .optional()
    .messages({
      'string.base': 'La descripción debe ser un string.',
      'string.max': 'La descripción no debe exceder los 255 caracteres.',
    }),
  creadorId: Joi.number().integer().optional() // Opcional si quieres buscar por creadorId también
});