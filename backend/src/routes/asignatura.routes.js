import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authentication.middleware.js';
import { verifyRole } from '../middlewares/authorization.middleware.js';

import {
    createAsignatura,
    getAsignatura,
    getAsignaturas,
    updateAsignatura,
    deleteAsignatura
} from '../controllers/asignatura.controller.js';

const router = Router();

router.use(authenticateJWT);

router
    .get('/', getAsignatura)
    .get('/all', getAsignaturas)
    .post('/', verifyRole('admin'), createAsignatura)
    .patch('/', verifyRole('admin'), updateAsignatura)
    .delete('/', verifyRole('admin'), deleteAsignatura);

export default router;
