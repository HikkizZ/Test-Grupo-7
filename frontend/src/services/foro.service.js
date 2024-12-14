import axios from './root.service.js';

export const createForo = async (foroData) => {
    try {
        const response = await axios.post('/posts', foroData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getForos() { 
    try {
        const response = await axios.get('/posts/all');
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        throw error;
    }
}

export async function getForo(id) { 
    try {
        const response = await axios.get(`/posts/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener el post:', error);
        throw error;
    }
}

export const updateForo = async (id, foroData) => {
    try {
        console.log('Sending update request for foro ID:', id);
        console.log('Update data:', Object.fromEntries(foroData));
        const response = await axios.patch(`/posts/${id}`, foroData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Update response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud de actualización:", error);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
        }
        throw error;
    }
};

export async function deleteForo(id) {
    try {
        const response = await axios.delete(`/posts/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error al eliminar el post:', error);
        throw error;
    }
}
export const downloadFile = async (foroId, fileName) => {
    try {
      const response = await axios.get(`/foro/${foroId}/download/${fileName}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      throw error;
    }
  };