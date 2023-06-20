import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.tsx';
import Search from './Search.tsx';
import Tv from './Tv.tsx';
import NotFound from './NotFound.tsx';
import App from '../App.tsx';
import Intro from './Intro.tsx';

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Intro /> },
        { path: '/main', element: <Home /> },
        { path: '/main/:category/:movieId', element: <Home /> },
        { path: '/tv', element: <Tv /> },
        { path: '/tv/:category/:movieId', element: <Tv /> },
        { path: '/search', element: <Search /> },
        { path: '/search/:movieId', element: <Search /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
