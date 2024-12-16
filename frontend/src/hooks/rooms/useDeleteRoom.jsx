import { useState } from "react";
import { deleteRoom } from "@services/room.service";
import { deleteDataAlert, showSuccessAlert } from "../../utils/alerts";

export function useDeleteRoom({ setRooms, setSearchResults = null }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (name) => {
        try {
            const result = await deleteDataAlert();
            if (result.isConfirmed) {
                setLoading(true);

                // Llamar al servicio para eliminar la sala
                await deleteRoom(name);

                // Actualizar la lista de salas
                setRooms((prevRooms) => prevRooms.filter((room) => room.name !== name));

                // Actualizar los resultados de búsqueda (si existe)
                if (setSearchResults) {
                    setSearchResults((prevResults) =>
                        prevResults.filter((room) => room.name !== name)
                    );
                }

                // Mostrar alerta de éxito
                showSuccessAlert(
                    "¡Sala eliminada!",
                    "La sala ha sido eliminada correctamente"
                );
            }
        } catch (error) {
            alert("Error al eliminar la sala: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return { handleDelete, loading };
}