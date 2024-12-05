import axios from './root.service.js';

export async function getCurso(code){ //? Función para mostrar un curso
    try {
        const { data } = await axios.get(`/curso/?code=${code}`);
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getCursos(){ //? Función para mostrar todos los cursos
    try {
        const { data } = await axios.get('/curso/all');
        return data.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteCurso(code){ //? Función para eliminar un curso
    try {
        const response = await axios.delete(`/curso/?code=${code}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function createCurso(data){ //? Función para crear un curso
    try {
        const response = await axios.post('/curso/', data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateCurso(data, code){ //? Función para actualizar un curso
    try {
        const response = await axios.put(`/curso/?code=${code}`, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}