import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import WalletConnect from './routes/WalletConnect';

import { WalletSelectorContextProvider } from "./contexts/WalletSelectorContext";
import "@near-wallet-selector/modal-ui/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/connect-wallet',
    element: <WalletConnect />
  }
]);

const theme = createTheme();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <WalletSelectorContextProvider>
        <RouterProvider router={router} />
      </WalletSelectorContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
