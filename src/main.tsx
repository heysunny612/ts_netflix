import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './Routes.tsx';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme.ts';
import { GlobalStyles } from './styles/GlobalStyles.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Search from './pages/Search.tsx';
import Tv from './pages/Tv.tsx';
import NotFound from './pages/NotFound.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Routes />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: '/tv', element: <Tv /> },
      { path: '/search/:id', element: <Search /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
