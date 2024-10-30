import { Router } from 'express';
import { getAllPeriods, getPeriodById, createPeriod, updatePeriod, deletePeriod} from '../controllers/period.controller.js';

const router = Router();

router
    .get('/', getAllPeriods) //! http://localhost:3000/api/period/
    .get('/:id', getPeriodById) //! http://localhost:3000/api/period/:id
    .post('/create', createPeriod) //! http://localhost:3000/api/period/create
    .put('/update/:id', updatePeriod) //! http://localhost:3000/api/period/update/:id
    .delete('/delete/:id', deletePeriod); //! http://localhost:3000/api/period/delete/:id

export default router;