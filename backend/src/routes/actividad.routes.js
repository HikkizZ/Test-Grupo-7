import { Router } from 'express';
import { 
  getActividades, 
  getActividad, 
  crearActividad, 
  modificarActividad, 
  eliminarActividad 
} from '../controllers/actividad.controller.js'; // Asegúrate de que las funciones estén correctamente importadas
import { authenticateJWT } from "../middlewares/authentication.middleware.js"; // Middleware de autenticación

const router = Router();

// Middleware de autenticación JWT para proteger las rutas de abajo
router.use(authenticateJWT);

// Log para verificar si la solicitud llega a este punto
router.use((req, res, next) => {
  console.log('Middleware de autenticación JWT aplicado');
  next();
});

// Ruta para obtener todas las actividades
// http://localhost:3000/api/actividades/
router.get('/all', (req, res, next) => {
  console.log('Solicitud GET recibida en /api/actividades');
  getActividades(req, res, next);  // Obtiene todas las actividades
});

// Ruta para obtener una actividad por su ID
// http://localhost:3000/api/actividades/:id
router.get('/:id', (req, res, next) => {
  console.log('Solicitud GET recibida en /api/actividades/:id');
  console.log('Parámetro de ID:', req.params.id);  // Verifica el ID que se está enviando
  getActividad(req, res, next);  // Obtiene una actividad por ID
});

// Ruta para crear una nueva actividad
// http://localhost:3000/api/actividades
router.post('/', (req, res, next) => {
  console.log('Solicitud POST recibida en /api/actividades');
  console.log('Cuerpo de la solicitud (datos de la actividad):', req.body);  // Verifica los datos enviados
  crearActividad(req, res, next);  // Crea una nueva actividad
});

// Ruta para modificar una actividad existente
// http://localhost:3000/api/actividades/:id
router.put('/:id', (req, res, next) => {
  console.log('Solicitud PUT recibida en /api/actividades/:id');
  console.log('Parámetro de ID:', req.params.id);  // Verifica el ID de la actividad a modificar
  console.log('Cuerpo de la solicitud (datos modificados):', req.body);  // Verifica los datos enviados para modificar
  modificarActividad(req, res, next);  // Modifica una actividad por ID
});

// Ruta para eliminar una actividad por su ID
// http://localhost:3000/api/actividades/:id
router.delete('/:id', (req, res, next) => {
  console.log('Solicitud DELETE recibida en /api/actividades/:id');
  console.log('Parámetro de ID:', req.params.id);  // Verifica el ID de la actividad a eliminar
  eliminarActividad(req, res, next);  // Elimina una actividad por ID
});

export default router;
