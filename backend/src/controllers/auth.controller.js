"use strict";
import {
    loginService,
    registerService
} from "../services/auth.service.js";
import {
    handleSuccess,
    handleErrorClient,
    handleErrorServer
} from "../handlers/responseHandlers.js";
import {
    authValidation,
    registerValidation
} from "../validations/auth.validation.js";

export async function login(req, res) { //? This function is used to login the user.
    try {
        const { body } = req; // Get the body parameters.

        const { error } = authValidation.validate(body); // Validate the body parameters.

        if (error) return handleErrorClient(res, 400, error.message); // If there is an error, return a message.

        const [accessToken, errorToken] = await loginService(body); // Login the user.

        if (errorToken) return handleErrorServer(res, 404, errorToken, {}); // If there is an error, return a message.

        res.cookie("jwt", accessToken, { 
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day cookie. -> 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
        }); // Set the cookie.

        handleSuccess(res, 200, "User logged in successfully", { token: accessToken }); // Return the access token.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message); // Return an error message.
    }
};

export async function register(req, res) { //? This function is used to register the user.
    try {
        const { body } = req; // Get the body parameters.

        const { error } = registerValidation.validate(body); // Validate the body parameters.

        if (error) return handleErrorClient(res, 400, error.message); // If there is an error, return a message.

        const [newUser, errorNewUser] = await registerService(body); // Register the user.

        if (errorNewUser) return handleErrorServer(res, 404, errorNewUser); // If there is an error, return a message.

        handleSuccess(res, 201, "User registered successfully", newUser); // Return the new user.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message); // Return an error message.
    }
};

export async function logout(req, res) { //? This function is used to logout the user.
    try {
        res.clearCookie("jwt", { httpOnly: true }); // Clear the cookie.

        handleSuccess(res, 200, "User logged out successfully", {}); // Return a message.
    } catch (error) {
        handleErrorServer(res, 500, "Internal server error.", error.message); // Return an error message.
    }
};