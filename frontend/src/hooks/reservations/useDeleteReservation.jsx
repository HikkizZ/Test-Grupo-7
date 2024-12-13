import { useState } from "react";
import { deleteReservation } from "@services/reservation.service";
import { deleteDataAlert, showSuccessAlert } from "../../utils/alerts";

export function useDeleteReservation({ setReservations }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (id) => {
        try {
            const result = await deleteDataAlert();
            if (result.isConfirmed) {
                setLoading(true);
                await deleteReservation(id);
                setReservations((prevReservations) =>
                    prevReservations.filter((reservation) => reservation.id !== id)
                );
                showSuccessAlert("Reservación eliminada", "La reservación ha sido eliminada correctamente");
            }
        } catch (error) {
            console.error("Error al eliminar la reservación:", error);
        } finally {
            setLoading(false);
        }
    };

    return { handleDelete, loading };
}
