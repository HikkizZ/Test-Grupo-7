"use strict";
import { EntitySchema } from "typeorm";

const CourseSchema = new EntitySchema({
    name: "Course",
    tableName: "Courses",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        courseName: {
            type: "varchar",
            length: 50,
            nullable: false,
        },
    }
    })

export default CourseSchema 