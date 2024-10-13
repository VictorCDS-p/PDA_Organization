import api from './api';

export const readStudents = async () => {
  const response = await api.get('/student/read');
  return response.data;
};

export const readStudentById = async (id) => {
  const response = await api.get(`/student/readbyID/${id}`);
  return response.data;
};

export const loginStudent = async (data) => {
  const response = await api.post('/student/login', data);
  return response.data;
};

export const createStudent = async (data) => {
  const response = await api.post('/student/create', data);
  return response.data;
};

export const updateStudent = async (id, data) => {
  const response = await api.put(`/student/update/${id}`, data);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await api.delete(`/student/delete/${id}`);
  return response.data;
};
