import api from './api';

export const readAdministrators = async () => {
  const response = await api.get('/administrator/read');
  return response.data;
};

export const readAdministratorById = async (id) => {
  const response = await api.get(`/administrator/readbyID/${id}`);
  return response.data;
};

export const loginAdministrator = async (data) => {
  const response = await api.post('/administrator/login', data);
  return response.data;
};

export const createAdministrator = async (data) => {
  const response = await api.post('/administrator/create', data);
  return response.data;
};

export const updateAdministrator = async (id, data) => {
  const response = await api.put(`/administrator/update/${id}`, data);
  return response.data;
};

export const deleteAdministrator = async (id) => {
  const response = await api.delete(`/administrator/delete/${id}`);
  return response.data;
};
