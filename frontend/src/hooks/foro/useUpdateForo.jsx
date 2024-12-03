import { useState } from "react";
import { updateForo } from "../../services/foro.service";

export function useUpdateForo(fetchForos) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (id, foroData) => {
        setLoading(true);
        try {
            await updateForo(id, foroData); // Llamar al servicio para actualizar el foro
            fetchForos(); // Actualizar la lista de foros
        } catch (error) {
            console.error("Error al actualizar el foro", error);
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdate, loading };
}
