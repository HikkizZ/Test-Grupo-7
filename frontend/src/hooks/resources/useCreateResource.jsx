import { useState } from "react";
import { createResource } from "@services/resource.service";
import { showSuccessAlert, showErrorAlert } from "../../utils/alerts"; 

export function useCreateResource(fetchResources) {
    const [loading, setLoading] = useState(false);

    const handleCreate = async (data) => {
        try {
            setLoading(true);
            await createResource(data);
            showSuccessAlert("Recurso creado", "El recurso ha sido creado correctamente");
            fetchResources();
        } catch (error) {
            showErrorAlert(
                "Error al crear el recurso",
                error.response?.data?.message || "Hubo un problema al crear el recurso."
            );
        } finally {
            setLoading(false);
        }
    };

    return { handleCreate, loading };
}
