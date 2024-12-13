import { useState, useEffect } from "react";

export function useSearchHorario(horarios) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [searchResults, setSearchResults] = useState(horarios || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const performSearch = async () => {
            setLoading(true);
            setError(null);

            try {
                let filteredResults = [];

                if (!searchQuery) {
                    filteredResults = horarios; // Mostrar todos los horarios si no hay query
                } else {
                    if (searchFilter === "id") {
                        filteredResults = horarios.filter((horario) =>
                            horario.id.toString().includes(searchQuery)
                        );
                    } else if (searchFilter === "curso") {
                        filteredResults = horarios.filter((horario) =>
                            horario.curso.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                    } else {
                        // Buscar por ambos (ID y curso)
                        filteredResults = horarios.filter((horario) =>
                            `${horario.id} ${horario.curso.toLowerCase()}`.includes(searchQuery.toLowerCase())
                        );
                    }
                }

                setSearchResults(filteredResults);
            } catch (err) {
                console.error("Error en búsqueda automática:", err);
                setError("Error al buscar horarios.");
            } finally {
                setLoading(false);
            }
        };

        performSearch();
    }, [searchQuery, searchFilter, horarios]);

    return {
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        searchResults,
        loading,
        error,
    };
}
