import { EntitySchema } from "typeorm";

const PeriodSchema = new EntitySchema({
    name: "Period",
    tableName: "periods",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        name: { 
            type: "varchar",
            length: 50,
            nullable: false,
            //unique: true,
        },
        startTime: {
            type: "varchar",
            length: 5, // Para el formato HH:MM
            nullable: false,
        },
        endTime: {
            type: "varchar",
            length: 5, // Para el formato HH:MM
            nullable: false,
        },
    },
});

export default PeriodSchema;
