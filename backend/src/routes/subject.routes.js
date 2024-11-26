import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authentication.middleware.js';
import { verifyRole } from '../middlewares/authorization.middleware.js';
import {
    createSubject,
    getSubject,
    getSubjects,
    updateSubject,
    deleteSubject
} from '../controllers/subject.controller.js';

const router = Router();

router
    .use(authenticateJWT);

router
    .get('/', verifyRole(['admin', 'profesor', 'alumno']),getSubject)
    .get('/all', verifyRole(['admin', 'profesor', 'alumno']), getSubjects)
    .post('/', verifyRole(['admin', 'profesor']), createSubject)
    .patch('/', verifyRole(['admin', 'profesor']), updateSubject)
    .delete('/', verifyRole(['admin', 'profesor']), deleteSubject);

export default router;