import { useState } from "react";
import { updateResource } from "@services/resource.service";
import { showSuccessAlert } from "../../utils/alerts";

export function useUpdateResource(fetchResources) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (id, updatedData) => {
        try {
            setLoading(true);
            const updatedResource = await updateResource(id, updatedData);
            if (updatedResource) {
                showSuccessAlert(
                    "¡Recurso modificado!",
                    `El recurso con ID ${id} ha sido modificado correctamente.`
                );
                // Actualizar solo el recurso modificado sin alterar la posición
                fetchResources((prevResources) =>
                    prevResources.map((resource) =>
                        resource.id === id ? { ...resource, ...updatedData } : resource
                    )
                );
            }
        } catch (error) {
            console.error("Error al modificar el recurso:", error);
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdate, loading };
}
