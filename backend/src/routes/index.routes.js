import { Router } from "express";

// Importing routes
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import Room from './room.routes.js';
import Reservation from './reservation.routes.js';
import Resource from './resource.routes.js';

const router = Router(); //? It creates a new instance of the express router.

router
    .use('/user', userRoutes) //! http://localhost:3000/api/user
    .use('/auth', authRoutes) //! http://localhost:3000/api/auth
    .use('/room', Room) //! http://localhost:3000/api/room
    .use('/reservation', Reservation) //! http://localhost:3000/api/reservation
    .use('/resource', Resource); //! http://localhost:3000/api/resource

// Exporting the routers
export default router;
