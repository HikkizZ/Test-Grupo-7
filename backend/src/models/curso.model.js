"use strict";

import { EntitySchema } from "typeorm";

const CursoSchema = new EntitySchema({
    name : "Curso",
    tableName: "cursos",
    columns: {
        id: { //? Primary key of the table.
            type: 'int',
            primary: true,
            generated: true,
        },
        name: { //? Name of the course. For example: 'Primero Medio A' or 'Cuarto Medio Gabriel Mistral'
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        code: { //? Code of the course. It is unique and auto-generated. For example: 1A-24
            type: 'varchar',
            length: 10,
            nullable: false,
            unique: true,
        },
        level: { //? Level of the course. For example: 1, 2, 3, 4. (Primero Medio, Segundo Medio, Tercero Medio, Cuarto Medio)
            type: 'int',
            nullable: false,
        },
        year: { //? Year of the course. For example: 2024, 2025
            type: 'int',
            nullable: false,
        },
        section: { //? Section of the course. For example: A, B, C, D
            type: 'varchar',
            length: 1,
            nullable: false,
        }
    },
    relations: {
        subjects: { //? Relation with the Subject entity. A course has many subjects.
            target: "Subject",
            type: "one-to-many",
            inverseSide: "curso", //? This is the name of the property that the Subject entity has to relate to the Course entity.
        },
        schedules: { // Relación con Schedule
            target: "Schedule", 
            type: "one-to-many", 
            inverseSide: "room", 
            onDelete: "CASCADE", 
        },
        students: { //? Relation with the User entity. A course has many students.
            target: "User",
            type: "one-to-many",
            inverseSide: "curso",
            onDelete: "SET NULL",
            nullable: true,
        }
    },
    indices: [ //? Indexes of the table to optimize the search.
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