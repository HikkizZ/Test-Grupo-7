import { useEffect, useState } from "react";
import { useCreateHorario } from "../hooks/horario/useCreateHorario";
import { useGetHorarios } from "../hooks/horario/useGetHorarios";
import { useSearchHorario } from "../hooks/horario/useSearchHorario";
import { useUpdateHorario } from "../hooks/horario/useUpdateHorario";
import { useDeleteHorario } from "../hooks/horario/useDeleteHorario";
import HorarioForm from "../components/Horario/HorarioForm";
import HorarioTable from "../components/Horario/HorarioTable";

export default function Horarios() {
    const { horarios, fetchHorarios, loading: loadingHorarios } = useGetHorarios();
    const { handleCreate, loading: loadingCreate } = useCreateHorario(fetchHorarios);
    const { handleUpdate, loading: loadingUpdate } = useUpdateHorario(fetchHorarios);

    const [searchResults, setSearchResults] = useState(horarios);

    const {
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        searchResults: filteredResults,
        loading: loadingSearch,
        error: errorSearch,
    } = useSearchHorario(horarios);

    useEffect(() => {
        setSearchResults(filteredResults);
    }, [filteredResults]);

    const { handleDelete, loading: loadingDelete } = useDeleteHorario({
        horarios,
        setHorarios: fetchHorarios,
        searchResults,
        setSearchResults,
    });

    useEffect(() => {
        fetchHorarios();
    }, [fetchHorarios]);

    const noHorarios = horarios.length === 0;
    const noSearchResults = searchResults.length === 0 && !noHorarios;

    return (
        <div>
            <h1>Horarios</h1>

            {/* Crear horario */}
            <h3>Crear Horario</h3>
            <HorarioForm onCreate={handleCreate} loading={loadingCreate} />

            {/* Buscar horario */}
            <h3>Buscar Horario</h3>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                        searchFilter === "id"
                            ? "Buscar por ID"
                            : searchFilter === "curso"
                            ? "Buscar por Curso"
                            : "Buscar horario"
                    }
                    style={{ flex: "1" }}
                />
                <select
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    style={{
                        maxWidth: "200px",
                        minWidth: "150px",
                        height: "38px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        padding: "5px",
                    }}
                >
                    <option value="">--Seleccionar filtro--</option>
                    <option value="id">Buscar horario por ID</option>
                    <option value="curso">Buscar horario por Curso</option>
                </select>
            </div>

            {/* Lista de horarios */}
            <h3>Lista de Horarios</h3>
            {loadingSearch || loadingHorarios ? (
                <p>Cargando horarios...</p>
            ) : errorSearch ? (
                <p style={{ color: "red" }}>{errorSearch}</p>
            ) : noHorarios ? (
                <p>No hay horarios registrados.</p>
            ) : noSearchResults ? (
                <p>No se encontraron horarios que coincidan con tu búsqueda.</p>
            ) : (
                <HorarioTable
                    horarios={searchResults}
                    onDelete={handleDelete}
                    loadingDelete={loadingDelete}
                    onUpdate={handleUpdate}
                    loadingUpdate={loadingUpdate}
                />
            )}
        </div>
    );
}
