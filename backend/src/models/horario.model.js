"use strict";
import { EntitySchema } from "typeorm";

const HorarioSchema = new EntitySchema({
    name: "Horario",
    tableName: "horarios",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        teacherId: {
            type: "varchar",
            nullable: false,
        },
        subjectId: {
            type: "varchar",
            nullable: false,
        },
        cursoId: {
            type: "varchar",
            nullable: false,  
        },
        classroomId: {
            type: "varchar",
            nullable: false,
        },
        dayOfWeek: {
            type: "enum",
            enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
            nullable: false,
        },
        periodId: {
            type: "varchar",
            nullable: false,
        },
    },
    relations: {
        period: {//Relación con period
            target: "Period",
            type: "many-to-one",
            joinColumn: { name: "periodId" },
            nullable: false
        },
        curso: { // Relación con Curso
            target: "Curso",  
            type: "many-to-one",
            joinColumn: { name: "cursoId" },
            nullable: false,
            onDelete: "CASCADE", 
        },
        room: { // Relación con Sala
            target: "Room",
            type: "many-to-one",
            joinColumn: { name: "classroomId" },
            nullable: false,
            onDelete: "CASCADE",
        },
        subject: { // Relación con Asignatura
            target: "Subject",
            type: "many-to-one",
            joinColumn: { name: "subjectId" },
            nullable: false,
            onDelete: "CASCADE",
        },
        teacher: { // Relación con Profesor
            target: "User",  
            type: "many-to-one",  
            joinColumn: { name: "teacherId" },
            inverseSide: "horarios",
            onDelete: "CASCADE", 
        }
    }
});

export default HorarioSchema;