"use strict";
import { EntitySchema } from "typeorm";


const ActividadSchema = new EntitySchema({ //definimos la actividad a realizar, si es extracurricular o consulta.

    name: "Actividad",
    tableName: "actividades",
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        tipo: {
            type: 'varchar',
            length: 50,
            nullable: false,
        },
        dia: {
            type: 'int',
            nullable: false,
        },
        hora_inicio: {
            type: 'time',
            nullable: false,
        },
        hora_fin: {
            type: 'time',
            nullable: false,
        },
        descripcion: {
            type: 'text',
            nullable: false,
        },
        createAt: {
            type: 'timestamp with time zone',
            default: () => 'CURRENT_TIMESTAMP',
            nullable: false,
        },
        updateAt: {
            type: 'timestamp with time zone',
            default: () => 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
            nullable: false,
        },
    },
    relations: {
        creador: {
          target: "User", 
          type: "many-to-one",
          joinColumn: true, 
          onDelete: "CASCADE" 
        }
        
      },
    indices: [
        {
            name: "IDX_ACTIVIDAD",
            columns: ["id"],
            unique: true,
        },
    ],
});

export default ActividadSchema;