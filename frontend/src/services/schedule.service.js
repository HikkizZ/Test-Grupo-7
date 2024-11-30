import axios from "./root.service.js";

export async function getSchedules() {
  try {
    const { data } = await axios.get("/schedule/all");
    return data.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export async function deleteSchedule(id) {
  try {
    const response = await axios.delete(`/schedule/?id=${id}`); //*Verifica que esta sea la ruta correcta
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export async function createSchedule(data) {
  try {
    const response = await axios.post("/schedule", data); //* Verifica que esta sea la ruta correcta
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}
