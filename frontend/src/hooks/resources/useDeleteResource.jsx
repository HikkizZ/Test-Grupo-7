import { useState } from "react";
import { deleteResource } from "@services/resource.service";
import { deleteDataAlert, showSuccessAlert } from "../../utils/alerts";

export function useDeleteResource(fetchResources, resources) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        try {
            const result = await deleteDataAlert();
            if (result.isConfirmed) {
                setLoading(true);

                // Eliminar recurso del backend
                await deleteResource(id);

                // Mostrar alerta de éxito
                showSuccessAlert("¡Recurso eliminado!", "El recurso ha sido eliminado correctamente");

                // Actualizar recursos o recargar si es el último
                if (resources.length === 1) {
                    window.location.reload(); // Recargar página si no hay más recursos
                } else {
                    fetchResources(); // Actualizar tabla si quedan recursos
                }
            }
        } catch (error) {
            alert("Error al eliminar el recurso: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return { handleDelete, loading };
}
