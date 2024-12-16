import { useState } from "react";
import { createResource } from "@services/resource.service";
import { showSuccessAlert, showErrorAlert } from "../../utils/alerts";

export function useCreateResource(fetchResources) {
    const [loading, setLoading] = useState(false);

    const handleCreate = async (data) => {
        try {
            setLoading(true);

            // Validar que los datos necesarios están presentes
            if (!data.name || !data.brand || !data.resourceType) {
                throw new Error("Todos los campos son obligatorios (Nombre, Marca, Tipo de Recurso).");
            }

            await createResource(data);

            showSuccessAlert("Recurso creado", "El recurso ha sido creado correctamente.");
            fetchResources(); // Actualizar la lista después de crear
        } catch (error) {
            showErrorAlert(
                "Error al crear el recurso",
                error.response?.data?.message || error.message || "Hubo un problema al crear el recurso."
            );
        } finally {
            setLoading(false);
        }
    };

    return { handleCreate, loading };
}