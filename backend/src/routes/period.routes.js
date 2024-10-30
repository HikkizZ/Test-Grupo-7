import { Router } from 'express';
import { getAllPeriods, getPeriodById, createPeriod, updatePeriod, deletePeriod} from '../controllers/period.controller.js';

const router = Router();

// Ruta para obtener todos los periodos
router.get('/', getAllPeriods); //! http://localhost:3000/api/period/

// Ruta para obtener un periodo por su ID
router.get('/:id', getPeriodById); //! http://localhost:3000/api/period/:id

// Ruta para crear un nuevo periodo
router.post('/create', createPeriod); //! http://localhost:3000/api/period/create

// Ruta para actualizar un periodo existente
router.put('/update/:id', updatePeriod); //! http://localhost:3000/api/period/update/:id

// Ruta para eliminar un periodo
router.delete('/delete/:id', deletePeriod); //! http://localhost:3000/api/period/delete/:id

export default router;