import { useState } from "react";
import { deleteForo } from "../../services/foro.service";

export function useDeleteForo(fetchForos) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await deleteForo(id); // Llamar al servicio para eliminar el foro
            fetchForos(); // Actualizar la lista de foros
        } catch (error) {
            console.error("Error al eliminar el foro", error);
        } finally {
            setLoading(false);
        }
    };

    return { handleDelete, loading };
}