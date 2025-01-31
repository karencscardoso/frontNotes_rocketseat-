import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3333/"
});

// Adiciona o token automaticamente em todas as requisições
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  }, error => {
    return Promise.reject(error);
  });
  
  // Interceptor para lidar com erros 401 (Unauthorized)
  api.interceptors.response.use(
    response => response,
    async error => {
      if (error.response && error.response.status === 401) {
        console.warn("Erro 401: Token inválido ou expirado.");
  
        // Se o backend suportar refresh token, podemos tentar renovar o token aqui
  
        // Se não tiver refresh token, desloga o usuário
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redireciona para a tela de login
      }
  
      return Promise.reject(error);
    }
  );