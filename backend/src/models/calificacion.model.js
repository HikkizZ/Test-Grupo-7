"use strict";

import { EntitySchema } from "typeorm";

const CalificacionSchema = new EntitySchema({
    name: "Calificacion",
    tableName: "calificaciones",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        name: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        porcentaje: {
            type: "decimal",
            nullable: false,
            precision: 3,
        }
    },
    relations: {
        subject: { //? Relation with the Subject entity. A qualification belongs to a subject.
            target: "Subject",
            type: "many-to-one",
            joinColumn: true,
            onDelete: "CASCADE",
            nullable: false,
        },
        student: { //? Relation with the User entity. A qualification belongs to a student.
            target: "UserNotas",
            type: "one-to-many",
            inverseSide: "calificacion",
        }
    },
});

export default CalificacionSchema;