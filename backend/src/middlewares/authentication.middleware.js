/*
Los middlewares son funciones que se ejecutan antes de que se ejecute una ruta. En este caso, el middleware de autenticación
se encarga de verificar si el usuario está autenticado antes de permitirle acceder a una ruta protegida.
*/
"use strict";
import passport from "passport"; //* Import the passport library.

export function authenticateJWT(req, res, next) { //? Function that authenticates the user using JWT.
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            return next(err); //? If an error occurs, call the next middleware with the error.
        }
        if (!user) { //? If the user is not found, return an error message.
            return res.status(401).json({message: "You do not have permission to access this resource." });
        }
        req.user = user; //? If the user is found, set the user in the request object.
        next(); //? Call the next middleware.
    })(req, res, next);
}