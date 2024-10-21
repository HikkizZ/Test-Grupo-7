"use strict";
import {
    getUserService,
    getUsersService,
    updateUserService,
    deleteUserService,
} from "../services/user.service.js";
import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";
import {
    userBodyValidation,
    userQueryValidation
} from "../validations/user.validation.js";

//? This function is used to get a user by its id, rut, or email from the database.
export async function getUser(req, res) {
    try {
        const { rut, id, email } = req.query; // Get the query parameters.

        const { error } = userQueryValidation.validate({ rut, id, email }); // Validate the query parameters.

        if (error) return handleErrorClient(res, 400, error.message); // If there is an error, return a message.

        const [user, errorUser] = await getUserService({ rut, id, email }); // Get the user by parameters.

        if (errorUser) return handleErrorServer(res, 404, errorUser); // If there is an error, return a message.

        handleSuccess(res, 200, "User found seccessfully", user); // Return the user.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message); // Return an error message.
    }
}

//? This function is used to get all the users from the database.
export async function getUsers(req, res) {
    try {
        const [users, errorUsers] = await getUsersService(); // Get all the users from the database.

        if (errorUsers) return handleErrorServer(res, 404, errorUsers); // If there is an error, return a message.

        users.length === 0
            ? handleErrorClient(res, 404, "Users not found.")
            : handleSuccess(res, 200, "Users found successfully", users); // Return the users.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message); // Return an error message.
    }
};

//? This function is used to update a user by its id in the database.
export async function updateUser(req, res) {
    try {
        const { id, rut, email } = req.query; // Get the query parameters.
        const { body } = req; // Get the body parameters.

        const { error: queryError } = userQueryValidation.validate({ id, rut, email }); // Validate the query parameters.

        if (queryError) return handleErrorClient(res, 400, queryError.message); // If there is an error, return a message.

        const { error: bodyError } = userBodyValidation.validate(body); // Validate the body parameters.

        if (bodyError) return handleErrorClient(res, 400, bodyError.message); // If there is an error, return a message.

        const [user, errorUser] = await updateUserService({ id, rut, email }, body); // Update the user by its id.

        if (errorUser) return handleErrorServer(res, 400, errorUser); // If there is an error, return a message.

        handleSuccess(res, 200, "User updated successfully", user); // Return the user.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message); // Return an error message.
    }
};

//? This function is used to delete a user by its id from the database.
export async function deleteUser(req, res) {
    try {
        const { rut, id, email } = req.query; // Get the query parameters.

        const { error: queryError } = userQueryValidation.validate({ rut, id, email }); // Validate the query parameters.

        if (queryError) return handleErrorClient(res, 400, queryError.message); // If there is an error, return a message.

        const [userDeleted, errorUserDeleted] = await deleteUserService({ rut, id, email }); // Delete the user by its id.

        if (errorUserDeleted) return handleErrorServer(res, 404, errorUserDeleted); // If there is an error, return a message.

        handleSuccess(res, 200, "User deleted successfully", userDeleted); // Return the user.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message); // Return an error message.
    }
};