import { useState, useCallback } from "react";
import { getHorarios } from "@services/horario.service";

export function useGetHorarios() {
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHorarios = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getHorarios(); // Llamada al servicio para obtener los horarios
            setHorarios(response.horarios); // Actualiza la lista con los horarios recibidos
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || "Error al obtener los horarios.");
        }
    }, []);

    return { horarios, fetchHorarios, loading, error };
}
