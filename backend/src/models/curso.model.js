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
        code: { //? This is the code of the course. It is unique.
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
        },
        teacherId: {
            type: 'int',
            nullable: false,
        }
    },
    relations: {
        subjects: { //? This is the subject relation of the course.
            target: "Subject",
            type: "one-to-many",
            mappedBy: "cursos", //? This is the inverse side of the relation. mappedBy is used to specify the inverse side of the relation.
            nullable: false,
            cascade: true,
        },
    }
});

export default CursoSchema;