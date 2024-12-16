import { useState, useEffect } from "react";
import Modal from "react-modal";
import { showErrorAlert } from "../../utils/alerts";
import { useGetRooms } from "../../hooks/rooms/useGetRooms";
import { useGetResources } from "../../hooks/resources/useGetResources";

// Estilo para la ventana modal
const modalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "30px",
        borderRadius: "10px",
        border: "none",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
        maxWidth: "500px",
        width: "100%",
    },
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
};

export default function ReservationForm({ onCreate, loading, onClose }) {
    const [formData, setFormData] = useState({
        tipoReserva: "",
        recurso_id: null,
        sala_id: null,
        fechaDesde: "",
        fechaHasta: "",
    });

    // Hooks para obtener salas y recursos
    const { rooms, fetchRooms, loading: loadingRooms } = useGetRooms();
    const { resources, fetchResources, loading: loadingResources } = useGetResources();

    // Cargar datos dinámicamente según el tipo de reserva
    useEffect(() => {
        if (formData.tipoReserva === "sala") fetchRooms();
        if (formData.tipoReserva === "recurso") fetchResources();
    }, [formData.tipoReserva, fetchRooms, fetchResources]);

    const handleCancel = () => {
        setFormData({ tipoReserva: "", recurso_id: null, sala_id: null, fechaDesde: "", fechaHasta: "" });
        onClose();
    };

    const handleSubmit = () => {
        const { tipoReserva, recurso_id, sala_id, fechaDesde, fechaHasta } = formData;

        if (!tipoReserva) {
            showErrorAlert("Datos incompletos", "Selecciona el tipo de reserva.");
            return;
        }

        if (tipoReserva === "recurso" && !recurso_id) {
            showErrorAlert("Datos incompletos", "Selecciona un recurso.");
            return;
        }

        if (tipoReserva === "sala" && !sala_id) {
            showErrorAlert("Datos incompletos", "Selecciona una sala.");
            return;
        }

        if (!fechaDesde || !fechaHasta) {
            showErrorAlert("Datos incompletos", "Completa las fechas y horas de la reserva.");
            return;
        }

        onCreate(formData);
        handleCancel();
    };

    return (
        <Modal isOpen={true} onRequestClose={handleCancel} style={modalStyles} ariaHideApp={false}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Crear Reservación</h2>

            {/* Tipo de Reserva */}
            <select
                value={formData.tipoReserva}
                onChange={(e) => setFormData({ ...formData, tipoReserva: e.target.value })}
                style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
            >
                <option value="">--Selecciona el tipo de reserva--</option>
                <option value="recurso">Recurso</option>
                <option value="sala">Sala</option>
            </select>

            {/* Lista dinámica de Salas */}
            {formData.tipoReserva === "sala" && (
                <select
                    value={formData.sala_id || ""}
                    onChange={(e) => setFormData({ ...formData, sala_id: Number(e.target.value) })}
                    style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
                    disabled={loadingRooms}
                >
                    <option value="">--Selecciona una sala--</option>
                    {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                            {room.name} ({room.roomType}, {room.size})
                        </option>
                    ))}
                </select>
            )}

            {/* Lista dinámica de Recursos */}
            {formData.tipoReserva === "recurso" && (
                <select
                    value={formData.recurso_id || ""}
                    onChange={(e) => setFormData({ ...formData, recurso_id: Number(e.target.value) })}
                    style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
                    disabled={loadingResources}
                >
                    <option value="">--Selecciona un recurso--</option>
                    {resources.map((resource) => (
                        <option key={resource.id} value={resource.id}>
                            {resource.name} ({resource.resourceType}, {resource.brand})
                        </option>
                    ))}
                </select>
            )}

            {/* Fecha Desde */}
            <input
                type="text"
                value={formData.fechaDesde}
                onChange={(e) => setFormData({ ...formData, fechaDesde: e.target.value })}
                placeholder="Fecha Desde (DD-MM-YYYY HH:mm)"
                disabled={loading}
                style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
            />

            {/* Fecha Hasta */}
            <input
                type="text"
                value={formData.fechaHasta}
                onChange={(e) => setFormData({ ...formData, fechaHasta: e.target.value })}
                placeholder="Fecha Hasta (DD-MM-YYYY HH:mm)"
                disabled={loading}
                style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
            />

            {/* Botones */}
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{ flex: 1, backgroundColor: "#28a745", color: "#fff", padding: "10px" }}
                >
                    Guardar
                </button>
                <button
                    onClick={handleCancel}
                    disabled={loading}
                    style={{ flex: 1, backgroundColor: "#d33", color: "#fff", padding: "10px" }}
                >
                    Cancelar
                </button>
            </div>
        </Modal>
    );
}