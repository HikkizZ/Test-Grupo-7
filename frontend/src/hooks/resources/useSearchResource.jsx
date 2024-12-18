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

    const handleQueryChange = (query) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (filter) => {
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