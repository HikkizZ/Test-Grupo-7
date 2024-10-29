import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authentication.middleware.js';
import { verifyRole } from '../middlewares/authorization.middleware.js';

import {
    createGrade,
    getGrade,
    getGrades,
    updateGrade,
    deleteGrade
} from '../controllers/grade.controller.js';

const router = Router();

router
    .use(authenticateJWT);

router
    .get('/', getGrade)
    .get('/all', getGrades)
    .post('/', verifyRole('admin'), createGrade)
    .put('/', verifyRole('admin'), updateGrade)
    .delete('/', verifyRole('admin'), deleteGrade);
    
export default router;