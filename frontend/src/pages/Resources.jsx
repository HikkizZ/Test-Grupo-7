import { useEffect, useState } from "react";
import { useCreateResource } from "../hooks/resources/useCreateResource";
import { useGetResources } from "../hooks/resources/useGetResources";
import { useSearchResource } from "../hooks/resources/useSearchResource";
import { useUpdateResource } from "../hooks/resources/useUpdateResource";
import { useDeleteResource } from "../hooks/resources/useDeleteResource";
import ResourceForm from "../components/resources/ResourceForm";
import ResourceTable from "../components/resources/ResourceTable";

export default function Resources() {
    const { resources, fetchResources, loading: loadingResources } = useGetResources();
    const { handleCreate, loading: loadingCreate } = useCreateResource(fetchResources);
    const { handleUpdate, loading: loadingUpdate } = useUpdateResource(fetchResources);

    const [searchResults, setSearchResults] = useState(resources); // Estado de resultados de búsqueda

    const {
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        searchResults: filteredResults,
        loading: loadingSearch,
        error: errorSearch,
    } = useSearchResource(resources);

    // Combinar resultados de búsqueda con el estado de eliminación
    useEffect(() => {
        setSearchResults(filteredResults);
    }, [filteredResults]);

    // Usar el hook de eliminación con los estados principales
    const { handleDelete, loading: loadingDelete } = useDeleteResource({
        resources,
        setResources: fetchResources, // Reutilizar la lógica de fetchResources para mantener la consistencia
        searchResults,
        setSearchResults,
    });

    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

    // Determinar los mensajes correctos
    const noResources = resources.length === 0; // No hay recursos registrados
    const noSearchResults = searchResults.length === 0 && !noResources; // No coincidencias en la búsqueda

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <h1>Recursos</h1>

            {/* Crear recurso */}
            <h3>Crear Recurso</h3>
            <ResourceForm onCreate={handleCreate} loading={loadingCreate} />

            {/* Buscar recurso */}
            <h3>Buscar Recurso</h3>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center" }}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                        searchFilter === "id"
                            ? "Buscar por ID"
                            : searchFilter === "name"
                            ? "Buscar por Nombre"
                            : "Buscar recurso"
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
                    <option value="id">Buscar recurso por ID</option>
                    <option value="name">Buscar recurso por Nombre</option>
                </select>
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery("")}
                        style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            padding: "10px 15px",
                            cursor: "pointer",
                        }}
                    >
                        Ver Todos los Recursos
                    </button>
                )}
            </div>

            {/* Lista de recursos */}
            <h3>Lista de Recursos</h3>
            {loadingSearch || loadingResources ? (
                <p>Cargando recursos...</p>
            ) : errorSearch ? (
                <p style={{ color: "red" }}>{errorSearch}</p>
            ) : noResources ? (
                // Mostrar mensaje si no hay recursos
                <p>No hay recursos registrados.</p>
            ) : noSearchResults ? (
                // Mostrar mensaje si no hay resultados de búsqueda
                <p>No se encontraron recursos que coincidan con tu búsqueda.</p>
            ) : (
                // Mostrar la tabla de recursos
                <ResourceTable
                    resources={searchResults}
                    onDelete={handleDelete}
                    loadingDelete={loadingDelete}
                    onUpdate={handleUpdate}
                    loadingUpdate={loadingUpdate}
                />
            )}
        </div>
    );
}
