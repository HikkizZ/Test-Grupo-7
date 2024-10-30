"use strict";
import { EntitySchema } from "typeorm";

const ClassroomSchema = new EntitySchema({

    name: "Classroom",
    tablename: "Classrooms",
    columns:{
        id:{
            type: "int",
            primary: true,
            generated: true,
        },
        name:{
            type: "varchar",
            length: 50,
            nullable: false,

        },
        size:{
            type: "int",
            nullable: false,
        }
    }

})

export default ClassroomSchema;