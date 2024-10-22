"use strict"; //! strict mode helps you to write cleaner code and avoid common mistakes.
import { DataSource } from "typeorm"; //* It is used to configure and manage the connection to a database in projects that use TypeORM.
import { DATABASE, DB_USERNAME, DB_PASSWORD, HOST } from "./configEnv.js";

export const AppDataSource = new DataSource({
    type: "postgres", // The type of the database you are connecting to.
    host: `${HOST}`, // The host of the relational database
    port: 5432, // The port of the relational database
    username: `${DB_USERNAME}`, // The username of the relational database
    password: `${DB_PASSWORD}`, // The password of the relational database
    database: `${DATABASE}`, // The name of the relational database
    synchronize: true, // Indicates if database schema should be auto created on every application launch.
    logging: false, // Enable or disable logging of the SQL commands.
    entities: ["src/models/**/*.js"], // Array of entities to load
});

export async function connectDB() {
    try {
        await AppDataSource.initialize(); // Initialize the connection
        console.log("=> Database connected successfully"); // Print a message
    } catch (error) {
        console.log("Error connecting to the database: ", error); // Print a error message
        process.exit(1); // Exit the application
    }
}