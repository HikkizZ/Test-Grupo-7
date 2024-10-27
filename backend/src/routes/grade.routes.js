import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authentication.middleware.js';
import { verifyRole } from '../middlewares/authorization.middleware.js';

import {
    createGrade
} from '../controllers/grade.controller.js';

const router = Router();

router
    .use(authenticateJWT);

router
    .post('/add', verifyRole('Profesor'), createGrade);

export default router;