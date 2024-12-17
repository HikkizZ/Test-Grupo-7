"use strict";

import { EntitySchema } from "typeorm";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Para el formato en español

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
        },
        fecha: {
            type: "timestamp with time zone",
            nullable: false,
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
            transformer: {
                to: (value) => value, // Lo dejamos tal cual al guardar en la base de datos
                from: (value) => format(new Date(value), "dd-MM-yyyy", { locale: es }), // Convierte a formato latino al obtener
            }
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