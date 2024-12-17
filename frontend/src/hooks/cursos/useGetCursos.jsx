import { useState, useCallback } from "react";
import { getCursos } from "@services/curso.service";

export function useGetCursos() {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCursos = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getCursos();
            // Ordenar cursos por código
            response.cursos.sort((a, b) => a.code.localeCompare(b.code));
            setCursos(response.cursos);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || "Ocurrió un error al obtener los cursos");
        } finally {
            setLoading(false);
        }
    } , []);

    return { cursos, loading, error, fetchCursos };
}