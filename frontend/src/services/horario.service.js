import axios from "./root.service.js";

// Obtener todos los horarios
export async function getHorarios() {
    try {
        const { data } = await axios.get("/horario/all");
        return data.data; // Retornar solo los datos relevantes
    } catch (error) {
        console.error("Error fetching all horarios:", error.response?.data?.message || error.message);
        throw error.response?.data?.message || "Error desconocido al obtener los horarios.";
    }
}

// Obtener un horario por ID o parámetros
export async function getHorario({ id, curso }) {
    try {
        const params = {}; // Construir los parámetros dinámicamente
        if (id) params.id = id.trim();
        if (curso) params.curso = curso.trim();

        const { data } = await axios.get("/horario", { params });
        return data.data; // Retornar solo los datos relevantes
    } catch (error) {
        console.error("Error fetching horario:", error.response?.data?.message || error.message);
        throw error.response?.data?.message || "Error desconocido al buscar el horario.";
    }
}

// Crear un nuevo horario
export async function createHorario(horarioData) {
    try {
        const { data } = await axios.post("/horario", horarioData); // Revisa que la ruta sea correcta
        return data; // Retornar toda la respuesta en caso de necesitar más propiedades
    } catch (error) {
        console.error("Error creating horario:", error.response?.data?.message || error.message);
        throw error.response?.data?.message || "Error desconocido al crear el horario.";
    }
}

// Eliminar un horario por ID
export async function deleteHorario(id) {
    try {
        const { data } = await axios.delete(`/horario/?id=${id}`);
        return data; // Retornar toda la respuesta en caso de necesitar más propiedades
    } catch (error) {
        console.error("Error deleting horario:", error.response?.data?.message || error.message);
        throw error.response?.data?.message || "Error desconocido al eliminar el horario.";
    }
}

// Actualizar un horario por ID
export async function updateHorario(id, updateData) {
    try {
        const { data } = await axios.patch(`/horario?id=${id}`, updateData)
        return data.data; // Retornar solo los datos relevantes
    } catch (error) {
        console.error("Error updating horario:", error.response?.data?.message || error.message);
        throw error.response?.data?.message || "Error desconocido al actualizar el horario.";
    }
}
