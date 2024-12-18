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
        brand: { // Nueva columna para la marca o modelo del recurso
            type: "varchar",
            length: 255,
            nullable: false,
        },
        resourceType: { // Nueva columna como ENUM
            type: "enum",
            enum: ["Tecnologia", "Equipo de Sonido", "Material Didactico"],
            nullable: false,
        },
    },
});

export default ResourceSchema;
