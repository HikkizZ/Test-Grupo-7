import { Router } from 'express';

import { authenticateJWT } from '../middlewares/authentication.middleware.js';
import { verifyRole } from '../middlewares/authorization.middleware.js';

import {
    getAllClassrooms,
    getClassroomById,
    createClassroom,
    updateClassroom,
    deleteClassroom
} from '../controllers/classroom.controller.js';

const router = Router();

router
    .use(authenticateJWT); 

router
        .get('/all', getAllClassrooms)
        .get('/:id', getClassroomById)
        .post('/', verifyRole('admin'), createClassroom)
        .put('/:id', verifyRole('admin'), updateClassroom)
        .delete('/:id', verifyRole('admin'), deleteClassroom);

export default router;
