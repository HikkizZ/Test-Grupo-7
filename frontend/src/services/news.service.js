import axios from './root.service.js';

const BASE_URL = '/news';

export const createNews = async (newsData) => {
  try {
    const response = await axios.post(BASE_URL, newsData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear la noticia:', error);
    throw error;
  }
};

export const getNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener las noticias:', error);
    throw error;
  }
};

export const getNewsById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener la noticia:', error);
    throw error;
  }
};

export const updateNews = async (id, newsData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, newsData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la noticia:', error);
    throw error;
  }
};

export const deleteNews = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error al eliminar la noticia:', error);
    throw error;
  }
};

export const downloadImage = async (newsId) => {
  try {
    const response = await axios.get(`${BASE_URL}/download/${newsId}`, {
      responseType: 'blob',
    });
    const contentDisposition = response.headers['content-disposition'];
    const fileName = contentDisposition
      ? contentDisposition.split('filename=')[1].replace(/"/g, '')
      : 'imagen.jpg';

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al descargar la imagen:', error);
    throw error;
  }
};

export const getImageContent = async (newsId) => {
  try {
    const response = await axios.get(`${BASE_URL}/download/${newsId}`, {
      responseType: 'blob'
    });
    return URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
  } catch (error) {
    console.error('Error al obtener el contenido de la imagen:', error);
    throw error;
  }
};

export const ensureFullImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
};