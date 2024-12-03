import { useState } from "react";
import { deleteResource } from "@services/resource.service";
import { deleteDataAlert, showSuccessAlert } from "../../utils/alerts";

export function useDeleteResource({ setResources, setSearchResults }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        try {
            const result = await deleteDataAlert();
            if (result.isConfirmed) {
                setLoading(true);

                // Llamar al servicio para eliminar el recurso
                await deleteResource(id);

                // Actualizar la lista de recursos
                setResources((prevResources) =>
                    prevResources.filter((resource) => resource.id !== id)
                );

                // Actualizar los resultados de búsqueda
                setSearchResults((prevResults) =>
                    prevResults.filter((resource) => resource.id !== id)
                );

                // Mostrar alerta de éxito
                showSuccessAlert("¡Recurso eliminado!", "El recurso ha sido eliminado correctamente");
            }
        } catch (error) {
            alert("Error al eliminar el recurso: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return { handleDelete, loading };
}
