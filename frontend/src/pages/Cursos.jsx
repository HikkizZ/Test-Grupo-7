import { useEffect } from "react";

import { useGetCursos } from "../hooks/cursos/useGetCursos";
import { useSearchCurso } from "../hooks/cursos/useSearchCurso";
import { useCreateCurso } from "../hooks/cursos/useCreateCurso";
import { useUpdateCurso } from "../hooks/cursos/useUpdateCurso";
import { useDeleteCurso } from "../hooks/cursos/useDeleteCurso";

import CursoForm from "../components/cursos/CursoForm";
import CursoTable from "../components/cursos/CursoTable";

export default function Cursos() {
    const { cursos, fetchCursos, loading: loadingCursos } = useGetCursos();
    const { handleCreate, loading: loadingCreate } = useCreateCurso(fetchCursos);
    const { handleUpdate, loading: loadingUpdate } = useUpdateCurso(fetchCursos);

    const {
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        searchResults,
        loading: loadingSearch,
        error: errorSearch,
    } = useSearchCurso(cursos);

    const { handleDelete, loading: loadingDelete } = useDeleteCurso({ fetchCursos, cursos, setCursos: fetchCursos });

    const handleView = (curso) => {
        console.log("Viewing curso", curso);
    };

    useEffect(() => {
        fetchCursos();
    }, [fetchCursos]);

    const noCursos = !cursos || cursos.length === 0;
    const noSearchResults = searchResults.length === 0 && !noCursos;

    const getPlaceholder = () => {
        switch (searchFilter) {
            case "code":
                return "Buscar por código";
            case "name":
                return "Buscar por nombre";
            case "level":
                return "Buscar por nivel";
            case "year":
                return "Buscar por año";
            default:
                return "Buscar curso";
        }
    };

    return (
        <div>
            <section>
                <h1>Cursos</h1>
            </section>

            <section>
                <h3>Crear Curso</h3>
                <CursoForm onCreate={handleCreate} loading={loadingCreate} />
            </section>

            <section>
                <h3>Buscar Curso</h3>
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
                        <option value="code">Buscar por código</option>
                        <option value="name">Buscar por nombre</option>
                        <option value="level">Buscar por nivel</option>
                        <option value="year">Buscar por año</option>
                    </select>
                </div>
            </section>

            <section>
                {loadingSearch || loadingCursos ? (
                    <p>Cargando cursos...</p>
                ) : errorSearch ? (
                    <p style={{ color: "red" }}>{errorSearch}</p>
                ) : noCursos ? (
                    <p>No hay cursos registrados</p>
                ) : noSearchResults ? (
                    <p>No se encontraron cursos que coincidan con tu búsqueda</p>
                ) : (
                    <CursoTable
                        cursos={searchResults}
                        onUpdate={handleUpdate}
                        loadingDelete={loadingDelete}
                        onDelete={handleDelete}
                        loadingUpdate={loadingUpdate}
                        onView={handleView}
                        fetchCursos={fetchCursos}
                    />
                )}
            </section>
        </div>
    );
}
