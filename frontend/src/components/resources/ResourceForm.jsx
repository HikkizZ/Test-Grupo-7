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

export default function ResourceForm({ onCreate, loading, onClose }) {
    const [resourceName, setResourceName] = useState("");

    const handleCancel = () => {
        setResourceName("");
        onClose();
    };

    const handleSubmit = () => {
        if (!resourceName.trim()) return;
        if (resourceName.trim().length < 3) {
            showErrorAlert(
                "Nombre demasiado corto",
                "El nombre del recurso debe tener al menos 3 caracteres."
            );
            return;
        }
        onCreate({ name: resourceName });
        setResourceName("");
        onClose();
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={handleCancel}
            style={modalStyles}
            ariaHideApp={false}
        >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Crear Recurso</h2>
            <input
                type="text"
                value={resourceName}
                onChange={(e) => setResourceName(e.target.value)}
                placeholder="Nombre del recurso"
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
            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        flex: 1,
                        backgroundColor: "#007bff",
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
