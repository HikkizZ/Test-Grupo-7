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
                    switch (searchFilter) {
                        case "teacherRut":
                            filteredResults = horarios.filter((horario) =>
                                horario.teacher?.rut
                                    ?.toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                            );
                            break;
                        case "teacherName":
                            filteredResults = horarios.filter((horario) =>
                                horario.teacher?.name
                                    ?.toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                            );
                            break;
                        case "cursoName":
                            filteredResults = horarios.filter((horario) =>
                                horario.curso?.name
                                    ?.toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                            );
                            break;
                        case "cursoCode":
                            filteredResults = horarios.filter((horario) =>
                                horario.curso?.code
                                    ?.toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                            );
                            break;
                        case "id":
                            filteredResults = horarios.filter((horario) =>
                                horario.id.toString().includes(searchQuery)
                            );
                            break;
                        default:
                            break;
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
