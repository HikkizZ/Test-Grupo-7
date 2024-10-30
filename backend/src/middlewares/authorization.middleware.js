/*
EL middleware de autorización se utiliza para verificar si el usuario tiene permiso para acceder a una ruta específica.
*/
// middlewares/authorization.middleware.js

import User from "../models/user.model.js";
import { AppDataSource } from "../config/configDB.js";
import { handleErrorClient, handleErrorServer } from "../handlers/responseHandlers.js";

export async function isAdmin(req, res, next) { 
  try {
    const userRepository = AppDataSource.getRepository(User);

    // Obtener el ID del usuario del token JWT (req.user debería estar 
    // disponible gracias al middleware de autenticación)
    const userId = req.user.id; 

    const userFound = await userRepository.findOne({ where: { id: userId } });

    if (!userFound) { 
      return handleErrorClient(res, 401, "Usuario no encontrado en la base de datos.");
    }

    const rolUser = userFound.role;

    if (rolUser === "admin") { 
      next();
      return;
    }

    return handleErrorClient(res, 403, "No tienes permiso para realizar esta acción."); // 403 Forbidden
  } catch (error) {
    handleErrorServer(res, 500, "Internal server Middleware error. -> isAdmin()", error.message);
  }
}
export function verifyRole(requiredRole) {
  return (req, res, next) => {
      const user = req.user; //* Se asume que el usuario ya está autenticado y disponible en req.user
      
      if (!user || user.role !== requiredRole) {
          return res.status(403).json({ message: "No tienes permisos para acceder a esta ruta." });
      }
      
      next();
  };
}