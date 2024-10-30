"use strict";
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import express, { json, urlencoded } from 'express';
import passport from 'passport';
import session from 'express-session';
import indexRoutes from './src/routes/index.routes.js';
import { connectDB } from './src/config/configDB.js';
import { cookieKey, PORT, HOST } from './src/config/configEnv.js';
import { passportJWTSetup } from './src/auth/passport.auth.js';
import { createUsers } from './src/utils/initialSetup.js';
import actividadRoutes from './src/routes/actividad.routes.js';



async function setupServer() {
  try {
    const app = express();

    app.disable('x-powered-by');

    app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );

    app.use(
      urlencoded({
        extended: true,
        limit: '1mb',
      })
    );

    app.use(
      json({
        limit: '1mb',
      })
    );

    app.use(cookieParser());

    app.use(morgan('dev'));

    app.use(
      session({
        secret: cookieKey,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false,
          httpOnly: true,
          sameSite: 'strict',
        }
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passportJWTSetup();

    app.use('/api/', indexRoutes);

    // Ruta para probar las funciones del servicio
    app.get('/test-actividades', async (req, res) => {
      try {
        // Cambio: Usar la función obtenerActividades directamente
        const actividades = await obtenerActividades(1); 
        res.json(actividades);
      } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las actividades' });
      }
    });

    // Monta el enrutador de actividades
    app.use('/api/actividad', actividadRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on: http://${HOST}:${PORT}/api`);
    });
  } catch (error) {
    console.log("Error starting the server -> setupServer(). Error: ", error);
  }
};

async function setupAPI() {
  try {
    await connectDB();
    await setupServer();
    await createUsers();
  } catch (error) {
    console.log("Error starting the API -> setupAPI(). Error: ", error);
  }
};

setupAPI()
  .then(() => console.log("=> API started successfully"))
  .catch((error) => console.log("Error starting the API: ", error));