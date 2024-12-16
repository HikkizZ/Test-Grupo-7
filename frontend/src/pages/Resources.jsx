import { useEffect, useState } from "react";
import { useCreateResource } from "../hooks/resources/useCreateResource";
import { useGetResources } from "../hooks/resources/useGetResources";
import { useSearchResource } from "../hooks/resources/useSearchResource";
import { useUpdateResource } from "../hooks/resources/useUpdateResource";
import { useDeleteResource } from "../hooks/resources/useDeleteResource";
import ResourceTable from "../components/resources/ResourceTable";
import ResourceForm from "../components/resources/ResourceForm";

export default function Resources() {
    const { resources, fetchResources, loading: loadingResources } = useGetResources();
    const { handleCreate, loading: loadingCreate } = useCreateResource(fetchResources);
    const { handleUpdate, loading: loadingUpdate } = useUpdateResource(fetchResources);

    const [searchResults, setSearchResults] = useState(resources); // Estado de resultados de búsqueda
    const [showCreateModal, setShowCreateModal] = useState(false); // Control de visibilidad del modal

    const {
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        searchResults: filteredResults,
        resetSearch,
        loading: loadingSearch,
        error: errorSearch,
    } = useSearchResource(resources);

    useEffect(() => {
        setSearchResults(filteredResults);
    }, [filteredResults]);

    const { handleDelete, loading: loadingDelete } = useDeleteResource({
        resources,
        setResources: fetchResources,
        searchResults,
        setSearchResults,
    });

    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

    const noResources = resources.length === 0;
    const noSearchResults = searchResults.length === 0 && !noResources;

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <h1>Recursos</h1>

            {/* Buscar recurso */}
            <h3>Buscar Recurso</h3>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
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
                        onClick={resetSearch}
                        style={{
                            height: "38px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            cursor: "pointer",
                        }}
                    >
                        Ver Todos los Recursos
                    </button>
                )}
            </div>

            {/* Lista de recursos y botón Crear */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
                <h3>Lista de Recursos</h3>
                <button
                    onClick={() => setShowCreateModal(true)}
                    style={{
                        height: "38px",
                        backgroundColor: "#28a745", // Color verde
                        color: "#fff", // Texto blanco
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px 15px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    Crear Recurso
                </button>
            </div>

            {loadingSearch || loadingResources ? (
                <p>Cargando recursos...</p>
            ) : errorSearch ? (
                <p style={{ color: "red" }}>{errorSearch}</p>
            ) : noResources ? (
                <p>No hay recursos registrados.</p>
            ) : noSearchResults ? (
                <p>No se encontraron recursos que coincidan con tu búsqueda.</p>
            ) : (
                <ResourceTable
                    resources={searchResults}
                    onDelete={handleDelete}
                    loadingDelete={loadingDelete}
                    onUpdate={handleUpdate}
                    loadingUpdate={loadingUpdate}
                />
            )}

            {/* Modal para Crear Recurso */}
            {showCreateModal && (
                <ResourceForm
                    onCreate={handleCreate}
                    loading={loadingCreate}
                    onClose={() => setShowCreateModal(false)} // Manejo del cierre del modal
                />
            )}
        </div>
    );
}
