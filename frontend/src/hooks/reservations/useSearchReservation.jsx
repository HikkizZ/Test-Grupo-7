import { useState, useEffect } from "react";
import { parse } from "date-fns";

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
                    (reservation) => reservation.devuelto.toString() === searchFilters.devuelto
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
                const fechaDesde = parse(searchFilters.fechaDesde, "dd-MM-yyyy HH:mm", new Date());
                filteredResults = filteredResults.filter(
                    (reservation) =>
                        parse(reservation.fechaDesde, "dd-MM-yyyy HH:mm", new Date()) >= fechaDesde
                );
            }

            if (searchFilters.fechaHasta) {
                const fechaHasta = parse(searchFilters.fechaHasta, "dd-MM-yyyy HH:mm", new Date());
                filteredResults = filteredResults.filter(
                    (reservation) =>
                        parse(reservation.fechaHasta, "dd-MM-yyyy HH:mm", new Date()) <= fechaHasta
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