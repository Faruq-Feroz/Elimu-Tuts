import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    // Get the current user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // Get fresh token
      const token = await user.getIdToken(true);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Course API endpoints
export const courseApi = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`)
};

// User API endpoints
export const userApi = {
  getCurrentUser: () => api.get('/users/current-user'),
  createOrUpdate: (data) => api.post('/users/create-or-update', data)
};

// Order API endpoints
export const orderApi = {
  create: (data) => api.post('/orders', data),
  getByUser: () => api.get('/orders/user'),
  getById: (id) => api.get(`/orders/${id}`)
};

export default api; 