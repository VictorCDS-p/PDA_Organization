import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import AuthProvider from './components/Context/AuthContext';
import Header from './components/header';
import DefaultRoutes from './routes/DefaultRoutes';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';


import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    {...DefaultRoutes}
                    {...AdminRoutes}
                    {...UserRoutes}
                </Routes>
            </Router>
        </AuthProvider>
    </React.StrictMode>
)
