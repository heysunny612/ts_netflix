import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme.ts';
import { GlobalStyles } from './styles/GlobalStyles.ts';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './pages/Router.tsx';
import './styles/slide.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
