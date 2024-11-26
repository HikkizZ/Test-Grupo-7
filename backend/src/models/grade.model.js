"use strict";

import { EntitySchema } from "typeorm";

const GradeSchema = new EntitySchema({
    name: "Grade",
    tableName: "grades",
    columns: {
        id: { //? Primary key of the table.
            type: 'int',
            primary: true,
            generated: true,
        },
        grade: { //? Grade of the student. For example: 6.5, 7.0, 5.5
            type: 'decimal',
            precision: 4,
            nullable: false,
            scale: 1,
        },
        // weight: { //? Weight of the grade. For example: 60% -> 0.6, 40% -> 0.4
        //     type: 'decimal',
        //     precision: 3,
        //     nullable: false,
        // },
        period:{ //? This is the period of the grade. El año escolar puede estar dividido en semestres o trimestres.
            type: 'int',
            nullable: false,
        },
        createAt: { //? This is the date when the grade was created.
            type: 'timestamp with time zone',
            default: () => 'CURRENT_TIMESTAMP',
            nullable: false,
        },
        updateAt: { //? This is the date when the grade was updated.
            type: 'timestamp with time zone',
            default: () => 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            nullable: false,
        },
    },
    relations: {
        alumno: { //? Relation with the User entity. A grade belongs to a student.
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            onDelete: "CASCADE",
            nullable: false,
        },
        subject: { //? Relation with the Subject entity. A grade belongs to a subject.
            target: "Subject",
            type: "many-to-one",
            joinColumn: true,
            onDelete: "CASCADE",
            nullable: false,
        },
        profesor: { //? Relation with the User entity. A grade is created by a teacher.
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            onDelete: "CASCADE",
            nullable: false,
        }
    }
});

export default GradeSchema;