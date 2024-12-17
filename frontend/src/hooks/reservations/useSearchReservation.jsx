import { useState, useEffect } from "react";

export function useSearchReservation(reservations) {
    const [searchFilters, setSearchFilters] = useState({
        id: "",
        devuelto: "",
        tipoReserva: "",
        estado: "",
        fechaDesde: "",
        fechaHasta: "",
    });
    const [searchResults, setSearchResults] = useState(reservations || []);

    useEffect(() => {
        const filterReservations = () => {
            let filteredResults = reservations;

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

            if (searchFilters.fechaDesde) {
                filteredResults = filteredResults.filter(
                    (reservation) => reservation.fechaDesde.startsWith(searchFilters.fechaDesde)
                );
            }

            if (searchFilters.fechaHasta) {
                filteredResults = filteredResults.filter(
                    (reservation) => reservation.fechaHasta.startsWith(searchFilters.fechaHasta)
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
            fechaDesde: "",
            fechaHasta: "",
        });
    };

    return {
        searchFilters,
        updateFilter,
        resetFilters,
        searchResults,
    };
}