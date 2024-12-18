import { useState } from "react";
import { updateResource } from "@services/resource.service";
import { showSuccessAlert, showErrorAlert } from "../../utils/alerts";

export function useUpdateResource(fetchResources) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (id, updatedData) => {
        try {
            setLoading(true);

            if (!Object.keys(updatedData).length) {
                throw new Error("Debe proporcionar al menos un campo para actualizar.");
            }

            const updatedResource = await updateResource(id, updatedData);

            if (updatedResource) {
                showSuccessAlert(
                    "¡Recurso modificado!",
                    "El recurso ha sido modificado correctamente."
                );

                fetchResources((prevResources) =>
                    prevResources.map((resource) =>
                        resource.id === id ? { ...resource, ...updatedData } : resource
                    )
                );
            }
        } catch (error) {
            showErrorAlert(
                "Error al modificar el recurso",
                error.response?.data?.message || error.message || "Hubo un problema al modificar el recurso."
            );
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdate, loading };
}