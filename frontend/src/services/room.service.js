import axios from './root.service.js';

// Obtener todas las salas
export async function getRooms() {
    try {
        const { data } = await axios.get('/room/all');
        return data.data;
    } catch (error) {
        console.error('Error fetching all rooms:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al obtener las salas.';
    }
}

// Crear una sala
export async function createRoom(roomData) {
    try {
        const { data } = await axios.post('/room/', roomData);
        return data;
    } catch (error) {
        console.error('Error creating room:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al crear la sala.';
    }
}

// Eliminar una sala
export async function deleteRoom(id) {
    try {
        const { data } = await axios.delete(`/room/delete/?id=${id}`);
        return data;
    } catch (error) {
        console.error('Error deleting room:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al eliminar la sala.';
    }
}

// Buscar una sala por ID o Nombre
export async function getRoom({ id, name }) {
    try {
        const params = {};
        if (id) params.id = id.trim();
        if (name) params.name = name.trim();

        const { data } = await axios.get('/room/detail', { params });
        return data.data;
    } catch (error) {
        console.error('Error fetching room:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al buscar la sala.';
    }
}

// Actualizar una sala
export async function updateRoom(id, data) {
    try {
        const response = await axios.patch(`/room/update/?id=${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error("Error al actualizar la sala:", error);
        throw error.response?.data?.message || "Error desconocido al actualizar la sala.";
    }
}
