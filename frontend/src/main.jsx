import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import Resources from './pages/Resources';
import Schedule from '@pages/Schedule';
//import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';
//import Hallam
import Foro from '@pages/foro/Foro';
import News from '@pages/News';
import NewsId from '@pages/News.id'
//? Import services Felipe
import Cursos from './pages/Cursos';
import Subjects from './pages/Subjects';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error404 />,
    children: [
      {
        path: '/home',
        element: <News/>
      },
      {
        path: '/home/news/:id', //Ruta para las Noticias por Id
        element: <NewsId />
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
        path: '/cursos',
        element: <Cursos/>
      },
      {
        path: 'subjects',
        element: <Subjects/>
      },
      //foro paginas
      {
        path: '/posts',
        element: <Foro/>,
      },
      {
        path: '/post/:id',
        element: <foroDetail/>,
      },
      
      
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