import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authentication.middleware.js';
import { verifyRole } from '../middlewares/authorization.middleware.js';

import {
    createGrade,
    getGradesByStudent
} from '../controllers/grade.controller.js';

const router = Router();

router
    .use(authenticateJWT);

router
    .post('/add', verifyRole('Profesor'), createGrade)
    .get('/student/:studentId/subject/:subjectId', getGradesByStudent);

export default router;