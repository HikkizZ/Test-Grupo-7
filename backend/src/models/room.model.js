// models/room.model.js
import { EntitySchema } from "typeorm";

const RoomSchema = new EntitySchema({
    name: "Room",
    tableName: "rooms",
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
        size: { // Nueva columna para el tamaño de la sala en metros cuadrados (m2), permite decimales
            type: "float",
            nullable: false,
            // Se mostrará dinámicamente como "45.5 m²" en el backend o frontend
        },
        roomType: { // Nueva columna para clasificar la sala
            type: "enum",
            enum: ["laboratorio", "computacion", "clases"],
            nullable: false,
        },
    },

    relations:{
        horarios: { // Relación con Horario
            target: "Horario", 
            type: "one-to-many", 
            inverseSide: "room", 
            onDelete: "CASCADE", 
        },
    }
});

export default RoomSchema;
