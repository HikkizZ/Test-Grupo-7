"use strict";

import { EntitySchema } from "typeorm";

const ResourceSchema = new EntitySchema({
    name: "Resource",
    tableName: "resources",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        name: {
            type: "varchar",
            length: 255,
            nullable: false,
            unique: true,
        },
    }
});

export default ResourceSchema;
