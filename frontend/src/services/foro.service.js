import axios from './root.service.js';

const BASE_URL = '/foro';

export const createForo = async (foroData) => {
    try {
        const response = await axios.post(BASE_URL, foroData, {
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
        const response = await axios.get(`${BASE_URL}/all`);
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener los foros:', error);
        throw error;
    }
}

export async function getForo(id) { 
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener el foro:', error);
        throw error;
    }
}

export const updateForo = async (id, foroData) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, foroData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error en la solicitud de actualización:", error);
        throw error;
    }
};

export async function deleteForo(id) {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error al eliminar el foro:', error);
        throw error;
    }
}

export const downloadFile = async (foroId, fileName) => {
    try {
      const response = await axios.get(`${BASE_URL}/${foroId}/download/${fileName}`, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      throw error;
    }
  };
  
export const getPDFContent = async (foroId, fileName) => {
  try {
    const response = await axios.get(`${BASE_URL}/${foroId}/view/${fileName}`, {
      responseType: 'blob'
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error al obtener el contenido del PDF:', error);
    throw error;
  }
};
