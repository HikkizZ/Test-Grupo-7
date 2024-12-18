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
            console.log("Salas obtenidas:", response);
    
            const formattedRooms = response.map((room) => ({
                ...room,
                capacity: room.capacity.endsWith("alumnos") ? room.capacity : `${room.capacity} alumnos`,
            }));
    
            setRooms(formattedRooms);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || "Error al obtener las salas");
            console.error("Error al obtener salas:", err); 
        }
    }, []);    

    return { rooms, fetchRooms, loading, error };
}