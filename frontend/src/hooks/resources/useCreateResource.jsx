import { useState } from "react";
import { createResource } from "@services/resource.service";
import { showSuccessAlert } from "../../utils/alerts";

export function useCreateResource(fetchResources) {
    const [loading, setLoading] = useState(false);

    const handleCreate = async (data) => {
        try {
            setLoading(true);
            await createResource(data); // Aquí se realiza la solicitud al backend
            showSuccessAlert("Recurso creado", "El recurso ha sido creado correctamente");
            fetchResources(); // Vuelve a cargar los recursos
        } catch (error) {
            alert("Error al crear el recurso: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return { handleCreate, loading };
}

