import { useState } from "react";
import { createRoom } from "@services/room.service";
import { showSuccessAlert, showErrorAlert } from "../../utils/alerts";

export function useCreateRoom(fetchRooms) {
    const [loading, setLoading] = useState(false);

    const handleCreate = async (data) => {
        try {
            setLoading(true);

            // Validar que los datos necesarios están presentes
            if (!data.name || !data.size || !data.roomType) {
                throw new Error("Todos los campos son obligatorios (Nombre, Tamaño, Tipo de Sala).");
            }

            await createRoom(data);

            showSuccessAlert("Sala creada", "La sala ha sido creada correctamente");
            fetchRooms();
        } catch (error) {
            showErrorAlert(
                "Error al crear la sala",
                error.response?.data?.message || error.message || "Hubo un problema al crear la sala."
            );
        } finally {
            setLoading(false);
        }
    };

    return { handleCreate, loading };
}