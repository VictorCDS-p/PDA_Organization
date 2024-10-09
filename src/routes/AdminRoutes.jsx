import React from 'react';
import { Route } from 'react-router-dom';
import Manage from '../pages/Manage';
import EditAccount from '../pages/EditAccount';
import Projects from '../pages/Projects';

const AdminRoutes = [
  <Route key="manage" path="/manage" element={<Manage />} />,
  <Route key="admin-projects" path="/projects" element={<Projects />} />,
  <Route key="edit-account" path="/edit-account" element={<EditAccount />} />
];

export default AdminRoutes;
