import { useState, useCallback } from "react";
import { getResources } from "@services/resource.service";

export function useGetResources() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchResources = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getResources();
            setResources(response);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || "Error al obtener los recursos");
        }
    }, []); // useCallback asegura que la referencia de la función no cambie

    return { resources, fetchResources, loading, error };
}
