import axios from "./root.service.js";

export async function configCalificaciones(data) {
    try {
        const response = await axios.post("/calificacion", data);
        return response.data;
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
}

export async function getCalificaciones(codeSubject) {
    try {
        const response = await axios.get(`/calificacion/?codeSubject=${codeSubject}`, codeSubject);
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

export async function updateCalificaciones(codeSubject) {
    try {
        const response = await axios.put(`/calificacion/detail/?codeSubject=${codeSubject}`, codeSubject);
        return response.data;
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
}

export async function assignGradesStudents(codeSubject) {
    try {
        const response = await axios.post(`/calificacion/assign/?codeSubject=${codeSubject}`, codeSubject);
        return response.data;
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
}

export async function calificarAlumno(data) {
    try {
        const response = await axios.post("/calificacion/calificar", data);
        return response.data;
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
}