"use strict";
import { EntitySchema } from "typeorm";

const ScheduleSchema = new EntitySchema({
    name: "Schedule",
    tableName: "schedules",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        cursoId: {
            type: "int",
            nullable: false,  
        },
        teacherId: {
            type: "int",
            nullable: false,
        },
        classroomId: {
            type: "int",
            nullable: false,
        },
        subjectId: {
            type: "int",
            nullable: false,
        },
        period: {
            type: "int",
            nullable: false,
        },
        dayOfWeek: {
            type: "enum",
            enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
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
            inverseSide: "schedules",
            onDelete: "CASCADE", 
        }
    }
});

export default ScheduleSchema;