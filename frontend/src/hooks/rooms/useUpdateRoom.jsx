import { useState } from "react";
import { updateRoom } from "@services/room.service";
import { showSuccessAlert } from "../../utils/alerts";

export function useUpdateRoom(fetchRooms) {
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (id, updatedData) => {
        try {
            setLoading(true);
            const updatedRoom = await updateRoom(id, updatedData);
            if (updatedRoom) {
                showSuccessAlert(
                    "¡Sala modificada!",
                    `La sala con ID ${id} ha sido modificada correctamente.`
                );
                fetchRooms((prevRooms) =>
                    prevRooms.map((room) =>
                        room.id === id ? { ...room, ...updatedData } : room
                    )
                );
            }
        } catch (error) {
            console.error("Error al modificar la sala:", error);
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdate, loading };
}
