"use strict";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { AppDataSource } from "../config/configDB.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";
import { ACCESS_TOKEN_SECRET } from "../config/configEnv.js";
import { formatToLocalTime } from '../utils/formatDate.js'

export async function loginService(user){
    try {
        const userRepository = AppDataSource.getRepository(User); //? Getting the user repository.
        const { email, password } = user; //? Destructuring the user object.

        const createErrorMessage = (dataInfo, message) => ({ dataInfo, message }); //? Function that creates an error message.

        const userFound = await userRepository.findOne({ where: {email} }); //? Finding the user by email.

        if (!userFound) return [null, createErrorMessage({ email }, "The email is incorrect.")]; //? If the user is not found, return null and an error message.

        const isMatch = await comparePassword(password, userFound.password); //? Comparing the password.

        if (!isMatch) return [null, createErrorMessage({ password }, "The password is incorrect.")]; //? If the password is incorrect, return null and an error message.

        console.log("Usuario encontrado en BD:", userFound);

        const payload = { //? Creating the payload. Un payload es un objeto que contiene la información que se va a codificar en el token.
            name: userFound.name,
            email: userFound.email,
            role: userFound.role,
            rut: userFound.rut
        };

        console.log("JWT Payload:", payload);

        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1d" }); //? Creating the access token.

        return [accessToken, null]; //? Returning the access token and null.
    } catch (error) {
        console.error("An error occurred while logging in:", error);
        return [null, "Internal server error."]; //? If an error occurs, return null and a message.
    }
}

export async function registerService(user){
    try {
        const userRepository = AppDataSource.getRepository(User); //? Getting the user repository.
        const { name, rut, email } = user; //? Destructuring the user object.

        const createErrorMessage = (dataInfo, message) => ({ dataInfo, message }); //? Function that creates an error message.

        const existingEmailUser = await userRepository.findOne({ where: {email} }); //? Finding the user by email.

        if (existingEmailUser) return [null, createErrorMessage({ email }, "The email is already in use.")]; //? If the email is already in use, return null and an error message.

        const existingRutUser = await userRepository.findOne({ where: {rut} }); //? Finding the user by rut.

        if (existingRutUser) return [null, createErrorMessage({ rut }, "The rut is already in use.")]; //? If the rut is already in use, return null and an error message.

        const newUser = userRepository.create({ //? Creating the new user.
            name,
            rut,
            email,
            password: await encryptPassword(user.password),
            role: "user"
        });

        await userRepository.save(newUser); //? Saving the new user.

        const { password, ...userData } = newUser; //? Destructuring the user object.

        userData.createAt = formatToLocalTime(userData.createAt); //? Formatting the createdAt date.
        userData.updateAt = formatToLocalTime(userData.updateAt); //? Formatting the updatedAt date.

        return [userData, null]; //? Returning the user data and null.
    } catch (error) {
        console.error("An error occurred while registering the user:", error);
        return [null, "Internal server error."]; //? If an error occurs, return null and a message.
    }
}