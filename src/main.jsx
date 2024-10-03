import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContext from './components/LoginRegisterComponent/AuthContext';
import Login from './components/LoginRegisterComponent/Login';
import Registration from './components/LoginRegisterComponent/Registration';
import DashboardAluno from './components/LoginRegisterComponent/DashboardAluno';
import DashboardFuncionario from './components/LoginRegisterComponent/DashboardFuncionario';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard-aluno" element={<DashboardAluno />} />
          <Route path="/dashboard-funcionario" element={<DashboardFuncionario />} />
        </Routes>
      </Router>
    </AuthContext>
  </React.StrictMode>
);
