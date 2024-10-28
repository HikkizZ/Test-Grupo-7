"use strict";

import e from "express";
import { EntitySchema } from "typeorm";

const SubjectSchema = new EntitySchema({
    name: "Subject",
    tableName: "subjects",
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        name: {
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        codigo: {
            type: 'varchar',
            length: 10,
            nullable: false,
            unique: true,
        },
        level: {
            type: 'int',
            nullable: false,
        },
        year: {
            type: 'int',
            nullable: false,
        },
        section: {
            type: 'varchar',
            length: 1,
            nullable: false,
        },
        teacherId: {
            type: 'int',
            nullable: false,
        }
    },
    relations: {
        teacher: {
            target: "User",
            type: "many-to-one",
            joinColumn: { name: "teacherId" },
            onDelete: "SET NULL"
        },
    },
    indices: [
        {
            name: "IDX_SUBJECT",
            columns: ["id"],
            unique: true,
        },
    ],
});

export default SubjectSchema;