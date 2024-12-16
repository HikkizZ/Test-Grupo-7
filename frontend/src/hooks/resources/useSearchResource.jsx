import { useState, useEffect } from "react";

export function useSearchResource(resources) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFilter, setSearchFilter] = useState(""); // Filtro activo
    const [searchResults, setSearchResults] = useState(resources || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const performSearch = async () => {
            setLoading(true);
            setError(null);

            try {
                let filteredResults = resources;

                if (searchQuery) {
                    switch (searchFilter) {
                        case "name":
                            filteredResults = resources.filter((resource) =>
                                resource.name.toLowerCase().includes(searchQuery.toLowerCase())
                            );
                            break;
                        case "brand":
                            filteredResults = resources.filter((resource) =>
                                resource.brand.toLowerCase().includes(searchQuery.toLowerCase())
                            );
                            break;
                        case "resourceType":
                            filteredResults = resources.filter((resource) =>
                                resource.resourceType.toLowerCase().includes(searchQuery.toLowerCase())
                            );
                            break;
                        default:
                            // Búsqueda general si no se selecciona un filtro específico
                            filteredResults = resources.filter((resource) =>
                                `${resource.name.toLowerCase()} ${resource.brand.toLowerCase()} ${resource.resourceType.toLowerCase()}`.includes(
                                    searchQuery.toLowerCase()
                                )
                            );
                            break;
                    }
                }

                setSearchResults(filteredResults);
            } catch (err) {
                console.error("Error en la búsqueda:", err);
                setError("Hubo un problema al realizar la búsqueda.");
            } finally {
                setLoading(false);
            }
        };

        performSearch();
    }, [searchQuery, searchFilter, resources]);

    // Actualizar la consulta de búsqueda
    const handleQueryChange = (query) => {
        setSearchQuery(query);
    };

    // Actualizar el filtro activo
    const handleFilterChange = (filter) => {
        setSearchFilter(filter);
    };

    // Reiniciar la búsqueda
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