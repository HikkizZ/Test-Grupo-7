import React from "react";
import { useCreateForo } from "@hooks/foro/useCreateForo";
import { useDeleteForo } from "@hooks/foro/useDeleteForo";
import { useGetForos } from "@hooks/foro/useGetForos";
import { useSearchForo } from "@hooks/foro/useSearchForo";
import ForoForm from "@components/Foro/ForoForm";
import ForoTable from "@components/Foro/ForoTable";
import SearchForm from "@components/Foro/SearchFormForo";

import '../styles/Foro.css';

export default function Foros() {
    const { foros, fetchForos, loading: loadingForos } = useGetForos();
    const { handleCreate, loading: loadingCreate } = useCreateForo(fetchForos);
    const { handleDelete, loading: loadingDelete } = useDeleteForo(fetchForos);
    const { 
        searchQuery, 
        setSearchQuery, 
        searchFilter, 
        setSearchFilter, 
        searchResults 
    } = useSearchForo(foros);

    return (
        <div className="foros-container">
            <h1>Foros</h1>

            <h3>Crear Foro</h3>
            <ForoForm onCreate={handleCreate} loading={loadingCreate} />

            <h3>Buscar Foros</h3>
            <SearchForm 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
            />

            <h3>Lista de Foros</h3>
            {loadingForos ? (
                <p>Cargando foros...</p>
            ) : (
                <ForoTable
                    foros={searchResults}
                    onDelete={handleDelete}
                    loadingDelete={loadingDelete}
                />
            )}
        </div>
    );
}
