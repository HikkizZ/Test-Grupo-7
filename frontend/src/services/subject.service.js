import axios from "./root.service.js";

export async function getSubjects() {
  try {
    const { data } = await axios.get("/subject/all");
    return data.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export async function deleteSubject(id) {
  try {
    const response = await axios.delete(`/subject/?id=${id}`); //*Verifica que esta sea la ruta correcta
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export async function createSubject(data) {
  try {
    const response = await axios.post("/subject", data); //* Verifica que esta sea la ruta correcta
    return response.data;
  } catch (error) {
    return error.response?.data?.message || error.message;
  }
}

export async function getSubject(id) {
  try {
    const { data } = await axios.get(`/subject/?id=${id}`)
    return data.data;
  } catch (error) {
    console.error("Error al obtener los cursos: ", error.response?.data?.message || error)
    return error.response?.data?.message || "Error desconocido al obtener la asignatura"
  }
}

export async function updateSubject(id, data) {
  try {
    const response = await axios.patch(`/subject/?id=${id}`, data); //* Verifica que esta sea la ruta correcta
    console.log('response', response?.data?.message)
    return response.data;
  } catch (error) {
    console.log("Error al actualizar la asignatura: ", error.response?.data?.message || error)
    return error.response?.data?.message || error.message;
  }
}