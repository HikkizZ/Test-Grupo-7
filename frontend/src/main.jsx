import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import Resources from './pages/Resources';
import Rooms from '@pages/Rooms';
import Reservations from '@pages/Reservations';
import Schedule from '@pages/Schedule';
import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';
import Foro from '@pages/Foro';

import Cursos from '@pages/Cursos';
import Subjects from './pages/Subjects';

// Configuración de rutas con ProtectedRoute
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      // Ruta de Home: Todos pueden acceder
      {
        path: '/home',
        element: <Home />
      },
      // Rutas protegidas solo para admin
      {
        path: '/users',
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <Users />
          </ProtectedRoute>
        ),
      },
      // Ruta de Schedule: acceso libre
      {
        path: '/schedule',
        element: <Schedule />
      },
      // Recursos: Encargados y admin pueden ver y modificar
      {
        path: '/resources',
        element: (
          <ProtectedRoute allowedRoles={['Encargado', 'admin']}>
            <Resources />
          </ProtectedRoute>
        ),
      },
      // Recursos (solo lectura para profesores y alumnos)
      {
        path: '/resources/view',
        element: (
          <ProtectedRoute allowedRoles={['Profesor', 'Alumno']}>
            <Resources />
          </ProtectedRoute>
        ),
      },
      // Salas: Encargados y admin pueden ver y modificar
      {
        path: '/rooms',
        element: (
          <ProtectedRoute allowedRoles={['Encargado', 'admin']}>
            <Rooms />
          </ProtectedRoute>
        ),
      },
      // Salas (solo lectura para profesores y alumnos)
      {
        path: '/rooms/view',
        element: (
          <ProtectedRoute allowedRoles={['Profesor', 'Alumno']}>
            <Rooms />
          </ProtectedRoute>
        ),
      },
      // Reservaciones: Acceso para encargado y admin (CRUD)
      {
        path: '/reservations',
        element: (
          <ProtectedRoute allowedRoles={['Encargado', 'admin']}>
            <Reservations />
          </ProtectedRoute>
        ),
      },
      // Reservaciones (Profesores y alumnos solo creación y lectura)
      {
        path: '/reservations/my',
        element: (
          <ProtectedRoute allowedRoles={['Profesor', 'Alumno']}>
            <Reservations />
          </ProtectedRoute>
        ),
      },
      // Otras rutas
      {
        path: '/cursos',
        element: <Cursos />
      },
      {
        path: '/subjects',
        element: <Subjects />
      },
      {
        path: '/posts',
        element: <Foro />,
      }
    ]
  },
  {
    path: '/auth',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

// Renderización de la aplicación con RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);