import { useEffect, useState } from "react";
import ResourceSearch from "../components/resources/ResourceSearch";
import ResourceTable from "../components/resources/ResourceTable";
import ResourceForm from "../components/resources/ResourceForm";
import { useCreateResource } from "../hooks/resources/useCreateResource";
import { useGetResources } from "../hooks/resources/useGetResources";
import { useUpdateResource } from "../hooks/resources/useUpdateResource";
import { useDeleteResource } from "../hooks/resources/useDeleteResource";
import { useAuth } from "../context/AuthContext";
import "../styles/around.css"; 

export default function Resources() {
    const { user } = useAuth(); 
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

    const handleSearch = (query) => {
        setFilteredResources(
            resources.filter((resource) =>
                `${resource.name.toLowerCase()} ${resource.brand.toLowerCase()} ${resource.resourceType.toLowerCase()}`
                    .includes(query.toLowerCase())
            )
        );
    };

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
        <div className="around-container">
        {/* Título principal centrado */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <h1 className="around-header">
                <br />
                <br />
                Recursos</h1>
        </div>

            {/* Buscar Recurso */}
            <div className="around-section">
                <h3 className="around-subtitle">Buscar Recurso</h3>
                <ResourceSearch
                    onSearch={handleSearch}
                    onFilterUpdate={handleFilterUpdate} 
                    onReset={handleResetFilters} 
                    loading={loadingResources}
                />
            </div>

            {/* Lista de Recursos */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <h3>Lista de Recursos</h3>
                {["admin", "Encargado"].includes(user?.role) && (
                    <div className="create-button-container">
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="create-button"
                        >
                            Crear Recurso
                        </button>
                    </div>
                )}
            </div>

            <ResourceTable
                resources={filteredResources.length ? filteredResources : resources} 
                onUpdate={["admin", "Encargado"].includes(user?.role) ? handleUpdate : null}
                onDelete={user?.role === "admin" ? handleDelete : null}
                loadingUpdate={loadingUpdate}
                loadingDelete={loadingDelete}
                role={user?.role}
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