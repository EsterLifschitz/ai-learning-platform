import API from './api';

export const authService = {
  register: async (userData) => {
    const response = await API.post('/users/register', userData);
    return response.data; // { success: true, data: { token, role... } }
  },
  login: async (userData) => {
    const response = await API.post('/users/login', userData);
    return response.data; // { success: true, data: { token, role... } }
  }
};

export const learningService = {
  getCategories: async () => {
    const response = await API.get('/categories');
    return response.data; // { success: true, data: [...] }
  },
  getSubCategories: async (categoryId) => {
    const response = await API.get(`/categories/${categoryId}/subcategories`);
    return response.data; // { success: true, data: [...] }
  },
  generatePrompt: async (promptData) => {
    const response = await API.post('/learning/prompt', promptData);
    return response.data; // { success: true, data: {...} }
  },
  // פונקציית הלמידה שהייתה חסרה עבור דף ההיסטוריה:
  getHistory: async () => {
    const response = await API.get('/learning/history');
    return response.data; // { success: true, data: [...] }
  }
};

export const adminService = {
  getAllPrompts: async (page = 1, limit = 10) => {
    const response = await API.get(`/admin/prompts?page=${page}&limit=${limit}`);
    return response.data; // { success: true, data: [...], pagination: {...} }
  }
};