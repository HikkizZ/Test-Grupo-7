import { Router } from "express";

// Importing routes
import actividadRoutes from './actividad.routes.js';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';

const router = Router(); //? It creates a new instance of the express router.

router
    .use('/actividad', actividadRoutes)
    .use('/user', userRoutes) //! http://localhost:3000/api/user
    .use('/auth', authRoutes); //! http://localhost:3000/api/auth

// Exporting the routers
export default router;