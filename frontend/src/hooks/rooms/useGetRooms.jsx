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

            // Formatear las salas para asegurar que "size" incluye "m²"
            const formattedRooms = response.map((room) => ({
                ...room,
                size: room.size.endsWith("m²") ? room.size : `${room.size} m²`,
            }));

            setRooms(formattedRooms);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || "Error al obtener las salas");
        }
    }, []);

    return { rooms, fetchRooms, loading, error };
}