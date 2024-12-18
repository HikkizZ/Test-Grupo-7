import React, { useState, useEffect } from "react";
import { useCreateForo } from "@hooks/foro/useCreateForo";
import { useDeleteForo } from "@hooks/foro/useDeleteForo";
import { useGetForos } from "@hooks/foro/useGetForos";
import { useSearchForo } from "@hooks/foro/useSearchForo";
import { useUpdateForo } from "@hooks/foro/useUpdateForo";
import ForoForm from "@components/Foro/ForoForm";
import ForoTable from "@components/Foro/ForoTable";
import ForoView from "@components/Foro/foroView";
import SearchForm from "@components/Foro/SearchFormForo";
import UpdateForoForm from "@components/Foro/UpdateForoForm";
import styles from '@styles/foro.module.css';

export default function Foros() {
    // Hooks personalizados para manejar operaciones CRUD y búsqueda
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

    // Estados locales para manejar la interfaz de usuario
    const [selectedForo, setSelectedForo] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    // Efecto para cargar los foros al montar el componente
    useEffect(() => {
        fetchForos();
    }, [fetchForos]);

    // Handlers para diferentes acciones de usuario
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
        try {
            await handleUpdate(id, updatedData);
            setIsUpdating(false);
            setSelectedForo(null);
            fetchForos();
        } catch (error) {
            console.error("Error al actualizar el foro:", error);
        }
    };

    const handleCreateSubmit = async (foroData) => {
        try {
            await handleCreate(foroData);
            setIsCreating(false);
            fetchForos();
        } catch (error) {
            console.error("Error al crear el foro:", error);
        }
    };
    
    return (
        <div className={styles.forosContainer}>
            <h1 className={styles.forosTitle}>Foros</h1>
    
            <div className={styles.forosActions}>
                <div className={styles.searchAndCreateContainer}>
                    {/* Formulario de búsqueda */}
                    <SearchForm 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        searchFilter={searchFilter}
                        setSearchFilter={setSearchFilter}
                    />
                    {/* Botón para crear nuevo foro */}
                    <button 
                        onClick={() => setIsCreating(!isCreating)}
                        className={`${styles.foroButton} ${styles.foroButtonCreate}`}
                    >
                        {isCreating ? 'Cancelar' : 'Crear Foro'}
                    </button>
                </div>
                {/* Formulario de creación de foro */}
                {isCreating && (
                    <div className={styles.createForoContainer}>
                        <h2 className={styles.createForoTitle}>Crear Foro</h2>
                        <ForoForm 
                            onCreate={handleCreateSubmit} 
                            loading={loadingCreate} 
                            onCancel={() => setIsCreating(false)}
                        />
                    </div>
                )}
            </div>
    
            {/* Formulario de actualización de foro */}
            {selectedForo && isUpdating && (
                <div className={styles.updateForoContainer}>
                    <h2 className={styles.updateForoTitle}>Actualizar Foro</h2>
                    <UpdateForoForm 
                        foro={selectedForo} 
                        onUpdate={handleUpdateSubmit} 
                        onCancel={handleCloseView}
                        loading={loadingUpdate}
                    />
                </div>
            )}

            {/* Sección de lista de foros */}
            <section className={styles.forosListSection}>
                <h2 className={styles.forosListTitle}>Lista de Foros</h2>
                {loadingForos ? (
                    <p className={styles.loadingText}>Cargando foros...</p>
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

            {/* Vista detallada de un foro */}
            {selectedForo && !isUpdating && (
                <ForoView foro={selectedForo} onClose={handleCloseView} />
            )}
        </div>
    );
}