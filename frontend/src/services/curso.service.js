import axios from './root.service.js';

export async function getCurso(id) { //? Función para mostrar un curso por ID
    try {
        const { data } = await axios.get(`/curso/?id=${id}`); // Realiza la solicitud con el parámetro ID
        return data.data; // Retorna solo los datos relevantes
    } catch (error) {
        console.error("Error al obtener el curso:", error.response?.data?.message || error.message);
        return error.response?.data?.message || "Error desconocido al obtener el curso";
    }
}

export async function getCursos(){ //? Función para mostrar todos los cursos
    try {
        const { data } = await axios.get('/curso/all');
        return data.data;
    } catch (error) {
        console.error("Error al obtener los cursos:", error.response?.data?.message || error.message);
        return error.response?.data?.message || "Error desconocido al obtener los cursos";
    }
}

export async function deleteCurso(code){ //? Función para eliminar un curso
    try {
        const { data } = await axios.delete(`/curso/?code=${code.code}`);
        return data;
    } catch (error) {
        console.error("Error al eliminar el curso:", error.response?.data?.message || error.message);
        return error.response?.data?.message || "Error desconocido al eliminar el curso";
    }
}

export async function createCurso(data){ //? Función para crear un curso
    const { name, section } = data;
    const level = parseInt(data.level);
    const year = parseInt(data.year);

    // Crear objeto con los datos a enviar
    const cursoData = { name, level, section, year };

    try {
        const response = await axios.post('/curso', cursoData);
        return response.data;
    } catch (error) {
        return error.response.data.message || "Error desconocido al crear el curso";
    }
}

export async function updateCurso(id, data){ //? Función para actualizar un curso
    const { name, section } = data;
    const level = parseInt(data.level);
    const year = parseInt(data.year);

    // Crear objeto con los datos a enviar
    const cursoData = { name, level, section, year };

    try {
        const response = await axios.put(`/curso/?id=${id}`, cursoData);
        return response.data.data;
    } catch (error) {
        return error.response.data.message || "Error desconocido al actualizar el curso";
    }
};

export async function assignStudents(cursoCode, data) {
    // Crear lista con objeto data
    const studentsRut = data.map(item=> item.rut)
    try {
        const response = await axios.post('/curso/addstudents', {cursoCode, studentsRut});
        return response.data;
    } catch (error) {
        return error.response.data.message || "Error desconocido al asignar estudiantes";
    }
}

export async function assignSubjects(code) {
    console.log('code:', code);
    try {
        const response = await axios.post(`/curso/assignsubjects/?code=${code}`, { code });
        return response.data;
    } catch (error) {
        return error.response.data.message || "Error desconocido al asignar asignaturas";
    }
}