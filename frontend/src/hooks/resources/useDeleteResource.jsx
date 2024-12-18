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

                await deleteResource(id);

                setResources((prevResources) => prevResources.filter((resource) => resource.id !== id));

                if (setSearchResults) {
                    setSearchResults((prevResults) =>
                        prevResults.filter((resource) => resource.id !== id)
                    );
                }

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