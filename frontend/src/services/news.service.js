import axios from '@services/root.service.js';

export async function createNews(data) {
    try {
        const response = await axios.post('/news', data);
        return response.data.data;
    } catch (error) {
        console.error('Error al crear la noticia:', error);
        throw error;
    }
}

export async function getNews() { 
    try {
        const response = await axios.get('/news/all');
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener las noticias:', error);
        throw error;
    }
}

export async function getNewsById(id) { 
    try {
        const response = await axios.get(`/news/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener la noticia:', error);
        throw error;
    }
}

export async function updateNews(data, id) {
    try {
        const response = await axios.patch(`/news/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error('Error al actualizar la noticia:', error);
        throw error;
    }
}

export async function deleteNews(id) {
    try {
        const response = await axios.delete(`/news/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error al eliminar la noticia:', error);
        throw error;
    }
}

