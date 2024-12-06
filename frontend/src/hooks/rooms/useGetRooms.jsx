import { useState, useCallback } from "react";
import { getRooms } from "@services/room.service";

export function useGetRooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRooms = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getRooms();
            setRooms(response);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || "Error al obtener las salas");
        }
    }, []); // useCallback asegura que la referencia de la función no cambie

    return { rooms, fetchRooms, loading, error };
}
