"use strict";

import { EntitySchema } from "typeorm";

const GradeSchema = new EntitySchema({
    name: "Grade",
    tableName: "grades",
    columns: {
        id: { //? This is the primary key of the table.
            type: 'int',
            primary: true,
            generated: true,
        },
        studentId: { //? This is the studentId of the grade.
            type: 'int',
            nullable: false,
        },
        teacherId: { //? This is the teacherId of the grade.
            type: 'int',
            nullable: false,
        },
        subject: { //? This is the subject of the grade.
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        grade: { //? This is the grade of the grade.
            type: 'decimal',
            precision: 4,
            nullable: false,
        },
        weight: { //? This is the weight of the grade.
            type: 'decimal',
            precision: 3,
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
    relations: { //? Las relaciones son una forma de conectar dos tablas de base de datos.
        student: { //? This is the student relation of the grade.
            target: "User",
            type: "many-to-one",
            joinColumn: { name: "studentId" },
            onDelete: "CASCADE",
        },
        teacher: { //? This is the teacher relation of the grade.
            target: "User",
            type: "many-to-one",
            joinColumn: { name: "teacherId" },
            onDelete: "SET NULL",
        },
    },
});

export default GradeSchema;