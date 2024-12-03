"use strict";

import { EntitySchema } from "typeorm";

const SubjectSchema = new EntitySchema({
    name: "Subject",
    tableName: "subjects",
    columns: {
        id: { //? TPrimary key of the table.
            type: 'int',
            primary: true,
            generated: true,
        },
        name: { //? Name of the subject. For example: 'Mathematics', 'History', 'Physics'
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        description: { //? This is the description of the subject. It is optional.
            type: 'varchar',
            length: 255,
            nullable: true,
        },
    },
    relations: {
        curso: { //? Relation with the Curso entity. A subject belongs to a course.
            target: "Curso",
            type: "many-to-one",
            joinColumn: true,
            inverseSide: "subjects",
            onDelete: "CASCADE",
            nullable: false,
        },
        teacher: { //? Relation with the User entity. A subject is taught by a teacher.
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            nullable: false
        },
        grades: { //? Relation with the Grade entity. A subject has many grades.
            target: "Grade",
            type: "one-to-many",
            inverseSide: "subject",
        },
        schedules: { // Relación con Schedule
            target: "Schedule", 
            type: "one-to-many", 
            inverseSide: "room", 
            onDelete: "CASCADE", 
        },
    }
});

export default SubjectSchema;