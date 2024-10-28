import { Router } from "express";

// Importing routes
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import gradeRoutes from './grade.routes.js';
import subjectRoutes from './subject.routes.js';

const router = Router(); //? It creates a new instance of the express router.

router
    .use('/user', userRoutes) //! http://localhost:3000/api/user
    .use('/auth', authRoutes) //! http://localhost:3000/api/auth
    .use('/grade', gradeRoutes) //! http://localhost:3000/api/grade
    .use('/subject', subjectRoutes); //! http://localhost:3000/api/subject

// Exporting the routers
export default router;