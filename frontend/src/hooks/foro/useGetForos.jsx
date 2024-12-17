import { useState, useCallback } from "react";
import { getForos } from "@services/foro.service";

export function useGetForos() {
    const [foros, setForos] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchForos = useCallback(async (updateFunction) => {
        setLoading(true);
        try {
            if (typeof updateFunction === 'function') {
                // Si se proporciona una función de actualización, úsala
                setForos(updateFunction);
            } else {
                // Si no, obtén todos los foros del servidor
                const response = await getForos();
                if (response && Array.isArray(response)) {
                    setForos(response);
                } else {
                    console.error("Datos inválidos recibidos de la API", response);
                }
            }
        } catch (error) {
            console.error("Error al obtener foros", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { foros, fetchForos, loading };
}

