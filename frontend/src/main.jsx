import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
// import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';
import Resources from './pages/Resources';
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