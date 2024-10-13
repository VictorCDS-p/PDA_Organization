import api from './api';

export const readAllClasses = async () => {
  const response = await api.get('/class/read');
  return response.data;
};

export const readClassById = async (id) => {
  const response = await api.get(`/class/read/${id}`);
  return response.data;
};

export const createClass = async (data) => {
  const response = await api.post('/class/create', data);
  return response.data;
};

export const updateClass = async (id, data) => {
  const response = await api.put(`/class/update/${id}`, data);
  return response.data;
};

export const deleteClass = async (id) => {
  const response = await api.delete(`/class/delete/${id}`);
  return response.data;
};
