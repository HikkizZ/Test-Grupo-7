import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authentication.middleware.js';
import { isAdmin, verifyRole } from '../middlewares/authorization.middleware.js';

import {
    getAllSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule
} from '../controllers/schedule.controller.js';

const router = Router();

router.use(authenticateJWT);
router.use(isAdmin);


router
        .get('/', getAllSchedules)
        .get('/:id', getScheduleById)           
        .post('/create', verifyRole('admin'),createSchedule)       
        .put('/update/:id', verifyRole('admin'),updateSchedule)    
        .delete('/delete/:id', verifyRole('admin'),deleteSchedule) 

export default router;
