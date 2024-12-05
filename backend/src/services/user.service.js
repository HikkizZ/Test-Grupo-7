/*
Los services son los encargados de realizar las operaciones de la base de datos. En este caso,
el servicio de usuario se encarga de realizar las operaciones CRUD (Create, Read, Update, Delete) de
los usuarios en la base de datos.
*/

"use strict";
import User from "../models/user.model.js";
import { AppDataSource } from "../config/configDB.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";
import { formatToLocalTime } from '../utils/formatDate.js'

export async function getUserService(query){
    try {
        const { id, rut, email } = query; //? Destructuring the query object.

        const userRepository = AppDataSource.getRepository(User); //? Getting the user repository.

        const userFound = await userRepository.findOne({ //? Finding the user by id, rut, and email.
            where: [
                { id: id },
                { rut: rut },
                { email: email }
            ]
        });

        if (!userFound) return [null, "User not found."]; //? If the user is not found, return null and a message.

        const { password, ...userData } = userFound; //? Destructuring the user object.

        // Formatear las fechas
        if (userData.createAt) userData.createAt = formatToLocalTime(userData.createAt); //? Formating the createAt date.
        if (userData.updateAt) userData.updateAt = formatToLocalTime(userData.updateAt); //? Formating the updateAt date.

        return [userData, null]; //? Returning the user data and null.
    } catch (error) {
        console.error("An error occurred while getting the user:", error);
        return [null, "Internal server error."]; //? If an error occurs, return null and a message.
    }
}

export async function getUsersService(){
    try {
        const userRepository = AppDataSource.getRepository(User); //? Getting the user repository.

        const users = await userRepository.find(); //? Finding all the users.

        if (!users || users.length === 0) return [null, "Users not found."]; //? If the users are not found, return null and a message.
        
        const usersData = users.map(({ password, ...user }) => {                  //? Destructuring the user object.
            if (user.createAt) user.createAt = formatToLocalTime(user.createAt);  //? Formating the createAt date.
            if (user.updateAt) user.updateAt = formatToLocalTime(user.updateAt);  //? Formating the updateAt date.
            return user;
        });

        return [usersData, null]; //? Returning the users data and null.
    } catch (error) {
        console.error("An error occurred while getting the users:", error);
        return [null, "Internal server error."]; //? If an error occurs, return null and a message.
    }
}

export async function updateUserService(query, body){
    try {
        const { id, rut, email } = query; //? Destructuring the query object.

        const userRepository = AppDataSource.getRepository(User); //? Getting the user repository.

        const userFound = await userRepository.findOne({ //? Finding the user by id, rut, and email.
            where: [
                { id: id },
                { rut: rut },
                { email: email }
            ]
        });

        if (!userFound) return [null, "User not found."]; //? If the user is not found, return null and a message.

        const existingUser = await userRepository.findOne({ //? Finding the user by rut and email.
            where: [
                { rut: body.rut },
                { email: body.email }
            ]
        });

        if (existingUser && existingUser.id !== userFound.id) return [null, "User already exists."]; //? If the user already exists, return null and a message.

        const matchPassword = await comparePassword( //? Comparing the password.
            body.password,
            userFound.password
        );

        if (!matchPassword) return [null, "Incorrect password."]; //? If the password is incorrect, return null and a message.

        const updateParams = id ? { id } : rut ? { rut } : { email }; //? Updating the user by id, rut, and email.

        await userRepository.update(updateParams, { //? Updating the user.
            name: body.name,
            rut: body.rut,
            email: body.email,
            role: body.role,
            password: await encryptPassword(body.newpassword || body.password), //? Encrypting the password.
            updateAt: new Date()
        });

        const userData = await userRepository.findOne({ //? Finding the user by id, rut, and email.
            where: [updateParams],
        });

        const { password, ...userUpdated } = userData; //? Destructuring the updated user object.

        // Formatear las fechas
        if (userUpdated.createAt) userUpdated.createAt = formatToLocalTime(userUpdated.createAt); //? Formating the createAt date.
        if (userUpdated.updateAt) userUpdated.updateAt = formatToLocalTime(userUpdated.updateAt); //? Formating the updateAt date.

        return [userUpdated, null]; //? Returning the updated user data and null.
    } catch (error) {
        console.error("An error occurred while updating the user:", error);
        return [null, "Internal server error."]; //? If an error occurs, return null and a message.
    }
}

export async function deleteUserService(query){
    try {
        const { id, rut, email } = query; //? Destructuring the query object.

        const userRepository = AppDataSource.getRepository(User); //? Getting the user repository.

        const userFound = await userRepository.findOne({ //? Finding the user by id, rut, and email.
            where: [
                { id: id },
                { rut: rut },
                { email: email }
            ]
        });

        if (!userFound) return [null, "User not found."]; //? If the user is not found, return null and a message.

        if (userFound.role === "admin") return [null, "You can't delete an admin."]; //? If the user is an admin, return null and a message.

        const userDeleted = await userRepository.remove(userFound); //? Removing the user.

        const { password, ...userData } = userDeleted; //? Destructuring the user object.

        // Formatear las fechas
        if (userData.createAt) userData.createAt = formatToLocalTime(userData.createAt); //? Formating the createAt date.
        if (userData.updateAt) userData.updateAt = formatToLocalTime(userData.updateAt); //? Formating the updateAt date.
        
        return [userData, null]; //? Returning null and null.
    } catch (error) {
        console.error("An error occurred while deleting the user:", error);
        return [null, "Internal server error."]; //? If an error occurs, return null and a message.
    }
}