import { useState, useCallback } from "react";
import { getReservations } from "@services/reservation.service";

export function useGetReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReservations = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getReservations();
            // Ordenar las reservaciones por ID en caso de que el backend no lo haga
            const sortedReservations = response.sort((a, b) => a.id - b.id);
            setReservations(sortedReservations);
        } catch (err) {
            setError(err.message || "Error al obtener las reservaciones");
        } finally {
            setLoading(false);
        }
    }, []);

    return { reservations, fetchReservations, loading, error };
}
