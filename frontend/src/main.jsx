import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import Resources from './pages/Resources';
import Horario from '@pages/Horario';
import Period from '@pages/Period';
import Rooms from '@pages/Rooms';
import Reservations from '@pages/Reservations';


//import ProtectedRoute from '@components/ProtectedRoute';
//import '@styles/styles.css';
//import Hallam
import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';
//import Hallam
import Foro from '@pages/foro/Foro';
import News from '@pages/News';
import NewsId from '@pages/News.id'
import ForoDetail from './pages/foro/ForoId';

import Cursos from '@pages/Cursos';
import Subjects from './pages/Subjects';
import Calificar from './pages/Calificar';

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
        element: <News />
      },
      {
        path: '/home/news/:id', //Ruta para las Noticias por Id
        element: <NewsId />
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
      {
        path: '/horario',
        element: <Horario />
      },
      {
        path: '/period',
        element: <Period />
      },
      {

      },

      // Recursos: Encargados y admin pueden ver, crear y modificar (sólo admin puede eliminar sala)
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
      // Salas: Encargados y admin pueden ver y modificar (sólo admin puede crear y eliminar sala)
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
      // Reservaciones: Acceso para admin (CRUD) y Encargado (RU)
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
      //foro paginas
      {
        path: '/foro',
        element: <Foro />,
      },
      {
        path: '/foro/:id',
        element: <ForoDetail />,
      },

      {
        path: '/calificar',
        element: <Calificar />
      },
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