"use strict";

import { EntitySchema } from "typeorm";

const CursoSchema = new EntitySchema({
    name : "Curso",
    tableName: "cursos",
    columns: {
        id: { //? This is the primary key of the table.
            type: 'int',
            primary: true,
            generated: true,
        },
        name: { //? This is the name of the course.
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        code: { //? This is the code of the course. It is unique. // For example: 1A-24
            type: 'varchar',
            length: 10,
            nullable: false,
            unique: true,
        },
        level: { //? This is the level of the course. 
            type: 'int',
            nullable: false,
        },
        year: { //? This is the year of the course.
            type: 'int',
            nullable: false,
        },
        section: { //? This is the section of the course
            type: 'varchar',
            length: 1,
            nullable: false,
        }
    },
    relations: {
        subjects: { //? This is the subject relation of the course.
            target: "Subject",
            type: "one-to-many",
            inverseSide: "curso", //? This is the inverse side of the relation. mappedBy is used to specify the inverse side of the relation.
        },
    },
    indices: [ //? Los índices son una forma de optimizar las consultas en una base de datos.
        {
            name: "IDX_ID_CURSO",
            unique: true,
            columns: ["id"]
        },
        {
            name: "IDX_CURSO_CODE",
            unique: true,
            columns: ["code"]
        }
    ]
});

export default CursoSchema;