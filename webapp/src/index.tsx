import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import globalTheme from './theme';
import NavBar from './components/NavBar/NavBar';

import { ThemeProvider } from '@mui/material/styles';
import MarketplacePage from './components/MarketplacePage/MarketplacePage';
import { AppContext, AppContextProps, emptyAppContext } from './context';
import ProductsPage from './components/ProductsPage/ProductsPage';
import { getMarketList } from './utils/BackendCalls';
import { MarketProps } from './utils/types';
import { Router, Route, Link, BrowserRouter, Routes } from "react-router-dom";

// Define your routes
const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/market",
    element: <MarketplacePage />,
  },
  {
    path: "/products",
    element: <ProductsPage />
  }
];

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={globalTheme}>
            <BrowserRouter>
                <div style={{
                    height: "93.2vh",
                    padding: "0.625em",
                    boxSizing: "border-box",
                    display: 'flex',
                    overflow: "visible",
                    gap: 4,
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
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
