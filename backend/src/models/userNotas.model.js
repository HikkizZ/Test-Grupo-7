import { EntitySchema } from "typeorm";

const UserNotasSchema = new EntitySchema({
    name: "UserNotas",
    tableName: "users_notas",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        nota: {
            type: "decimal",
            nullable: true,
            precision: 4,
            scale: 2,
            nullable: true,
        },
    },
    relations: {
        student: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
        },
        calificacion: {
            target: "Calificacion",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
        },
        subject: {
            target: "Subject",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
            onDelete: "CASCADE",
        }
    }
});

export default UserNotasSchema;