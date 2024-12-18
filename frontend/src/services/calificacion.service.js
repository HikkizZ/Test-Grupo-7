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

export async function updateCalificaciones(codeSubject, cantidad) {
    try {
        const response = await axios.patch(`/calificacion/detail/?codeSubject=${codeSubject}`, { cantidad });
        return response.data;
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
}

export async function assignGradesStudents(codeSubject) {
    try {
        const response = await axios.post(`/calificacion/assign/?codeSubject=${codeSubject}`);
        return response.data;
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
}

export async function calificarAlumno(data) {
    console.log('data:', data);
    try {
        const response = await axios.patch("/calificacion/calificar", data);
        return response.data;
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
}

export async function editNameCalificacion(idCalificacion, newName) {
    try {
        const response = await axios.patch(`/calificacion/edit/?idCalificacion=${idCalificacion}`, { newName });
        return response.data;
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
}

export async function getNotasAlumno() {
    try {
        const response = await axios.get(`/calificacion/notas/`);
        console.log('response:', response.data.data);
        return response.data.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
}

