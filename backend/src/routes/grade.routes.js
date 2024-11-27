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
    .get('/', verifyRole(['admin', 'profesor', 'estudiante']),getGrade)
    .get('/all', verifyRole(['admin', 'profesor', 'estudiante']),getGrades)
    .post('/', verifyRole(['admin', 'profesor']), createGrade)
    .put('/', verifyRole(['admin', 'profesor']), updateGrade)
    .delete('/', verifyRole(['admin', 'profesor']), deleteGrade);
    
export default router;