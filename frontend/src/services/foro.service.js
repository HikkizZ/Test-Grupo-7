import axios from './root.service.js';

export async function createForo(data) {
    try {
        const response = await axios.post('/posts', data);
        return response.data.data;
    } catch (error) {
        console.error('Error al crear el post:', error);
        throw error;
    }
}

export async function getForos() { 
    try {
        const response = await axios.get('/posts/all');
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        throw error;
    }
}

export async function getForo(id) { 
    try {
        const response = await axios.get(`/posts/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener el post:', error);
        throw error;
    }
}

export async function updateForo(id, data) {
    try {
        console.log(`Attempting to update foro with id: ${id}`, data);
        const response = await axios.patch(`/posts/${id}`, data);
        console.log('Update response:', response);
        return response.data.data;
    } catch (error) {
        console.error('Error al actualizar el post:', error);
        if (error.response) {
            console.error('Error data:', error.response.data);
            console.error('Error status:', error.response.status);
            console.error('Error headers:', error.response.headers);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
}



export async function deleteForo(id) {
    try {
        const response = await axios.delete(`/posts/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error al eliminar el post:', error);
        throw error;
    }
}

