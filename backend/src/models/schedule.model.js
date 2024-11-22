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
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            nullable: false,
        },
    },
    relations: {
        period: {
            target: "Period",
            type: "many-to-one",
            joinColumn: true,
            nullable: false
        }
    }
});

export default ScheduleSchema;