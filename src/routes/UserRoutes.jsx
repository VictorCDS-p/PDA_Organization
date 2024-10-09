import React from 'react';
import { Route } from 'react-router-dom';
import Projects from '../pages/Projects';
import EditAccount from '../pages/EditAccount';

const UserRoutes = [
  <Route key="user-projects" path="/projects" element={<Projects />} />,
  <Route key="user-edit-account" path="/edit-account" element={<EditAccount />} />
];

export default UserRoutes;
