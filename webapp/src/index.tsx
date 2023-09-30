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
            <div style={{
                height: "100vh",
                padding: "0.425em",
                boxSizing: "border-box",
                display: 'flex',
                gap: 4,
                flexDirection: "column",
                justifyContent: "flex-start"
            }}>
                <NavBar />
                <div style={{
                    flexGrow: 1,
                    height: "100%",
                }}>
                    <RouterProvider router={router} />
                </div>
            </div>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
