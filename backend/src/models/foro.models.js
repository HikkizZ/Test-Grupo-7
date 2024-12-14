// Importaciones necesarias
import { EntitySchema } from "typeorm";

// Definición del esquema de la entidad Foro
const ForoSchema = new EntitySchema({
    name: "Foro",
    tableName: "foros",
    columns: {
        // Definición de las columnas
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
        contenido: {
            type: 'varchar',
            lenght: 10000,
            nullable: false,
        },
        fecha: {
            type: 'date',
            nullable: false,
            transformer: {
                // Transformador para convertir la fecha al guardar en la base de datos
                to: (value) => {
                    if (value instanceof Date) {
                        return value;
                    }
                    // Convierte la fecha de formato DD/MM/YYYY a objeto Date
                    const [dia, mes, anio] = value.split('/');
                    return new Date(anio, mes - 1, dia);
                },
                // Transformador para convertir la fecha al recuperar de la base de datos
                from: (value) => {
                    if (value instanceof Date) {
                        // Convierte la fecha a formato ISO sin la parte de tiempo
                        return value.toISOString().split('T')[0];
                    }
                    return value;
                },
            },
        },
        // archivos adjuntos
        archivosAdjuntos: {
            type: 'simple-json',
            nullable: true,
        },
    },
    // Definición de índices
    indices: [
        {
            name: "IDX_FORO",
            columns: ["id"],
            unique: true,
        },
    ],
});

export default ForoSchema;