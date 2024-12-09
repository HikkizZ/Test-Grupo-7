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
//import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';
//import Hallam
import Foro from '@pages/Foro';
//? Import services Felipe
import Cursos from './pages/Cursos';
import Subjects from './pages/Subjects';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error404/>,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/users',
        element: (
          <Users/>
        // <ProtectedRoute allowedRoles={['administrador']}>
        //   <Users />
        // </ProtectedRoute>
        ),
    },
    {
      path: '/schedule',
      element: <Schedule /> 
    },
    {
        path: '/resources',
        element: <Resources/>
      },
      {
        path: '/rooms',
        element: <Rooms/>
      },
      {
        path: '/reservations',
        element: <Reservations/>
      },
      {
        path: '/cursos',
        element: <Cursos/>
      },
      {
        path: 'subjects',
        element: <Subjects/>
      },
      {
        path: '/posts',
        element: <Foro/>,
      }
    ]
  },
  {
    path: '/auth',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)