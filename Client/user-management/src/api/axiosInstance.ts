import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/users',
});

export const fetchUsers = () => api.get('/users');
export const fetchUserById = (id: number) => api.get(`/users/user/${id}`);
export const createUser = (data: any) => api.post('/users/create-user', data);
export const updateUser = (id: number, data: any) => api.put(`/users/user/${id}`, data);
export const deleteUser = (id: number) => api.delete(`/users/user/${id}`);

