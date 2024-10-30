import { Router } from "express";

// Importing routes
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import scheduleRoutes from './schedule.routes.js'; 
import periodRoutes from './period.routes.js';

const router = Router(); //? It creates a new instance of the express router.

router
    .use('/user', userRoutes) //! http://localhost:3000/api/user
    .use('/auth', authRoutes) //! http://localhost:3000/api/auth
    .use('/schedule', scheduleRoutes) //! http://localhost:3000/api/schedule
    .use('/period', periodRoutes);  //! http://localhost:3000/api/period

export default router;