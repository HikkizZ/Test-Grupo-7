import { Router } from "express";
import { 
  getActividades, 
  getActividad, 
  crearActividad, 
  modificarActividad, 
  eliminarActividad 
} from '../controllers/actividad.controller.js';
import { authenticateJWT } from "../middlewares/authentication.middleware.js";

const router = Router();

router.use(authenticateJWT);

// Rutas
router.get('/', getActividades);
router.get('/:id', getActividad);
router.post('/', crearActividad);
router.put('/:id', modificarActividad);
router.delete('/:id', eliminarActividad);

export default router;