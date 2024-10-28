"use strict";

import { EntitySchema } from "typeorm";

const studentSubjectsSchema = new EntitySchema({
    name: "StudentSubjects",
    tableName: "student_subjects",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        }
    },
    relations: {
        student: {
            target: "User",
            type: "many-to-one",
            joinColumn: { name: "studentId" },
            onDelete: "CASCADE",
            nullable: false
        },
        subject: {
            target: "Subject",
            type: "many-to-one",
            joinColumn: { name: "subjectId" },
            onDelete: "CASCADE",
            nullable: false
        }
    }
});

export default studentSubjectsSchema;