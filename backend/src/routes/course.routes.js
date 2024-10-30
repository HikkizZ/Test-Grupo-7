import { Router } from 'express';

import { authenticateJWT } from '../middlewares/authentication.middleware.js';
import { verifyRole } from '../middlewares/authorization.middleware.js';

import {
    getCourse,
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
} from '../controllers/course.controller.js';

const router = Router();

router
    .use(authenticateJWT);

router
    .get('/', getCourse)
    .get('/all', getCourses)
    .post('/', verifyRole('admin'), createCourse)
    .put('/', verifyRole('admin'), updateCourse)
    .delete('/', verifyRole('admin'), deleteCourse);

export default router;