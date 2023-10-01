import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import globalTheme from './theme';
import NavBar from './components/NavBar/NavBar';

import { ThemeProvider } from '@mui/material/styles';
import MarketplacePage from './components/MarketplacePage/MarketplacePage';
import ProductsPage from './components/ProductsPage/ProductsPage';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import { Route, BrowserRouter, Routes } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Define your routes
const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/events",
        element: <MarketplacePage />,
    },
    {
        path: "/market",
        element: <ProductsPage />
    }
];

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <ThemeProvider theme={globalTheme}>
                <BrowserRouter>
                    <div style={{
                        height: "93.2vh",
                        padding: "0.625em",
                        boxSizing: "border-box",
                        display: 'flex',
                        overflow: "visible",
                        gap: 10,
                        flexDirection: "column",
                        justifyContent: "flex-start"
                    }}>
                        <NavBar />
                        <div style={{
                            flexGrow: 1,
                            height: "100%",
                            overflow: "visible",
                        }}>
                            <Routes>
                                {routes.map((route) => (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={route.element}
                                    />
                                ))}
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </LocalizationProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
