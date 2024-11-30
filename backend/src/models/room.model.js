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
        }
    },
    relations:{
        schedules: { // Relación con Schedule
            target: "Schedule", 
            type: "one-to-many", 
            inverseSide: "room", 
            onDelete: "CASCADE", 
        },
    }
});

export default RoomSchema;
