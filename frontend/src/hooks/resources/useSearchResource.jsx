import { useState, useEffect } from "react";

export function useSearchResource(resources) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [searchResults, setSearchResults] = useState(resources || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const resetSearch = () => {
        setSearchQuery("");
        setSearchFilter("");
        setSearchResults(resources); // Restablecer a todos los recursos
    };

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

    return {
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        searchResults,
        resetSearch, // Exportar método
        loading,
        error,
    };
}
