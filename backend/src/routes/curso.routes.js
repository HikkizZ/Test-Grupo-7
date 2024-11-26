import { Router } from 'express';

import { authenticateJWT } from '../middlewares/authentication.middleware.js';
import { verifyRole } from '../middlewares/authorization.middleware.js';

import {
    getCurso,
    getCursos,
    createCurso,
    updateCurso,
    deleteCurso
} from '../controllers/curso.controller.js';

const router = Router();

router
    .use(authenticateJWT);

router
    .get('/', verifyRole(['admin', 'profesor', 'administrativo', 'alumno']), getCurso)
    .get('/all', verifyRole(['admin', 'profesor', 'administrativo', 'alumno']), getCursos)
    .post('/', verifyRole(['admin', 'profesor', 'administrativo']), createCurso)
    .put('/', verifyRole(['admin', 'profesor', 'administrativo']), updateCurso)
    .delete('/', verifyRole(['admin', 'profesor', 'administrativo']), deleteCurso);

export default router;