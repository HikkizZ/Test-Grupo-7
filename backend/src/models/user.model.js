"use strict";
import { EntitySchema } from "typeorm";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute.js";

const UserSchema = new EntitySchema({
    name: "User",
    tableName: "usersauth",
    columns: {
        id: { //? Primary key of the table.
            type: 'int',
            primary: true,
            generated: true,
        },
        name: { //? This is the name of the user.
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        rut: { //? This is the rut of the user.
            type: 'varchar',
            length: 12,
            nullable: false,
            unique: true,
        },
        password: { //? This is the password of the user.
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        role: { //? This is the role of the user. It can be 'admin', 'profesor', 'alumno', 'encargado', 'administrativo', etc.
            type: 'varchar',
            length: 50,
            nullable: false,
        },
        email: { //? This is the email of the user.
            type: 'varchar',
            length: 255,
            nullable: false,
            unique: true,
        },
        createAt: { //? This is the date when the user was created.
            type: 'timestamp with time zone',
            default: () => 'CURRENT_TIMESTAMP',
            nullable: false,
        },
        updateAt: { //? This is the date when the user was updated.
            type: 'timestamp with time zone',
            default: () => 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            nullable: false,
        },
    },
    relations:{
        curso: { //? Relation with the Curso entity. A user belongs to a course.
            target: "Curso",
            type: "many-to-one",
            joinColumn: true,
            onDelete: "SET NULL",
        },
        subjects: { //? Relation with the Subject entity. A user has many subjects.
            target: "Subject",
            type: "many-to-many",
            joinTable: {
                name: "student_subjects",
                joinColumn: {
                    name: "student_rut",
                    referencedColumnName: "rut",
                },
                inverseJoinColumn: {
                    name: "subject_id",
                    referencedColumnName: "id",
                },
            },
        },
        notas: {
            target: "UserNotas",
            type: "one-to-many",
            inverseSide: "student_id",
        }
    },
    indices: [ //? Indexes of the table to optimize the search.
        {
            name: "IDX_USER", 
            columns: ["id"], // Utilizamos el índice IDX_USER para buscar por el id del usuario.
            unique: true,
        },
        {
            name: "IDX_USER_RUT",
            columns: ["rut"], // Utilizamos el índice IDX_USER_RUT para buscar por el rut del usuario.
            unique: true,
        },
        {
            name: "IDX_USER_EMAIL",
            columns: ["email"], // Utilizamos el índice IDX_USER_EMAIL para buscar por el email del usuario.
            unique: true,
        },
    ],
});

export default UserSchema;