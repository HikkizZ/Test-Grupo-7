"use strict";

import { EntitySchema } from "typeorm";

const ReservationSchema = new EntitySchema({
    name: "Reservation",
    tableName: "reservations",
    columns: {
        id: { //? This is the primary key of the table.
            type: 'int',
            primary: true,
            generated: true,
        },
        fechaDesde: { //? This is the start date of the reservation.
            type: 'timestamp',
            nullable: false,
        },
        fechaHasta: { //? This is the end date of the reservation.
            type: 'timestamp',
            nullable: false,
        },
        devuelto: { //? This is the date when the reservation was created.
            type: 'boolean',
            default: false,
        },
        tipoReserva: { //? This is the date when the reservation was updated.
            type: 'enum',
            enum: ["recurso", "sala"],
            nullable: false,
        },
    },
    relations: {
        Encargado: { //? This is the resource relation of the reservation.
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: "encargado_id", //? This is the foreign key of the relation.
                referencedColumnName: "id", //? This is the primary key of the relation
            },
            onDelete: "CASCADE",
            nullable: false,
        },
        Profesor: { //? This is the user relation of the reservation.
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: "profesor_id", //? This is the foreign key of the relation.
                referencedColumnName: "id", //? This is the primary key of the relation
            },
            onDelete: "CASCADE",
            nullable: false,
        },
        Recurso: {
            target: "Resource",
            type: "many-to-one",
            joinColumn: {
                name: "recurso_id",
                referencedColumnName: "id",
            },
            onDelete: "CASCADE",
            nullable: true,
        },
        Sala: {
            target: "Room",
            type: "many-to-one",
            joinColumn: {
                name: "sala_id",
                referencedColumnName: "id",
            },
            onDelete: "CASCADE",
            nullable: true,
        }
    },
});

export default ReservationSchema;