import { useState } from "react";
import { deleteResource } from "@services/resource.service";
import { deleteDataAlert, showSuccessAlert } from "../../utils/alerts";

export function useDeleteResource(fetchResources) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        try {
            const result = await deleteDataAlert();
            if (result.isConfirmed) {
                setLoading(true);
                await deleteResource(id);
                showSuccessAlert("¡Recurso eliminado!", "El recurso ha sido eliminado correctamente");
                fetchResources();
            }
        } catch (error) {
            alert("Error al eliminar el recurso: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return { handleDelete, loading };
}
