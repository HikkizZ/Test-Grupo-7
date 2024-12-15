import axios from "./root.service.js";

export async function getPeriods() {
  try {
    const { data } = await axios.get("/period/all");
    return data.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export async function createPeriod(data) {
  try {
    const response = await axios.post("/period", data); // Verifica que esta sea la ruta correcta
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export async function updatePeriod(id, data) {
  try {
    const response = await axios.put(`/period/?id=${id}`, data); // Verifica que esta sea la ruta correcta
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export async function deletePeriod(id) {
  try {
    const response = await axios.delete(`/period/?id=${id}`); // Verifica que esta sea la ruta correcta
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}
