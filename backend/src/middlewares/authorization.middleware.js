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
            return handleErrorClient(res, 401, "No se encontró el user en la base de datos.");
        }

        const rolUser = userFound.role;

        if (rolUser === "admin") { //? If the user is an administrator, call the next middleware.
            next();
            return;
        }

        return handleErrorClient(res, 401, "Necesitas ser administrador para realizar esta acción."); 
    } catch (error) {
        handleErrorServer(res, 500, "Internal server Middleware error. -> isAdmin()", error.message);
    }
}

export function verifyRole(requiredRoles) { //* Function that verifies the role of the user.
    return (req, res, next) => {
        const user = req.user; //° It is assumed that the user is already authenticated and available in req.user.
        
        if (!user) { //? If the user is not found, return an error message.
            return res.status(403).json({ message: "No tienes permisos para acceder a esta ruta." });
        }
        //? If the requiredRoles is an array, assign it to roles, otherwise, assign it to an array.
        const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles]; 
        
        if (!roles.includes(user.role)) { //? If the user's role is not in the roles array, return an error message.
            return res.status(403).json({ message: "No tienes permisos para acceder a esta ruta." });
        }
        
        next();
    };
}
