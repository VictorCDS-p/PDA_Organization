import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/home';
import AuthPage from '../pages/AuthPage';
import NotFound from '../pages/NotFound';
import Success from '../pages/Success';


const DefaultRoutes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="auth" path="/auth" element={<AuthPage />} />,
  <Route key="notfound" path="*" element={<NotFound />} />,
  <Route key="success" path="/success" element={<Success />} />,

];

export default DefaultRoutes;
