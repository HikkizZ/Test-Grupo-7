import { useState, useEffect } from "react";
import Swal from "sweetalert2";

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
                let filteredResults = [];

                if (!searchQuery) {
                    filteredResults = rooms;
                } else {
                    switch (searchFilter) {
                        case "id":
                            filteredResults = rooms.filter((room) =>
                                room.id.toString().includes(searchQuery)
                            );
                            break;
                        case "name":
                            filteredResults = rooms.filter((room) =>
                                room.name.toLowerCase().includes(searchQuery.toLowerCase())
                            );
                            break;
                        case "size":
                            filteredResults = rooms.filter((room) =>
                                room.size.includes(searchQuery)
                            );
                            break;
                        case "roomType":
                            filteredResults = rooms.filter((room) =>
                                room.roomType.toLowerCase().includes(searchQuery.toLowerCase())
                            );
                            break;
                        default:
                            filteredResults = rooms.filter((room) =>
                                `${room.id} ${room.name.toLowerCase()} ${room.size} ${room.roomType.toLowerCase()}`.includes(
                                    searchQuery.toLowerCase()
                                )
                            );
                            break;
                    }
                }

                setSearchResults(filteredResults);
            } catch (err) {
                console.error("Error en búsqueda automática:", err);
                setError("Error al buscar salas.");
            } finally {
                setLoading(false);
            }
        };

        performSearch();
    }, [searchQuery, searchFilter, rooms]);

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