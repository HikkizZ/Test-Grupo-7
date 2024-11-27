import { EntitySchema } from "typeorm";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Para el formato en español

const ForoSchema = new EntitySchema({
    name: "Foro",
    tableName: "foros",
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        titulo: {
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        nombreProfesor: {
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        categoria: {
            type: 'varchar',
            length: 50,
            nullable: false,
        },
        fecha: {
            type: 'timestamp with time zone',
            nullable: false,
            transformer: {
                to: (value) => value, // Lo dejamos tal cual al guardar en la base de datos
                from: (value) => format(new Date(value), "dd-MM-yyyy", { locale: es }), // Convierte a formato latino al obtener
            },
        },
    },
    indices: [
        {
            name: "IDX_FORO",
            columns: ["id"],
            unique: true,
        },
    ],
});

export default ForoSchema;
