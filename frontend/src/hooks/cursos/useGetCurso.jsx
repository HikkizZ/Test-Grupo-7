import { useState } from "react";
import { getCurso } from "../../services/curso.service";

export function useGetCurso() {
    const [curso, setCurso] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCurso = async (cursoId) => {
        try {
            setLoading(true);
            const response = await getCurso(cursoId);
            setCurso(response.curso);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || "Ocurrió un error al obtener el curso");
        } finally {
            setLoading(false);
        }
    };

    return { curso, loading, error, fetchCurso };
}