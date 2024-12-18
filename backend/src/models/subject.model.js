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
        code: { //? Code of the subject. It is unique and auto-generated. For example: MTH-01, HST-02, PHY-03
            type: 'varchar',
            length: 20,
            nullable: false,
            unique: true,
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
       horarios: { // Relación con Horarios
            target: "Horario", 
            type: "one-to-many", 
            inverseSide: "subject", 
            onDelete: "CASCADE", 
        },
        students: { //? Relation with the User entity. A subject has many students.
            target: "User",
            type: "many-to-many",
            inverseSide: "subjects",
            joinTable: {
                name: "student_subjects",
                joinColumn: {
                    name: "subject_id",
                    referencedColumnName: "id"
                },
                inverseJoinColumn: {
                    name: "student_rut",
                    referencedColumnName: "rut"
                },
            },
        },
        calificaciones: { //? Relation with the Calificacion entity. A subject has many qualifications.
            target: "Calificacion",
            type: "one-to-many",
            inverseSide: "subject",
            onDelete: "CASCADE",
        },
    },
    indices: [ //? Indexes of the table to optimize the search.
        {
            name: "IDX_ID_SUBJECT",
            unique: true,
            columns: ["id"]
        },
        {
            name: "IDX_SUBJECT_CODE",
            unique: true,
            columns: ["code"]
        }
    ]
});

export default SubjectSchema;