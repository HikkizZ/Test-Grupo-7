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