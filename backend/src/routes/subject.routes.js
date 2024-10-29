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
    .get('/', getSubject)
    .get('/all', getSubjects)
    .post('/', verifyRole('admin'), createSubject)
    .patch('/', verifyRole('admin'), updateSubject)
    .delete('/', verifyRole('admin'), deleteSubject);

export default router;