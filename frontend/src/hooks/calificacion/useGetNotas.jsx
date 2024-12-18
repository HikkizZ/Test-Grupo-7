import { useState, useCallback } from "react";
import { getNotasAlumno } from "@services/calificacion.service";

export function useGetNotas() {
    const [notas, setNotas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchNotas = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getNotasAlumno();
            // En caso de no haber notas
            console.log('useGetNotas -> response:', response);
            setNotas(response);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || "Ocurrió un error al obtener las notas");
        } finally {
            setLoading(false);
        }
    }, []);

    return { notas, loading, error, fetchNotas };
}