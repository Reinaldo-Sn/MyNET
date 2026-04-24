import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401) {
      if (original._retry) {
        // Segunda falha consecutiva — sessão inválida, força logout
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login';
        return Promise.reject(error);
      }
      original._retry = true;
      const refresh = localStorage.getItem('refresh');

      if (refresh) {
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/auth/refresh/`, { refresh });
          const newAccess = res.data.access;
          localStorage.setItem('access', newAccess);
          original.headers.Authorization = `Bearer ${newAccess}`;
          return api(original);
        } catch {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          window.location.href = '/login';
        }
      } else {
        localStorage.removeItem('access');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
