import api from './api';

export const readAllProjects = async () => {
  const response = await api.get('/project/read');
  return response.data;
};

export const createProject = async (data) => {
  const response = await api.post('/project/create', data);
  return response.data;
};

export const updateProject = async (id, data) => {
  const response = await api.put(`/project/update/${id}`, data);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(`/project/delete/${id}`);
  return response.data;
};
