import { useEffect, useState } from "react";
import ResourceSearch from "../components/resources/ResourceSearch";
import ResourceTable from "../components/resources/ResourceTable";
import ResourceForm from "../components/resources/ResourceForm";
import { useCreateResource } from "../hooks/resources/useCreateResource";
import { useGetResources } from "../hooks/resources/useGetResources";
import { useUpdateResource } from "../hooks/resources/useUpdateResource";
import { useDeleteResource } from "../hooks/resources/useDeleteResource";

export default function Resources() {
    const { resources, fetchResources, loading: loadingResources } = useGetResources();
    const { handleCreate, loading: loadingCreate } = useCreateResource(fetchResources);
    const { handleUpdate, loading: loadingUpdate } = useUpdateResource(fetchResources);
    const { handleDelete, loading: loadingDelete } = useDeleteResource({
        setResources: fetchResources,
    });

    const [filteredResources, setFilteredResources] = useState([]);
    const [filters, setFilters] = useState({});
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchResources();
    }, [fetchResources]);

    useEffect(() => {
        let results = resources;

        if (filters.name) {
            results = results.filter((resource) =>
                resource.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }
        if (filters.brand) {
            results = results.filter((resource) =>
                resource.brand.toLowerCase().includes(filters.brand.toLowerCase())
            );
        }
        if (filters.resourceType) {
            results = results.filter((resource) => resource.resourceType === filters.resourceType);
        }

        setFilteredResources(results);
    }, [filters, resources]);

    const handleFilterUpdate = (filter, value) => {
        setFilters((prev) => ({
            ...prev,
            [filter]: value.trim(),
        }));
    };

    const handleResetFilters = () => {
        setFilters({});
        setFilteredResources(resources);
    };

    return (
        <div>
            <br />
            <br />
            <br />
            <h1 style={{ textAlign: "center" }}>Recursos</h1>

            {/* Buscar Recurso */}
            <h3>Buscar Recurso</h3>
            <ResourceSearch
                onSearch={(query) =>
                    setFilteredResources(
                        resources.filter((resource) =>
                            `${resource.name.toLowerCase()} ${resource.brand.toLowerCase()} ${resource.resourceType.toLowerCase()}`.includes(
                                query.toLowerCase()
                            )
                        )
                    )
                }
                onFilterUpdate={handleFilterUpdate}
                onReset={handleResetFilters}
                loading={loadingResources}
            />

            {/* Lista de Recursos */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <h3>Lista de Recursos</h3>
                <button
                    onClick={() => setShowCreateModal(true)} // Mostrar el modal
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

            <ResourceTable
                resources={filteredResources}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                loadingUpdate={loadingUpdate}
                loadingDelete={loadingDelete}
            />

            {/* Modal Crear Recurso */}
            {showCreateModal && (
                <ResourceForm
                    onCreate={handleCreate}
                    loading={loadingCreate}
                    onClose={() => setShowCreateModal(false)}
                />
            )}
        </div>
    );
}