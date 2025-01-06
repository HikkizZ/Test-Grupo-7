import axios from '@services/root.service.js';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const createNews = async (newsData) => {
  try {
    // Creamos un objeto FormData para manejar la carga de archivos
    const formData = new FormData();
    for (const key in newsData) {
      formData.append(key, newsData[key]);
    }
    const response = await axios.post(`${API_URL}/news`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error al crear la noticia:', error);
    throw error;
  }
};

export const getNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/news/all`);
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener las noticias:', error);
    throw error;
  }
};

export const getNewsById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/news/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener la noticia:', error);
    throw error;
  }
};

export const updateNews = async (id, newsData) => {
  try {
    // Asegurarse de que estamos enviando el FormData con el Content-Type correcto
    const formData = new FormData();
    for (const key in newsData) {
      formData.append(key, newsData[key]);
    }
    const response = await axios.patch(`${API_URL}/news/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error al actualizar la noticia:', error);
    throw error;
  }
};

export const deleteNews = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/news/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error al eliminar la noticia:', error);
    throw error;
  }
};

export const ensureFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_URL}${imagePath}`;
};