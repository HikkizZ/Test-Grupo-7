import { useState } from "react";
import Modal from "react-modal";
import { showErrorAlert } from "../../utils/alerts";

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
    const [resourceBrand, setResourceBrand] = useState("");
    const [resourceType, setResourceType] = useState("");

    const handleCancel = () => {
        setResourceName("");
        setResourceBrand("");
        setResourceType("");
        onClose();
    };

    const handleSubmit = () => {
        if (!resourceName.trim() || !resourceBrand.trim() || !resourceType) {
            showErrorAlert(
                "Campos incompletos",
                "Debes completar todos los campos para crear un recurso."
            );
            return;
        }

        if (resourceName.trim().length < 3) {
            showErrorAlert(
                "Nombre demasiado corto",
                "El nombre del recurso debe tener al menos 3 caracteres."
            );
            return;
        }

        if (resourceBrand.trim().length < 2) {
            showErrorAlert(
                "Marca inválida",
                "La marca del recurso debe tener al menos 2 caracteres."
            );
            return;
        }

        onCreate({ name: resourceName, brand: resourceBrand, resourceType });
        handleCancel();
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={handleCancel}
            style={modalStyles}
            ariaHideApp={false}
        >
            <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
                Crear Recurso
            </h2>
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
            <input
                type="text"
                value={resourceBrand}
                onChange={(e) => setResourceBrand(e.target.value)}
                placeholder="Marca del recurso"
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
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value)}
                disabled={loading}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    fontSize: "14px",
                }}
            >
                <option value="">Seleccionar tipo de recurso</option>
                <option value="Tecnologia">Tecnología</option>
                <option value="Equipo de Sonido">Equipo de Sonido</option>
                <option value="Material Didactico">Material Didáctico</option>
            </select>
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