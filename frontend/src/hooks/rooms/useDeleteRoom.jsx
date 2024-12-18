import { useState } from "react";
import { deleteRoom } from "@services/room.service";
import { deleteDataAlert, showSuccessAlert } from "../../utils/alerts";

export function useDeleteRoom({ setRooms, setSearchResults = null }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        try {
            const result = await deleteDataAlert();
            if (result.isConfirmed) {
                setLoading(true);

                await deleteRoom(id);

                setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));

                if (setSearchResults) {
                    setSearchResults((prevResults) =>
                        prevResults.filter((room) => room.id !== id)
                    );
                }

                showSuccessAlert(
                    "¡Sala eliminada!",
                    "La sala ha sido eliminada correctamente"
                );
            }
        } catch (error) {
            showSuccessAlert(
                "Error al eliminar la sala",
                error.response?.data?.message || error.message || "Hubo un problema al eliminar la sala."
            );
        } finally {
            setLoading(false);
        }
    };

    return { handleDelete, loading };
}