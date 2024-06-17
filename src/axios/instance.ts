import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://todolist-back-454q.onrender.com/api',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
