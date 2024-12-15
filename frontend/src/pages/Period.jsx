import { useEffect, useState } from "react";
import { getPeriods, createPeriod, updatePeriod, deletePeriod } from "@services/period.service";
import { deleteDataAlert, showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

export default function Periods() {
  const [periods, setPeriods] = useState([]);
  const [showPeriods, setShowPeriods] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPeriodId, setCurrentPeriodId] = useState(null);
  const [newPeriod, setNewPeriod] = useState({
    name: "",
    startTime: "",
    endTime: "",
  });

  const fetchPeriods = async () => {
    try {
      const response = await getPeriods();
      setPeriods(response);
    } catch (error) {
      console.error("Error al cargar los períodos:", error);
    }
  };

  const handleShowPeriods = async () => {
    setShowPeriods((prevState) => !prevState);
    if (!showPeriods) {
      await fetchPeriods();
    }
  };

  const validateForm = () => {
    const { name, startTime, endTime } = newPeriod;
    if (!name || !startTime || !endTime) {
      showErrorAlert("Error", "Todos los campos son obligatorios.");
      return false;
    }
    if (startTime >= endTime) {
        showErrorAlert("Error", "La hora de término debe ser mayor que la hora de inicio.");
        return false;
      }
    return true;
  };

  const handleCreateOrUpdate = async () => {
    if (!validateForm()) return;

    try {
      if (isEditing) {
        await updatePeriod(currentPeriodId, newPeriod);
        showSuccessAlert("¡Período actualizado!", "El período ha sido actualizado correctamente.");
      } else {
        await createPeriod(newPeriod);
        showSuccessAlert("¡Período creado!", "El período ha sido registrado correctamente.");
      }

      setNewPeriod({ name: "", startTime: "", endTime: "" });
      setIsEditing(false);
      setShowForm(false);
      await fetchPeriods();
    } catch (error) {
      console.error(isEditing ? "Error al actualizar el período:" : "Error al crear el período:", error);
      showErrorAlert("Error", isEditing ? "No se pudo actualizar el período." : "No se pudo crear el período.");
    }
  };

  const handleEdit = (period) => {
    setNewPeriod({ name: period.name, startTime: period.startTime, endTime: period.endTime });
    setCurrentPeriodId(period.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteDataAlert();
      if (result.isConfirmed) {
        await deletePeriod(id);
        showSuccessAlert("¡Período eliminado!", "El período ha sido eliminado con éxito.");
        await fetchPeriods();
      }
    } catch (error) {
      console.error("Error al intentar eliminar el período:", error);
      showErrorAlert("Error", "No se pudo eliminar el período.");
    }
  };

  useEffect(() => {
    fetchPeriods();
  }, []);

  return (
    <div>
        <br />
        <br />
      <h1>Períodos 🕒</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cerrar Formulario" : "Crear Período"}
      </button>
      <br />
      {showForm && (
        <div>
          <h2>{isEditing ? "Editar Período" : "Nuevo Período"}</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={newPeriod.name}
            onChange={(e) => setNewPeriod({ ...newPeriod, name: e.target.value })}
          />
          <input
            type="time"
            placeholder="Hora de inicio"
            value={newPeriod.startTime}
            onChange={(e) => setNewPeriod({ ...newPeriod, startTime: e.target.value })}
          />
          <input
            type="time"
            placeholder="Hora de término"
            value={newPeriod.endTime}
            onChange={(e) => setNewPeriod({ ...newPeriod, endTime: e.target.value })}
          />
          <button onClick={handleCreateOrUpdate}>{isEditing ? "Actualizar" : "Guardar"}</button>
        </div>
      )}

      <br />
      <button onClick={handleShowPeriods}>
        {showPeriods ? "Ocultar Períodos" : "Mostrar Períodos"}
      </button>
      <br />

      {showPeriods && periods.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Hora de inicio</th>
              <th>Hora de término</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {periods.map((period) => (
              <tr key={period.id}>
                <td>{period.name}</td>
                <td>{period.startTime}</td>
                <td>{period.endTime}</td>
                <td>
                  <button onClick={() => handleEdit(period)}>Editar</button>
                  <button onClick={() => handleDelete(period.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        showPeriods && <p>No hay períodos disponibles</p>
      )}
    </div>
  );
}
