import { useEffect } from "react";
import { useCreateResource } from "../hooks/resources/useCreateResource";
import { useDeleteResource } from "../hooks/resources/useDeleteResource";
import { useGetResources } from "../hooks/resources/useGetResources";
import { useSearchResource } from "../hooks/resources/useSearchResource";
import { useUpdateResource } from "../hooks/resources/useUpdateResource";
import ResourceForm from "../components/resources/ResourceForm";
import ResourceTable from "../components/resources/ResourceTable";

export default function Resources() {
    const { resources, fetchResources, loading: loadingResources } = useGetResources();
    const { handleCreate, loading: loadingCreate } = useCreateResource(fetchResources);
    const { handleDelete, loading: loadingDelete } = useDeleteResource(fetchResources);
    const { handleUpdate, loading: loadingUpdate } = useUpdateResource(fetchResources);
    const {
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        searchResults,
        loading: loadingSearch,
        error: errorSearch,
    } = useSearchResource(resources);

    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

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
            </div>

            {/* Lista de recursos */}
            <h3>Lista de Recursos</h3>
            {loadingSearch || loadingResources ? (
                <p>Cargando recursos...</p>
            ) : errorSearch ? (
                <p style={{ color: "red" }}>{errorSearch}</p>
            ) : resources.length === 0 ? (
                // Si no hay recursos en la tabla
                <p>No hay recursos registrados.</p>
            ) : searchResults.length === 0 ? (
                // Si no hay resultados en la búsqueda
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
        </div>
    );
}
