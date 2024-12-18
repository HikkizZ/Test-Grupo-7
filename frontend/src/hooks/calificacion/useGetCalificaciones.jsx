import { useState } from "react";
import { getCalificaciones } from "@services/calificacion.service";

export function useGetCalificaciones() {
    const [calificaciones, setCalificaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCalificaciones = async (codeSubject) => {
        try {
            setLoading(true);
            const response = await getCalificaciones(codeSubject);
            console.log("get:", response);
            setCalificaciones(response || []);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || "Ocurrió un error al obtener las calificaciones");
        } finally {
            setLoading(false);
        }
    };

    return { calificaciones, loading, error, fetchCalificaciones };
}