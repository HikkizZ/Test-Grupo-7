import { useState } from "react";
import { createForo } from "../../services/foro.service";
import { showSuccessAlert } from "../../utils/alerts";

export function useCreateForo(fetchForos) {
    const [loading, setLoading] = useState(false);

    const handleCreate = async (foroData) => {
        setLoading(true);
        try {
            // Ahora foroData es un FormData que incluye los archivos
            await createForo(foroData);
            showSuccessAlert("Foro creado", "El foro ha sido agregado correctamente");
            fetchForos();
        } catch (error) {
            alert("Error al crear el foro: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return { handleCreate, loading };
}