import axios from 'axios';
import { User } from '../types/user';

// Define your backend URL
const BASE_URL = 'http://localhost:3000';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

export const createUser = async (userData: User): Promise<User> => {
  const response = await axios.post(`${BASE_URL}/users`, userData);
  return response.data;
};

export const updateUser = async ({ id, userData }: { id: string; userData: User }): Promise<User> => {
  const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/users/${id}`);
};
