import { useEffect } from "react";
import { useCreateResource } from "../hooks/resources/useCreateResource";
import { useDeleteResource } from "../hooks/resources/useDeleteResource";
import { useGetResources } from "../hooks/resources/useGetResources";
import { useSearchResource } from "../hooks/resources/useSearchResource";
import { useUpdateResource } from "../hooks/resources/useUpdateResource"; // Importamos el hook de update
import ResourceForm from "../components/resources/ResourceForm";
import ResourceTable from "../components/resources/ResourceTable";

export default function Resources() {
    const { resources, fetchResources, loading: loadingResources } = useGetResources();
    const { handleCreate, loading: loadingCreate } = useCreateResource(fetchResources);
    const { handleDelete, loading: loadingDelete } = useDeleteResource(fetchResources);
    const { handleUpdate, loading: loadingUpdate } = useUpdateResource(fetchResources); // Usamos el hook de update
    const {
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        searchResults,
        loading: loadingSearch,
        error: errorSearch,
    } = useSearchResource(resources);

    // Cargar recursos al montar el componente
    useEffect(() => {
        fetchResources(); // Ahora `fetchResources` es estable
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
            <div>
                <label>
                    Selecciona un filtro:
                    <select value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}>
                        <option value="">--Seleccionar filtro--</option>
                        <option value="id">Buscar por ID</option>
                        <option value="name">Buscar por Nombre</option>
                    </select>
                </label>
                <br />
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
                />
            </div>

            {/* Lista de recursos */}
            <h3>Lista de Recursos</h3>
            {loadingSearch || loadingResources ? (
                <p>Cargando recursos...</p>
            ) : errorSearch ? (
                <p style={{ color: "red" }}>{errorSearch}</p>
            ) : (
                <ResourceTable
                    resources={searchResults}
                    onDelete={handleDelete}
                    loadingDelete={loadingDelete}
                    onUpdate={handleUpdate} // Pasamos la función de update a la tabla
                    loadingUpdate={loadingUpdate} // Pasamos el estado de carga de update
                />
            )}
        </div>
    );
}
