import { useState } from "react";
import { deleteResource } from "@services/resource.service";
import { deleteDataAlert, showSuccessAlert, showErrorAlert } from "../../utils/alerts";

export function useDeleteResource({ setResources, setSearchResults = null }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        try {
            const result = await deleteDataAlert();
            if (result.isConfirmed) {
                setLoading(true);

                // Llamar al servicio para eliminar el recurso
                await deleteResource(id);

                // Actualizar la lista de recursos
                setResources((prevResources) => prevResources.filter((resource) => resource.id !== id));

                // Actualizar los resultados de búsqueda (si aplica)
                if (setSearchResults) {
                    setSearchResults((prevResults) =>
                        prevResults.filter((resource) => resource.id !== id)
                    );
                }

                // Mostrar alerta de éxito
                showSuccessAlert("¡Recurso eliminado!", "El recurso ha sido eliminado correctamente.");
            }
        } catch (error) {
            showErrorAlert(
                "Error al eliminar el recurso",
                error.response?.data?.message || error.message || "Hubo un problema al eliminar el recurso."
            );
        } finally {
            setLoading(false);
        }
    };

    return { handleDelete, loading };
}