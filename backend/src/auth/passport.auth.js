/*
El passport.auth.js es un archivo que se encarga de la autenticación de los usuarios. En este archivo se configura la
estrategia de autenticación JWT. Se importa el passport y el modelo de usuario.
*/

"use strict";
import passport from "passport"; //* Import the passport library.
import User from "../models/user.model.js"; //* Import the user model.
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"; //* Import the passport-jwt library.
import { ACCESS_TOKEN_SECRET } from "../config/configEnv.js"; //* Import the access token secret.
import { AppDataSource } from "../config/configDB.js"; //* Import the database connection.

const options = { //* Options for the JWT strategy.
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //? Extract the JWT from the authorization header.
    secretOrKey: ACCESS_TOKEN_SECRET //? Use the access token secret to verify the JWT.
};

passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => { //* Create a new JWT strategy.
        try {
            const userRepository = AppDataSource.getRepository(User); //? Get the user repository.

            const user = await userRepository.findOne({ where: { email: jwt_payload.email } }); //? Find the user by email.

            if (!user) { //? If the user is not found.
                return done(null, false); //? Return false.
            }

            return done(null, user); //? Return the user.
        } catch (error) {
            return done(error, false); //? Return an error.
        }
}));

export function passportJWTSetup(){
    passport.initialize(); //? Initialize the passport library.
}