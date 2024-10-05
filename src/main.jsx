import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContext from './components/Context/AuthContext';
import Home from './pages/home';
import Header from './components/header';
import AuthPage from './pages/AuthPage';  
import EditAccount from './pages/EditAccount';
import Manage from './pages/Manage';
import Projects from './pages/Projects';
import Success from './pages/Success';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/auth" element={<AuthPage />} /> 
          <Route path="/edit-account" element={<EditAccount />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </AuthContext>
  </React.StrictMode>
);
