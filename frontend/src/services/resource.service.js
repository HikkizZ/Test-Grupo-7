import axios from './root.service.js';

// Función para mostrar todos los recursos
export async function getResources(){
    try {
        const { data } = await axios.get('/resource/all');
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

// Funcion para eliminar un recurso
export async function deleteResource(id){
    try {
        const response = await axios.delete(`/resource/delete/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

// Funcion para crear un recurso
export async function createResource(data){
    try {
        const response = await axios.post('/resource/', data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getResource({ id, name }) {
    try {
        // Construir los parámetros dinámicamente
        const params = {};
        if (id) params.id = id.trim();
        if (name) params.name = name.trim();

        // Llamada al backend
        const response = await axios.get(`resource/detail`, { params });

        return response.data.data; // Retornar solo la propiedad `data` del backend
    } catch (error) {
        console.error('Error fetching resource:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al buscar el recurso'; // Retornar el mensaje de error del backend
    }
}
