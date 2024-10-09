import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import AuthProvider from './components/Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <Home/>
    </BrowserRouter>
    </AuthProvider>
   </React.StrictMode>
);
