import API from './api';

export const authService = {
  register: async (userData) => {
    const response = await API.post('/users/register', userData);
    return response.data; 
  },
  login: async (userData) => {
    const response = await API.post('/users/login', userData);
    return response.data; 
  }
};

export const learningService = {
  getCategories: async () => {
    const response = await API.get('/categories');
    return response.data; 
  },
  getSubCategories: async (categoryId) => {
    const response = await API.get(`/categories/${categoryId}/subcategories`);
    return response.data; 
  },
  generatePrompt: async (promptData) => {
    const response = await API.post('/learning/prompt', promptData);
    return response.data; 
  },
  getHistory: async () => {
    const response = await API.get('/learning/history');
    return response.data; 
  }
};

export const adminService = {
  getAllPrompts: async (page = 1, limit = 10, userId = '') => {
    let url = `/admin/prompts?page=${page}&limit=${limit}`;
    if (userId && userId.trim() !== '') {
      url += `&userId=${encodeURIComponent(userId.trim())}`;
    }
    const response = await API.get(url);
    return response.data; 
  }
};