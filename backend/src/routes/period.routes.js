import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authentication.middleware.js';
import {  verifyRole } from '../middlewares/authorization.middleware.js';
import { 
        getAllPeriods, 
        getPeriodById, 
        createPeriod, 
        updatePeriod, 
        deletePeriod} 
from '../controllers/period.controller.js';

const router = Router();
router
        .use(authenticateJWT);
router
        .get('/', getAllPeriods)
        .get('/:id', getPeriodById)           
        .post('/create', verifyRole('admin'),createPeriod)       
        .put('/update/:id', verifyRole('admin'),updatePeriod)    
        .delete('/delete/:id', verifyRole('admin'),deletePeriod);

export default router;