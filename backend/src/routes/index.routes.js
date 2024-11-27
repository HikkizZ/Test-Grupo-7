import { Router } from "express";

// Importando rutas
import actividadRoutes from './actividad.routes.js';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
import foroRoutes from './foro.routes.js'; // Importando las rutas de foro (anuncios)

const router = Router(); //? Crea una nueva instancia del enrutador de express.

router
    .use('/actividades', actividadRoutes) // Usamos /actividades directamente
    .use('/user', userRoutes)
    .use('/auth', authRoutes)
    .use('/posts', foroRoutes); // Añadimos la ruta para los anuncios (foro)

// Exportando los enrutadores
export default router;
