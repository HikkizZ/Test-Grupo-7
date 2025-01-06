"use strict";
import cors from 'cors'; //? Libreria para trabajar con cors, permite que un servidor permita que otros servidores soliciten recursos.
import morgan from 'morgan'; //? Libreria para hacer logs de las peticiones HTTP.
import cookieParser from 'cookie-parser'; //? Libreria para trabajar con cookies.
import express, { json, urlencoded } from 'express'; //? Libreria para trabajar con express.
import passport from 'passport'; //? Libreria para trabajar con la autenticación de usuarios.
import session from 'express-session'; //? Libreria para trabajar con sesiones.
import indexRoutes from './src/routes/index.routes.js'; //? Rutas de la API.
import { connectDB } from './src/config/configDB.js'; //? Función para conectar a la base de datos.
import { cookieKey, PORT, HOST } from './src/config/configEnv.js'; //? Variables de entorno.
import { passportJWTSetup } from './src/auth/passport.auth.js'; //? Configuración de la autenticación de usuarios.
import { createUsers } from './src/utils/initialSetup.js'; //? Función para crear usuarios.
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupServer() { //* Función para configurar el servidor.
    try {
        const app = express(); //* Crear una instancia de la aplicación express.

        app.disable('x-powered-by'); //* Deshabilitar la cabecera X-Powered-By.

        app.use( //* Usar cors. Permitir que cualquier origen acceda a la API.
            cors({
                origin: true,
                credentials: true,
            })
        );

        app.use( //* Usar urlencoded. Parsear las peticiones con el tipo de contenido application/x-www-form-urlencoded.
            urlencoded({
                extended: true,
                limit: '1mb',
            })
        );

        app.use( //* Usar json. Parsear las peticiones con el tipo de contenido application/json.
            json({
                limit: '1mb',
            })
        );

        app.use( //* Usar cookieParser. Parsear las cookies.
            cookieParser()
        );

        app.use( //* Usar morgan. Hacer logs de las peticiones HTTP.
            morgan('dev')
        );

        //si no existiera la carpeta upload, la creamos.
        const uploadDir = path.join(__dirname, 'src', 'upload');
        fs.mkdirSync(uploadDir, { recursive: true }); 

        // Configurar la ruta estática para servir archivos subidos.
        app.use('/src/upload', express.static(uploadDir));

        app.use( //* Usar session. Configurar las sesiones.
            session({
                secret: cookieKey, //* Clave secreta para firmar las cookies.
                resave: false, //* No guardar la sesión si no hay cambios.
                saveUninitialized: false, //* No guardar la sesión si no se ha inicializado.
                cookie: {
                    secure: false, //* No usar cookies seguras.
                    httpOnly: true, //* No permitir el acceso a las cookies desde el cliente.
                    sameSite: 'strict', //* No permitir que las cookies se envíen en solicitudes de otros sitios.
                }
            })
        );

        app.use( //* Usar passport. Inicializar la autenticación de usuarios.
            passport.initialize()
        );

        app.use( //* Usar passport. Configurar la autenticación de usuarios.
            passport.session()
        );

        passportJWTSetup(); //* Configurar la autenticación de usuarios.

        app.use('/api/', indexRoutes); //* Usar las rutas de la API.
        app.use('/src/upload', express.static(uploadDir));

        app.listen(PORT, () => { //* Escuchar en el puerto especificado.
            console.log(`Server running on: http://${HOST}:${PORT}/api`);
        });
    } catch (error) {
        console.log("Error starting the server -> setupServer(). Error: ", error);        
    }
};

async function setupAPI() { //* Función para configurar la API.
    try {
        await connectDB(); //* Conectar a la base de datos.
        await setupServer(); //* Configurar el servidor.
        await createUsers(); //* Crear los usuarios.
    } catch (error) {
        console.log("Error starting the API -> setupAPI(). Error: ", error);
    }
};

setupAPI()
    .then(() => console.log("=> API started successfully"))
    .catch((error) => console.log("Error starting the API: ", error));
