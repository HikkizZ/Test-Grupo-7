import { useEffect, useState } from "react";
import { getSubjects, createSubject, deleteSubject } from "@services/subject.service";
import { deleteDataAlert, showSuccessAlert, showErrorAlert } from "@helpers/sweetAlert";

export default function Subject() {
  const [Subjects, setSubjects] = useState([]); 
  const [showSubjects, setShowSubjects] = useState(false);
  const [showForm, setShowForm] = useState(false); 
  const [newSubject, setNewSubject] = useState({
    name: "",
    cursoId: "",
    description: ""
  });

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects();
      setSubjects(response);
    } catch (error) {
      console.error("Error al cargar las asignaturas:", error);
    }
  };

  const handleShowSubjects = async () => {
    setShowSubjects((prevState) => !prevState);
    if (!showSubjects) {
      await fetchSubjects();
    }
  };

  const validateForm = () => {
    const { name, cursoId, description } = newSubject;
    if (!name || !cursoId || !description) {
      showErrorAlert("Error", "Todos los campos son obligatorios.");
      return false;
    }
    return true;
  };
  

  const handleCreate = async () => {
    if (!validateForm()) return; 
    try {
      await createSubject(newSubject);
      setNewSubject({
        nombre: "",
        curso: "",
        descrición: ""
      });
      setShowForm(false);
      showSuccessAlert("¡Asignatura creada!", "La asignatura ha sido registrada correctamente.");
      await fetchSubjects();
    } catch (error) {
      console.error("Error al crear la asignatura:", error);
      showErrorAlert("Error", "No se pudo crear la asignatura.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteDataAlert();
      if (result.isConfirmed) {
        await deleteSubject(id);
        showSuccessAlert("¡Asignatura eliminada!", "La asignatura ha sido eliminada con éxito.");
        await fetchSubjects();
      }
    } catch (error) {
      console.error("Error al intentar eliminar la asignatura:", error);
      showErrorAlert("Error", "No se pudo eliminar la asignatura.");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1>Asignaturas</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cerrar Formulario" : "Crear Asignatura"}
      </button>
      <br />
      <br />
      {showForm && (
        <div style={{ marginTop: "20px" }}>
          <h2>Nueva Asignatura</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={newSubject.name}
            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="CursoID"
            value={newSubject.cursoId}
            onChange={(e) => setNewSubject({ ...newSubject, cursoId: e.target.value })}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newSubject.description}
            onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
          />
          <button onClick={handleCreate}>Guardar</button>
        </div>
      )}

      <br />
      <br />
      <button onClick={handleShowSubjects}>
        {showSubjects ? "Ocultar Asignaturas" : "Mostrar Asignaturas"}
      </button>
      <br />
      <br />

      {showSubjects && Subjects.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>CursoID</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {Subjects.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.id}</td>
                <td>{subject.name}</td>
                <td>{subject.cursoId}</td>
                <td>{subject.description}</td>
                <td>
                  <button onClick={() => handleDelete(subject.id)}>Eliminar</button>   
                            
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        showSubjects && <p>No hay Asignaturas disponibles</p>
      )}
    </div>
  );
}