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
    return error.response?.data || error.message;
  }
}