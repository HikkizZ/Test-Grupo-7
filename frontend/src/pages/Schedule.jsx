import { useEffect, useState } from "react";
import { getSchedules, createSchedule, deleteSchedule } from "@services/schedule.service";
import { deleteDataAlert, showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

export default function Schedules() {
  const [schedules, setSchedules] = useState([]); // Estado para almacenar horarios
  const [showSchedules, setShowSchedules] = useState(false); // Estado para mostrar/ocultar lista
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar formulario
  const [newSchedule, setNewSchedule] = useState({
    curso: "",
    profesor: "",
    sala: "",
    asignatura: "",
    periodo: "",
    dia: "",
  });

  // Función para obtener los horarios
  const fetchSchedules = async () => {
    try {
      const response = await getSchedules();
      console.log(response);
      setSchedules(response);
    } catch (error) {
      console.error("Error al cargar los horarios:", error);
    }
  };

  // Manejador para alternar la visualización de los horarios
  const handleShowSchedules = async () => {
    setShowSchedules((prevState) => !prevState);
    if (!showSchedules) {
      await fetchSchedules();
    }
  };

  // Validación del formulario antes de enviar
  const validateForm = () => {
    const { curso, profesor, sala, asignatura, periodo, dia } = newSchedule;
    if (!curso || !profesor || !sala || !asignatura || !periodo || !dia) {
      showErrorAlert("Error", "Todos los campos son obligatorios.");
      return false;
    }
    return true;
  };

  // Manejador para crear un horario
  const handleCreate = async () => {
    if (!validateForm()) return; // Valida antes de enviar
    try {
      await createSchedule(newSchedule);
      setNewSchedule({
        curso: "",
        profesor: "",
        sala: "",
        asignatura: "",
        periodo: "",
        dia: "",
      });
      setShowForm(false);
      showSuccessAlert("¡Horario creado!", "El horario ha sido registrado correctamente.");
      await fetchSchedules();
    } catch (error) {
      console.error("Error al crear el horario:", error);
      showErrorAlert("Error", "No se pudo crear el horario.");
    }
  };

  // Manejador para eliminar un horario
  const handleDelete = async (id) => {
    try {
      const result = await deleteDataAlert();
      if (result.isConfirmed) {
        await deleteSchedule(id);
        showSuccessAlert("¡Horario eliminado!", "El horario ha sido eliminado con éxito.");
        await fetchSchedules();
      }
    } catch (error) {
      console.error("Error al intentar eliminar el horario:", error);
      showErrorAlert("Error", "No se pudo eliminar el horario.");
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1>Horarios 🤙</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cerrar Formulario" : "Crear Horario"}
      </button>
      <br />
      <br />

      {showForm && (
        <div style={{ marginTop: "20px" }}>
          <h2>Nuevo Horario</h2>
          <input
            type="text"
            placeholder="Curso"
            value={newSchedule.curso}
            onChange={(e) => setNewSchedule({ ...newSchedule, curso: e.target.value })}
          />
          <input
            type="text"
            placeholder="Profesor"
            value={newSchedule.profesor}
            onChange={(e) => setNewSchedule({ ...newSchedule, profesor: e.target.value })}
          />
          <input
            type="text"
            placeholder="Sala"
            value={newSchedule.sala}
            onChange={(e) => setNewSchedule({ ...newSchedule, sala: e.target.value })}
          />
          <input
            type="text"
            placeholder="Asignatura"
            value={newSchedule.asignatura}
            onChange={(e) => setNewSchedule({ ...newSchedule, asignatura: e.target.value })}
          />
          <input
            type="text"
            placeholder="Periodo"
            value={newSchedule.periodo}
            onChange={(e) => setNewSchedule({ ...newSchedule, periodo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Día"
            value={newSchedule.dia}
            onChange={(e) => setNewSchedule({ ...newSchedule, dia: e.target.value })}
          />
          <button onClick={handleCreate}>Guardar</button>
        </div>
      )}

      <br />
      <br />
      <button onClick={handleShowSchedules}>
        {showSchedules ? "Ocultar Horarios" : "Mostrar Horarios"}
      </button>
      <br />
      <br />

      {showSchedules && schedules.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Curso</th>
              <th>Profesor</th>
              <th>Sala</th>
              <th>Asignatura</th>
              <th>Periodo</th>
              <th>Día</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.id}</td>
                <td>{schedule.curso || "Desconocido"}</td>
                <td>{schedule.profesor || "Desconocido"}</td>
                <td>{schedule.sala || "Desconocido"}</td>
                <td>{schedule.asignatura || "Desconocido"}</td>
                <td>{schedule.periodo || "Desconocido"}</td>
                <td>{schedule.dia || "Desconocido"}</td>
                <td>
                  <button onClick={() => handleDelete(schedule.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        showSchedules && <p>No hay horarios disponibles</p>
      )}
    </div>
  );
}
