import { useEffect } from "react";

import { useGetSubjects } from "../hooks/subjects/useGetSubjects";
import { useSearchSubject } from "../hooks/subjects/useSearchSubject";
import { useCreateSubject } from "../hooks/subjects/useCreateSubject";
import { useUpdateSubject } from "../hooks/subjects/useUpdateSubject";
import { useDeleteSubject } from "../hooks/subjects/useDeleteSubject";

import SubjectForm from "../components/subjects/SubjectForm";
import SubjectTable from "../components/subjects/SubjectTable";

export default function Subjects() {
  const { subjects, fetchSubjects, loading: loadingSubjects } = useGetSubjects();
  const { handleCreate, loading: loadingCreate } = useCreateSubject(fetchSubjects);
  const { handleUpdate, loading: loadingUpdate } = useUpdateSubject(fetchSubjects);

  const {
    searchQuery,
    setSearchQuery,
    searchFilter,
    setSearchFilter,
    searchResults,
    loading: loadingSearch,
    error: errorSearch,
  } = useSearchSubject(subjects);

  const { handleDelete, loading: loadingDelete } = useDeleteSubject({ fetchSubjects, subjects, setSubjects: fetchSubjects });

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const noSubjects = !subjects || subjects.length === 0;
  const noSearchResults = searchResults.length === 0 && !noSubjects;

  const getPlaceholder = () => {
    switch (searchFilter) {
      case "code":
        return "Buscar por código";
      case "name":
        return "Buscar por nombre";
      case "cursoCode":
        return "Buscar por código de curso";
      case "rutProfesor":
        return "Buscar por profesor";
    }
  };

  return (
    <div>
      <section>
        <h1>Asignaturas</h1>
      </section>

      <section>
        <h3>Crear Asignatura</h3>
        <SubjectForm onCreate={handleCreate} loading={loadingCreate} />
      </section>

      <section>
        <h3>Buscar Asignatura</h3>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
          {/* Input de búsqueda */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={getPlaceholder()}
            style={{ flex: "1" }}
          />
          {/* Filtro */}
          <select
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              maxWidth: "200px",
              minWidth: "100px",
              height: "38px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              padding: "5px",
            }}
          >
            <option value="">Seleccionar filtro</option>
            <option value="name">Buscar por nombre</option>
            <option value="codeCurso">Buscar por codigo de curso</option>
            <option value="rutProfesor">Buscar por profesor</option>
          </select>
        </div>
      </section>

      <section>
                {loadingSearch || loadingSubjects ? (
                    <p>Cargando Asignaturas...</p>
                ) : errorSearch ? (
                    <p style={{ color: "red" }}>{errorSearch}</p>
                ) : noSubjects ? (
                    <p>No hay asignaturas registradas</p>
                ) : noSearchResults ? (
                    <p>No se encontraron asignaturas que coincidan con tu búsqueda</p>
                ) : (
                    <SubjectTable
                        subjects={searchResults}
                        onUpdate={handleUpdate}
                        loadingDelete={loadingDelete}
                        onDelete={handleDelete}
                        loadingUpdate={loadingUpdate}
                    />
                )}
      </section>
    </div>
  )
}