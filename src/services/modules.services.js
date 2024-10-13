import api from './api';

export const readAllModules = async () => {
  const response = await api.get('/module/readAll');
  return response.data;
};

export const readModuleById = async (id) => {
  const response = await api.get(`/module/read/${id}`);
  return response.data;
};

export const createModule = async (data) => {
  const response = await api.post('/module/create', data);
  return response.data;
};

export const updateModule = async (id, data) => {
  const response = await api.put(`/module/update/${id}`, data);
  return response.data;
};

export const deleteModule = async (id) => {
  const response = await api.delete(`/module/delete/${id}`);
  return response.data;
};
