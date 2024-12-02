import axios from './root.service.js'; // Importa axios directamente

export async function createForo(data) {
    try {
        const response = await axios.post('/posts', data); // Usa axiosInstance
        return response.data.data;
    } catch (error) {
        console.error('Error al crear el post:', error);
        throw error;
    }
}

export async function getForos() { 
    try {
        const response = await axios.get('/posts/all'); // Usa axiosInstance
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener los posts:', error);
    }
}

export async function getForo(id) { 
    try {
        const response = await axios.get(`/posts/${id}`); // Usa axiosInstance
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener el post:', error);
    }
}

export async function updateForo(data, id) {
    try {
        const response = await axios.put(`/posts/${id}`, data); // Usa axiosInstance
        return response.data.data;
    } catch (error) {
        console.error('Error al actualizar el post:', error);
        throw error;
    }
}

export async function deleteForo(id) {
    try {
        const response = await axios.delete(`/posts/${id}`); // Usa axiosInstance
        return response.data.data;
    } catch (error) {
        console.error('Error al eliminar el post:', error);
    }
}
