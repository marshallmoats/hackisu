import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import globalTheme from './theme';
import NavBar from './components/NavBar/NavBar';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import MarketplacePage from './components/MarketplacePage/MarketplacePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/market",
    element: <MarketplacePage />,
  }
]);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={globalTheme}>
      <div style={{ padding: "0.5em" }}>
        <NavBar />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
