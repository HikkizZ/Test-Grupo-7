import { useEffect, useState } from "react";
import { getSchedules, createSchedule, deleteSchedule } from "@services/schedule.service";
import { deleteDataAlert, showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

export default function Schedules() {
  const [schedules, setSchedules] = useState([]); 
  const [showSchedules, setShowSchedules] = useState(false);
  const [showForm, setShowForm] = useState(false); 
  const [newSchedule, setNewSchedule] = useState({
    cursoId: "",
    teacherId: "",
    classroomId: "",
    subjectId: "",
    period: "",
    dayOfWeek: "",
  });

  const fetchSchedules = async () => {
    try {
      const response = await getSchedules();
      setSchedules(response);
    } catch (error) {
      console.error("Error al cargar los horarios:", error);
    }
  };

  const handleShowSchedules = async () => {
    setShowSchedules((prevState) => !prevState);
    if (!showSchedules) {
      await fetchSchedules();
    }
  };

  const validateForm = () => {
    const { cursoId, teacherId, classroomId, subjectId, period, dayOfWeek } = newSchedule;
    if (!cursoId || !teacherId || !classroomId || !subjectId || !period || !dayOfWeek) {
      showErrorAlert("Error", "Todos los campos son obligatorios.");
      return false;
    }
    return true;
  };
  

  const handleCreate = async () => {
    if (!validateForm()) return; 
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
            value={newSchedule.cursoId}
            onChange={(e) => setNewSchedule({ ...newSchedule, cursoId: e.target.value })}
          />
          <input
            type="text"
            placeholder="Profesor"
            value={newSchedule.teacherId}
            onChange={(e) => setNewSchedule({ ...newSchedule, teacherId: e.target.value })}
          />
          <input
            type="text"
            placeholder="Sala"
            value={newSchedule.classroomId}
            onChange={(e) => setNewSchedule({ ...newSchedule, classroomId: e.target.value })}
          />
          <input
            type="text"
            placeholder="Asignatura"
            value={newSchedule.subjectId}
            onChange={(e) => setNewSchedule({ ...newSchedule, subjectId: e.target.value })}
          />
          <input
            type="text"
            placeholder="Periodo"
            value={newSchedule.period}
            onChange={(e) => setNewSchedule({ ...newSchedule, period: e.target.value })}
          />
          <input
            type="text"
            placeholder="Día"
            value={newSchedule.dayOfWeek}
            onChange={(e) => setNewSchedule({ ...newSchedule, dayOfWeek: e.target.value })}
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
                <td>{schedule.cursoId}</td>
                <td>{schedule.teacherId}</td>
                <td>{schedule.classroomId}</td>
                <td>{schedule.subjectId}</td>
                <td>{schedule.period}</td>
                <td>{schedule.dayOfWeek}</td>
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
