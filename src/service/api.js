import axios from 'axios';

const API_URL = 'http://192.168.0.13:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const cadastrarAdmin = async (dados) => {
  const response = await api.post('/auth/cadastrar', dados);
  return response.data;
};

export const fazerLogin = async (dados) => {
  const response = await api.post('/auth/login', dados);
  return response.data;
};

export const criarEvento = async (evento ) => {
  const response = await api.post('/eventos', evento);
  return response.data;
};

export const listarEventos = async () => {
  const response = await api.get('/eventos');
  return response.data;
};

export const buscarEvento = async (id) => {
  const response = await api.get(`/eventos/${id}`);
  return response.data;
};

export const atualizarEvento = async (id, dados) => {
  const response = await api.put(`/eventos/${id}`, dados);
  return response.data;
};

export const deletarEvento = async (id) => {
  const response = await api.delete(`/eventos/${id}`);
  return response.data;
};

export default api;