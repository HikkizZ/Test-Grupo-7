import { useState, useEffect } from "react";

export function useSearchRoom(rooms) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFilter, setSearchFilter] = useState(""); 
    const [searchResults, setSearchResults] = useState(rooms || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const performSearch = async () => {
            setLoading(true);
            setError(null);

            try {
                let filteredResults = rooms;

                if (searchQuery) {
                    switch (searchFilter) {
                        case "name":
                            filteredResults = rooms.filter((room) =>
                                room.name.toLowerCase().includes(searchQuery.toLowerCase())
                            );
                            break;
                        case "capacity":
                            filteredResults = rooms.filter((room) =>
                                room.capacity.replace(" alumnos", "").includes(searchQuery)
                            );
                            break;
                        case "roomType":
                            filteredResults = rooms.filter((room) =>
                                room.roomType.toLowerCase().includes(searchQuery.toLowerCase())
                            );
                            break;
                        default:
                            filteredResults = rooms.filter((room) =>
                                `${room.name.toLowerCase()} ${room.size} ${room.roomType.toLowerCase()}`
                                    .includes(searchQuery.toLowerCase())
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
    }, [searchQuery, searchFilter, rooms]);

    const handleQueryChange = (query) => {
        setSearchQuery(query);
    };

    const handleFilterChange = (filter) => {
        setSearchFilter(filter);
    };

    const resetSearch = () => {
        setSearchQuery("");
        setSearchResults(rooms);
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