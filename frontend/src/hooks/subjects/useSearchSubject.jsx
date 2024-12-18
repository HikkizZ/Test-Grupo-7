import { useState, useEffect } from "react";

export function useSearchSubject(subjects) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [searchResults, setSearchResults] = useState(subjects || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const performSearch = async () => {
            setLoading(true);
            setError(null);

            try {
                let filteredResults = [];
                
                if (!searchQuery) {
                    filteredResults = subjects;
                } else {
                    if (searchFilter === "code") {
                        filteredResults = subjects.filter((subject) => subject.code.toLowerCase().includes(searchQuery.toLowerCase()));
                    } else if (searchFilter === "name") {
                        filteredResults = subjects.filter((subject) => subject.name.toLowerCase().includes(searchQuery.toLowerCase()));
                    }
                }
                setSearchResults(filteredResults);
            } catch (error) {
                console.error("Error al buscar las asignaturas:", error);
                setError(error.message || "Ocurrió un error al buscar las asignaturas");
            } finally {
                setLoading(false);
            }
        };
        performSearch();
    }, [searchQuery, searchFilter, subjects]);

    return { searchQuery, setSearchQuery, searchResults, searchFilter, setSearchFilter, loading, error };
}