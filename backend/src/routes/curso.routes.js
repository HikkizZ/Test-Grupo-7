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
    .get('/', getCurso)
    .get('/all', getCursos)
    .post('/', verifyRole('admin'), createCurso)
    .put('/', verifyRole('admin'), updateCurso)
    .delete('/', verifyRole('admin'), deleteCurso);

export default router;