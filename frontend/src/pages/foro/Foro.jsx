import React, { useState, useEffect } from "react";
import { useCreateForo } from "@hooks/foro/useCreateForo";
import { useDeleteForo } from "@hooks/foro/useDeleteForo";
import { useGetForos } from "@hooks/foro/useGetForos";
import { useUpdateForo } from "@hooks/foro/useUpdateForo";
import { useSearchForo } from "@hooks/foro/useSearchForo";
import ForoForm from "@components/Foro/ForoForm";
import ForoTable from "@components/Foro/ForoTable";
import ForoView from "@components/Foro/ForoView";
import SearchForm from "@components/Foro/SearchFormForo";
import UpdateForoForm from "@components/Foro/UpdateForoForm";

export default function Foros() {
    const { foros, fetchForos, loading: loadingForos } = useGetForos();
    const { handleCreate, loading: loadingCreate } = useCreateForo(fetchForos);
    const { handleDelete, loading: loadingDelete } = useDeleteForo(fetchForos);
    const { handleUpdate, loading: loadingUpdate } = useUpdateForo(fetchForos);
    const { 
        searchQuery, 
        setSearchQuery, 
        searchFilter, 
        setSearchFilter, 
        searchResults 
    } = useSearchForo(foros);

    const [selectedForo, setSelectedForo] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        fetchForos();
    }, [fetchForos]);

    const handleView = (foro) => {
        setSelectedForo(foro);
        setIsUpdating(false);
    };

    const handleUpdateClick = (foro) => {
        setSelectedForo(foro);
        setIsUpdating(true);
    };

    const handleCloseView = () => {
        setSelectedForo(null);
        setIsUpdating(false);
    };

    const handleUpdateSubmit = async (id, updatedData) => {
        await handleUpdate(id, updatedData);
        setIsUpdating(false);
        setSelectedForo(null);
    };
    
    return (
        <div className="foros-container p-4">
            <h1 className="text-3xl font-bold mb-6">Foros</h1>
    
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Crear Foro</h2>
                <ForoForm onCreate={handleCreate} loading={loadingCreate} />
            </section>
    
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Buscar Foros</h2>
                <SearchForm 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    searchFilter={searchFilter}
                    setSearchFilter={setSearchFilter}
                />
            </section>
    
            <section>
                <h2 className="text-2xl font-semibold mb-4">Lista de Foros</h2>
                {loadingForos ? (
                    <p>Cargando foros...</p>
                ) : (
                    <ForoTable
                        foros={searchResults}
                        onDelete={handleDelete}
                        loadingDelete={loadingDelete}
                        onView={handleView}
                        onUpdate={handleUpdateClick}
                    />
                )}
            </section>

            {selectedForo && !isUpdating && (
                <ForoView foro={selectedForo} onClose={handleCloseView} />
            )}

            {selectedForo && isUpdating && (
                <UpdateForoForm 
                    foro={selectedForo} 
                    onUpdate={handleUpdateSubmit} 
                    onCancel={handleCloseView}
                    loading={loadingUpdate}
                />
            )}
        </div>
    );
}

