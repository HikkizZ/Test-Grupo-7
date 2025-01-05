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

export const downloadFile = async (foroId) => {
    try {
      const response = await axios.get(`${BASE_URL}/download/${foroId}`, {
        responseType: 'blob',
      });
      const contentDisposition = response.headers['content-disposition'];
      const fileName = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : 'archivo.pdf';
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      throw error;
    }
  };
   
export const getPDFContent = async (foroId) => {
    try {
      const response = await axios.get(`${BASE_URL}/download/${foroId}`, {
        responseType: 'blob'
      });
      return URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    } catch (error) {
      console.error('Error al obtener el contenido del PDF:', error);
      throw error;
    }
  };
  ;
