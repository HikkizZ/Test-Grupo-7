import { useState, useEffect } from "react";

export function useSearchCurso(cursos) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState(cursos || []);
    const [searchFilter, setSearchFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const performSearch = async () => {
            setLoading(true);
            setError(null);

            try {
                let filteredResults = [];

                if (!searchQuery) {
                    filteredResults = cursos;
                } else {
                    if (searchFilter === "code") {
                        filteredResults = cursos.filter((curso) => curso.code.toLowerCase().includes(searchQuery.toLowerCase()));
                    } else if (searchFilter === "name") {
                        filteredResults = cursos.filter((curso) => curso.name.toLowerCase().includes(searchQuery.toLowerCase()));
                    } else if (searchFilter === "level") {
                        filteredResults = cursos.filter((curso) => curso.level.toString().includes(searchQuery));
                    } else if (searchFilter === "year") {
                        filteredResults = cursos.filter((curso) => curso.year.toString().includes(searchQuery));
                    } else {
                        filteredResults = cursos.filter((curso) => curso.code.toLowerCase().includes(searchQuery.toLowerCase()) || curso.name.toLowerCase().includes(searchQuery.toLowerCase()));
                    }
                }

                setSearchResults(filteredResults);
            } catch (error) {
                console.error("Error al buscar los cursos:", error);
                setError(error.message || "Ocurrió un error al buscar los cursos");
            } finally {
                setLoading(false);
            }
        };
        performSearch();
    }, [searchQuery, searchFilter, cursos]);

    return { searchQuery, setSearchQuery, searchResults, searchFilter, setSearchFilter, loading, error };
};