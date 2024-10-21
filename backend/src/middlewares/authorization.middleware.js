/*
EL middleware de autorización se utiliza para verificar si el usuario tiene permiso para acceder a una ruta específica.
*/
import User from "../models/user.model.js";
import { AppDataSource } from "../config/configDB.js";
import {
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";

export async function isAdmin(req, res, next) { //? Function that checks if the user is an administrator.
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOne({ where : { email: req.user.email } });

        if (!userFound) { //? If the user is not found, return an error message.
            return handleErrorClient(res, 401, "User not found in the database.");
        }

        const rolUser = userFound.role;

        if (rolUser === "admin") { //? If the user is an administrator, call the next middleware.
            next();
            return;
        }

        return handleErrorClient(res, 401, "You need to be an administrator to perform this action"); 
    } catch (error) {
        handleErrorServer(res, 500, "Internal server Middleware error. -> isAdmin()", error.message);
    }
}