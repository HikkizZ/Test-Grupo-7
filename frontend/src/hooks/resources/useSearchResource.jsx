import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export function useSearchResource(resources) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [searchResults, setSearchResults] = useState(resources || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const performSearch = async () => {
            setLoading(true);
            setError(null);

            try {
                let filteredResults = [];

                if (!searchQuery) {
                    filteredResults = resources;
                } else {
                    if (searchFilter === "id") {
                        filteredResults = resources.filter((resource) =>
                            resource.id.toString().includes(searchQuery)
                        );
                    } else if (searchFilter === "name") {
                        filteredResults = resources.filter((resource) =>
                            resource.name.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                    } else {
                        filteredResults = resources.filter((resource) =>
                            `${resource.id} ${resource.name.toLowerCase()}`.includes(searchQuery.toLowerCase())
                        );
                    }
                }

                setSearchResults(filteredResults);
            } catch (err) {
                console.error("Error en búsqueda automática:", err);
                setError("Error al buscar recursos.");
            } finally {
                setLoading(false);
            }
        };

        performSearch();
    }, [searchQuery, searchFilter, resources]);

    const handleQueryChange = (query) => {
        if (searchFilter === "id" && !/^\d*$/.test(query)) {
            Swal.fire({
                icon: "error",
                title: "Error de búsqueda",
                text: "El ID debe contener solo números.",
            }).then(() => {
                const inputElement = document.querySelector('input[type="text"]');
                if (inputElement) {
                    inputElement.focus();
                    inputElement.setSelectionRange(searchQuery.length, searchQuery.length);
                }
            });
            return;
        }
        setSearchQuery(query);
    };

    const handleFilterChange = (filter) => {
        if (filter === "id" && /\D/.test(searchQuery)) {
            Swal.fire({
                icon: "info",
                title: "Búsqueda restablecida",
                text: "El buscador ha sido limpiado porque el filtro 'ID' acepta solo números.",
            });
            setSearchQuery(""); // Limpia el buscador si contiene letras
        }
        setSearchFilter(filter);
    };

    const resetSearch = () => {
        setSearchQuery("");
        setSearchResults(resources);
        setSearchFilter("");
    };

    return {
        searchQuery,
        setSearchQuery: handleQueryChange,
        searchFilter,
        setSearchFilter: handleFilterChange,
        searchResults,
        resetSearch,
        loading,
        error,
    };
}
