import { useState, useCallback } from "react";
import { getSubjects } from '@services/subject.service';

export function useGetSubjects() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSubjects = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getSubjects();
            setSubjects(response.subjects || response);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || "Ocurrió un error al obtener las asignaturas");
        } finally {
            setLoading(false);
        }
    }, []);

    return { subjects, loading, error, fetchSubjects };
};