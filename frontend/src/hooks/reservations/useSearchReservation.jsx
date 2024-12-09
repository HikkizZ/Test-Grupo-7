import { useState, useEffect } from "react";

export function useSearchReservation(reservations) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFilter, setSearchFilter] = useState("");
    const [searchResults, setSearchResults] = useState(reservations || []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const performSearch = () => {
            setLoading(true);

            let filteredResults = [];

            if (!searchQuery) {
                filteredResults = reservations;
            } else {
                if (searchFilter === "id") {
                    filteredResults = reservations.filter((reservation) =>
                        reservation.id.toString().includes(searchQuery)
                    );
                } else if (searchFilter === "estado") {
                    filteredResults = reservations.filter((reservation) =>
                        reservation.estado.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                } else {
                    filteredResults = reservations.filter((reservation) =>
                        `${reservation.id} ${reservation.estado.toLowerCase()}`.includes(searchQuery.toLowerCase())
                    );
                }
            }

            setSearchResults(filteredResults);
            setLoading(false);
        };

        performSearch();
    }, [searchQuery, searchFilter, reservations]);

    const resetSearch = () => {
        setSearchQuery("");
        setSearchResults(reservations);
        setSearchFilter("");
    };

    return {
        searchQuery,
        setSearchQuery,
        searchFilter,
        setSearchFilter,
        searchResults,
        resetSearch,
        loading,
    };
}
