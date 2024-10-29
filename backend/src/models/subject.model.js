"use strict";

import { EntitySchema, JoinColumn } from "typeorm";

const SubjectSchema = new EntitySchema({
    name: "Subject",
    tableName: "subjects",
    columns: {
        id: { //? This is the primary key of the table.
            type: 'int',
            primary: true,
            generated: true,
        },
        name: { //? This is the name of the subject.
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
        cursos: { //? This is the course relation of the subject.
            target: "Curso",
            type: "many-to-one",
            JoinColumn: true,
            inverseSide: "subjects",
            onDelete: "CASCADE",
            nullable: false,
        },
    }
});

export default SubjectSchema;