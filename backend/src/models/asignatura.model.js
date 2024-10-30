"use strict";
import { EntitySchema } from "typeorm";

const AsignaturaSchema = new EntitySchema({

    name: "Subject",
    tableName: "subjects",
    columns:{
        id:{
            type: "int",
            primary:true,
            generated: true,
        },

        subjectName:{
            type:"varchar",
            length: 50,
            nullable: false
        }
    }

})

export default AsignaturaSchema