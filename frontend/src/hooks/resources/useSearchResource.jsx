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
                // Mantener el cursor al final del texto después de SweetAlert
                const inputElement = document.querySelector('input[type="text"]');
                if (inputElement) {
                    const currentValue = searchQuery; // Mantener el valor actual
                    inputElement.value = currentValue; // Restaurar el valor al input
                    inputElement.focus(); // Enfocar el input nuevamente
                    inputElement.setSelectionRange(currentValue.length, currentValue.length); // Cursor al final
                }
            });
            return;
        }
        setSearchQuery(query);
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
        setSearchFilter,
        searchResults,
        resetSearch,
        loading,
        error,
    };
}
