import axios from './root.service.js';

// Obtener todos los recursos
export async function getResources() {
    try {
        const { data } = await axios.get('/resource/all');
        return data.data; 
    } catch (error) {
        console.error('Error fetching all resources:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al obtener los recursos.';
    }
}

// Crear un recurso
export async function createResource(resourceData) {
    try {
        const { data } = await axios.post('/resource/', resourceData);
        return data; 
    } catch (error) {
        console.error('Error creating resource:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al crear el recurso.';
    }
}

// Eliminar un recurso
export async function deleteResource(id) {
    try {
        const { data } = await axios.delete(`/resource/delete/?id=${id}`);
        return data; 
    } catch (error) {
        console.error('Error deleting resource:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al eliminar el recurso.';
    }
}

// Buscar un recurso por ID o Nombre
export async function getResource({ id, name }) {
    try {
        const params = {};
        if (id) params.id = id.trim();
        if (name) params.name = name.trim();

        const { data } = await axios.get('/resource/detail', { params });
        return data.data; 
    } catch (error) {
        console.error('Error fetching resource:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al buscar el recurso.';
    }
}

// Actualizar un recurso
export async function updateResource(id, data) {
    try {
        const response = await axios.patch(`/resource/update/?id=${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error("Error al actualizar el recurso:", error);
        throw error.response?.data?.message || "Error desconocido al actualizar el recurso.";
    }
}