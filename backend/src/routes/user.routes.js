import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJWT } from "../middlewares/authentication.middleware.js";

// Importing the functions from the user controller.
import {
    getUsers,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';

const router = Router(); //? It creates a new instance of the express router.

router
    .use(authenticateJWT) //? It authenticates the user using JWT.
    .use(isAdmin); //? It checks if the user is an admin.

router
    //! http://localhost:3000/api/user/
    .get('/', getUsers) //? It gets all the users. - Method: HTTP GET
    //! http://localhost:3000/api/user/detail/
    .get('/detail/', getUser) //? It gets a user. - Method: HTTP GET
    //! http://localhost:3000/api/user/detail/
    .patch('/detail/', updateUser) //? It updates a user. - Method: HTTP PATCH
    //! http://localhost:3000/api/user/detail/
    .delete('/detail/', deleteUser); //? It deletes a user. - Method: HTTP DELETE

// Exporting the routers.
export default router;