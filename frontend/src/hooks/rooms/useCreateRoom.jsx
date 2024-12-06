import { useState } from "react";
import { createRoom } from "@services/room.service";
import { showSuccessAlert, showErrorAlert } from "../../utils/alerts";

export function useCreateRoom(fetchRooms) {
    const [loading, setLoading] = useState(false);

    const handleCreate = async (data) => {
        try {
            setLoading(true);
            await createRoom(data);
            showSuccessAlert("Sala creada", "La sala ha sido creada correctamente");
            fetchRooms();
        } catch (error) {
            showErrorAlert(
                "Error al crear la sala",
                error.response?.data?.message || "Hubo un problema al crear la sala."
            );
        } finally {
            setLoading(false);
        }
    };

    return { handleCreate, loading };
}
