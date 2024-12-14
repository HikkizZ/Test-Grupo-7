import React, { useState, useEffect } from "react";
import { useCreateForo } from "@hooks/foro/useCreateForo";
import { useDeleteForo } from "@hooks/foro/useDeleteForo";
import { useGetForos } from "@hooks/foro/useGetForos";
import { useSearchForo } from "@hooks/foro/useSearchForo";
import { useUpdateForo } from "@hooks/foro/useUpdateForo";
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
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchForos();
    }, []);

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
        fetchForos();
    };

    const handleCreateSubmit = async (foroData) => {
        await handleCreate(foroData);
        setIsCreating(false);
        fetchForos();
    };
    
    return (
        <div className="foros-container p-4">
            <h1 className="text-3xl font-bold mb-6">Foros</h1>
    
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <SearchForm 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        searchFilter={searchFilter}
                        setSearchFilter={setSearchFilter}
                    />
                    <button 
                        onClick={() => setIsCreating(!isCreating)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        {isCreating ? 'Cancelar' : 'Crear Foro'}
                    </button>
                </div>
                {isCreating && (
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Crear Foro</h2>
                        <ForoForm 
                            onCreate={handleCreateSubmit} 
                            loading={loadingCreate} 
                            onCancel={() => setIsCreating(false)}
                        />
                    </div>
                )}
            </div>
    
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