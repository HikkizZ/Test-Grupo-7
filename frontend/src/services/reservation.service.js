import axios from './root.service.js';

// Obtener todas las reservaciones
export async function getReservations() {
    try {
        const { data } = await axios.get('/reservation/all');
        return data.data; // Retornar solo los datos relevantes
    } catch (error) {
        console.error('Error fetching reservations:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al obtener las reservaciones.';
    }
}

// Crear una nueva reservación
export async function createReservation(reservationData) {
    try {
        const { data } = await axios.post('/reservation/solicitar', reservationData);
        return data; // Retornar toda la respuesta en caso de necesitar más propiedades
    } catch (error) {
        console.error('Error creating reservation:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al crear la reservación.';
    }
}

// Obtener una reservación específica
export async function getReservation(queryParams) {
    try {
        const { data } = await axios.get('/reservation/get', { params: queryParams });
        return data.data; // Retornar solo los datos relevantes
    } catch (error) {
        console.error('Error fetching reservation:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al obtener la reservación.';
    }
}

// Actualizar una reservación
export async function updateReservation(id, updateData) {
    try {
        const { data } = await axios.patch(`/reservation/update?id=${id}`, updateData);
        return data; // Retornar toda la respuesta en caso de necesitar más propiedades
    } catch (error) {
        console.error('Error updating reservation:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al actualizar la reservación.';
    }
}

// Eliminar una reservación
export async function deleteReservation(id) {
    try {
        const { data } = await axios.delete(`/reservation/delete?id=${id}`);
        return data; // Retornar toda la respuesta en caso de necesitar más propiedades
    } catch (error) {
        console.error('Error deleting reservation:', error.response?.data?.message || error.message);
        throw error.response?.data?.message || 'Error desconocido al eliminar la reservación.';
    }
}
