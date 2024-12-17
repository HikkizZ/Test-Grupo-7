import { Router } from "express";

import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';

import subjectRoutes from './subject.routes.js';
import cursoRoutes from './curso.routes.js';
import calificacionRoutes from './calificacion.routes.js';

import scheduleRoutes from './schedule.routes.js'; 
import periodRoutes from './period.routes.js';

import Room from './room.routes.js';
import Resource from './resource.routes.js';
import Reservation from './reservation.routes.js';

import foroRoutes from './foro.routes.js'; 
import newsRoutes from "./news.routes.js";
import archivoRoutes from './archivo.routes.js'

const router = Router(); //? Crea una nueva instancia del enrutador de express.

router
    .use('/archivo', archivoRoutes) //!!http://localhost:3000/api/archivo
    .use('/user', userRoutes) //! http://localhost:3000/api/user
    .use('/auth', authRoutes) //! http://localhost:3000/api/auth
    .use('/schedule', scheduleRoutes) //! http://localhost:3000/api/schedule
    .use('/period', periodRoutes)  //! http://localhost:3000/api/period
    .use('/subject', subjectRoutes) //! http://localhost:3000/api/subject
    .use('/curso', cursoRoutes) //! http://localhost:3000/api/curso
    .use('/calificacion', calificacionRoutes) //! http://localhost:3000/api/calificacion
    .use('/room', Room) //! http://localhost:3000/api/room
    .use('/resource', Resource) //! http://localhost:3000/api/resource
    .use('/reservation', Reservation) //! http://localhost:3000/api/reservation
    .use('/foro', foroRoutes)//!!http://localhost:3000/api/foro
    .use('/news', newsRoutes) //!!http://localhost:3000/api/news


// Exportando los enrutadores
export default router;
