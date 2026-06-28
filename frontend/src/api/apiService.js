import axios from 'axios';

// API Base URL - tomar Node.js API
const API_BASE_URL = 'http://localhost:3002/api';

// Axios instance create kora
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Functions

// Users API
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data.data;
};

export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data.data;
};

// Products API
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data.data;
};

export default api;
