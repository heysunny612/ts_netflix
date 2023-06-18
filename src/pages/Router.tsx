import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.tsx';
import Search from './Search.tsx';
import Tv from './Tv.tsx';
import NotFound from './NotFound.tsx';
import App from '../App.tsx';
import Favorite from './Favorite.tsx';
import Modal from '../components/Modal.tsx';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: '/movies/:movieId', element: <Home /> },
        { path: '/tv', element: <Tv /> },
        { path: '/movies', element: <Tv /> },
        { path: '/favorite', element: <Favorite /> },
        { path: '/search/:id', element: <Search /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
