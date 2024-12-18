import axios from './root.service.js';

export async function getRooms() {
    try {
        const { data } = await axios.get('/room/all');
        return data.data;
    } catch (error) {
        console.error('Error fetching all rooms:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al obtener las salas.';
    }
}

export async function createRoom(roomData) {
    try {
        const { data } = await axios.post('/room/', roomData);
        return data;
    } catch (error) {
        console.error('Error creating room:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al crear la sala.';
    }
}

export async function deleteRoom(id) {
    try {
        const { data } = await axios.delete(`/room/delete/?id=${id}`);
        return data;
    } catch (error) {
        console.error('Error deleting room:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al eliminar la sala.';
    }
}

export async function getRoom(params) {
    try {
        const queryParams = { ...params };
        const { data } = await axios.get('/room/detail', { params: queryParams });
        return data.data;
    } catch (error) {
        console.error('Error fetching room:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al buscar la sala.';
    }
}


export async function updateRoom(id, data) {
    try {
        const response = await axios.patch(`/room/update/?id=${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error("Error al actualizar la sala:", error);
        throw error.response?.data?.message || "Error desconocido al actualizar la sala.";
    }
}
