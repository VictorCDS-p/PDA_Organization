import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/home';
import AuthPage from '../pages/AuthPage';
import NotFound from '../pages/NotFound';
import SuccessStudent from '../pages/Success/student';
import SuccessAdmin from '../pages/Success/admin'


const DefaultRoutes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="auth" path="/auth" element={<AuthPage />} />,
  <Route key="notfound" path="*" element={<NotFound />} />,
  <Route key="success" path="/succestudent" element={<SuccessStudent />} />,
  <Route key="success" path="/succesadmin" element={<SuccessAdmin />} />,


];

export default DefaultRoutes;
