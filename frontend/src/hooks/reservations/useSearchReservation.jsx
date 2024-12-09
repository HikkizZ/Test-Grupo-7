import { useState, useEffect } from "react";

export function useSearchReservation(reservations) {
    const [searchFilters, setSearchFilters] = useState({
        id: "",
        devuelto: "",
        tipoReserva: "",
        estado: "",
    });
    const [searchResults, setSearchResults] = useState(reservations || []);
    // const [loading, setLoading] = useState(false); 
    // const [error, setError] = useState(null);

    useEffect(() => {
        const filterReservations = () => {
            let filteredResults = reservations;

            // Aplicar filtros dinámicamente
            if (searchFilters.id) {
                filteredResults = filteredResults.filter((reservation) =>
                    reservation.id.toString().includes(searchFilters.id)
                );
            }

            if (searchFilters.devuelto) {
                filteredResults = filteredResults.filter(
                    (reservation) =>
                        reservation.devuelto.toString() === searchFilters.devuelto
                );
            }

            if (searchFilters.tipoReserva) {
                filteredResults = filteredResults.filter(
                    (reservation) => reservation.tipoReserva === searchFilters.tipoReserva
                );
            }

            if (searchFilters.estado) {
                filteredResults = filteredResults.filter(
                    (reservation) => reservation.estado === searchFilters.estado
                );
            }

            setSearchResults(filteredResults);
        };

        filterReservations();
    }, [searchFilters, reservations]);

    const updateFilter = (filter, value) => {
        setSearchFilters((prevFilters) => ({
            ...prevFilters,
            [filter]: value,
        }));
    };

    const resetFilters = () => {
        setSearchFilters({
            id: "",
            devuelto: "",
            tipoReserva: "",
            estado: "",
        });
    };

    return {
        searchFilters,
        updateFilter,
        resetFilters,
        searchResults,
        //loading,
        //error,
    };
}
