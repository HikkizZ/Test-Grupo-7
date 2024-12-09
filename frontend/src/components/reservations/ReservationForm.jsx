import { useState } from "react";
import Modal from "react-modal";
import { showErrorAlert } from "../../utils/alerts";

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
        maxWidth: "400px",
        width: "100%",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
};

export default function ReservationForm({ onCreate, loading, onClose }) {
    const [formData, setFormData] = useState({
        fechaDesde: "",
        fechaHasta: "",
        tipoReserva: "",
        recurso_id: null,
        sala_id: null,
    });

    const handleCancel = () => {
        setFormData({
            fechaDesde: "",
            fechaHasta: "",
            tipoReserva: "",
            recurso_id: null,
            sala_id: null,
        });
        onClose();
    };

    const handleSubmit = () => {
        if (!formData.fechaDesde || !formData.fechaHasta || !formData.tipoReserva) {
            showErrorAlert(
                "Datos incompletos",
                "Por favor, completa todos los campos obligatorios."
            );
            return;
        }
        if (
            formData.tipoReserva === "recurso" && !formData.recurso_id ||
            formData.tipoReserva === "sala" && !formData.sala_id
        ) {
            showErrorAlert(
                "Datos incompletos",
                "Selecciona un recurso o sala según el tipo de reserva."
            );
            return;
        }
        onCreate(formData);
        handleCancel();
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={handleCancel}
            style={modalStyles}
            ariaHideApp={false}
        >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Crear Reservación</h2>
            <input
                type="text"
                value={formData.fechaDesde}
                onChange={(e) =>
                    setFormData({ ...formData, fechaDesde: e.target.value })
                }
                placeholder="Fecha Desde (DD/MM/YYYY HH:mm)"
                disabled={loading}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "14px",
                }}
            />
            <input
                type="text"
                value={formData.fechaHasta}
                onChange={(e) =>
                    setFormData({ ...formData, fechaHasta: e.target.value })
                }
                placeholder="Fecha Hasta (DD/MM/YYYY HH:mm)"
                disabled={loading}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "14px",
                }}
            />
            <select
                value={formData.tipoReserva}
                onChange={(e) =>
                    setFormData({ ...formData, tipoReserva: e.target.value })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "14px",
                }}
            >
                <option value="">--Selecciona el tipo de reserva--</option>
                <option value="recurso">Recurso</option>
                <option value="sala">Sala</option>
            </select>
            {formData.tipoReserva === "recurso" && (
                <input
                    type="number"
                    value={formData.recurso_id || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, recurso_id: Number(e.target.value) })
                    }
                    placeholder="ID del Recurso"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "14px",
                    }}
                />
            )}
            {formData.tipoReserva === "sala" && (
                <input
                    type="number"
                    value={formData.sala_id || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, sala_id: Number(e.target.value) })
                    }
                    placeholder="ID de la Sala"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "14px",
                    }}
                />
            )}
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        flex: 1,
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    Guardar
                </button>
                <button
                    onClick={handleCancel}
                    disabled={loading}
                    style={{
                        flex: 1,
                        backgroundColor: "#d33",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    Cancelar
                </button>
            </div>
        </Modal>
    );
}
