"use strict";

import Joi from 'joi';

export const gradeQueryValidation = Joi.object({ //* This is the grade query validation schema.
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "The id must be a number.",
            "number.positive": "The id must be a positive number.",
            "number.integer": "The id must be an integer.",
        }),
    AlumnoId: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "The student id must be a number.",
            "number.positive": "The student id must be a positive number.",
            "number.integer": "The student id must be an integer.",
        }),
    SubjectId: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "The subject id must be a number.",
            "number.positive": "The subject id must be a positive number.",
            "number.integer": "The subject id must be an integer.",
        })
})
.or("id", "AlumnoId", "SubjectId")
.unknown(false)
.messages({
    "object.unknown": "The request contains invalid properties.",
    "object.missing": "The request must contain at least one property.",
});

export const gradeBodyValidation = Joi.object({ //* This is the grade body validation schema.
    grade: Joi.number()
        .min(1)
        .max(7)
        .messages({
            "number.base": "The grade must be a number.",
            "number.min": "The grade must be at least 1.",
            "number.max": "The grade must be at most 7.",
        }),
    AlumnoId: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "The student id must be a number.",
            "number.positive": "The student id must be a positive number.",
            "number.integer": "The student id must be an integer.",
        }),
    SubjectId: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "The subject id must be a number.",
            "number.positive": "The subject id must be a positive number.",
            "number.integer": "The subject id must be an integer.",
        }),
})
.or("grade", "AlumnoId", "SubjectId")
.unknown(false)
.messages({
    "object.unknown": "The request contains invalid properties.",
    "object.missing": "The request must contain at least one property.",
});