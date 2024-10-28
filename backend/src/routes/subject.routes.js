import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authentication.middleware.js';
import { verifyRole } from '../middlewares/authorization.middleware.js';
import {
    createSubject,
    getAllSubjects,
    getSubjectById,
    getSubjectByStudent,
    enrollStudentInSubject,
    assignTeacherToSubject
} from '../controllers/subject.controller.js';

const router = Router();

router
    .use(authenticateJWT);

router
    .post('/add', verifyRole('admin'), createSubject)
    .get('/', getAllSubjects)
    .get('/:id', getSubjectById)
    .get('/student/:studentId', getSubjectByStudent)
    .post("/enroll", verifyRole("admin"), enrollStudentInSubject)
    .post("/assignment", verifyRole("admin"), assignTeacherToSubject);


export default router;