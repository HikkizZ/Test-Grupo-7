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

export default function RoomForm({ onCreate, loading, onClose }) {
    const [roomName, setRoomName] = useState("");
    const [roomSize, setRoomSize] = useState("");
    const [roomType, setRoomType] = useState("");

    const handleCancel = () => {
        setRoomName("");
        setRoomSize("");
        setRoomType("");
        onClose();
    };

    const handleSubmit = () => {
        if (!roomName.trim() || !roomSize || !roomType) {
            showErrorAlert(
                "Campos incompletos",
                "Debes completar todos los campos para crear una sala."
            );
            return;
        }
        onCreate({ name: roomName, size: parseFloat(roomSize), roomType });
        handleCancel();
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={handleCancel}
            style={modalStyles}
            ariaHideApp={false}
        >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Crear Sala</h2>
            <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Nombre de la sala"
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
                type="number"
                value={roomSize}
                onChange={(e) => setRoomSize(e.target.value)}
                placeholder="Tamaño de la sala (m²)"
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
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
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
                <option value="">Seleccionar tipo de sala</option>
                <option value="laboratorio">Laboratorio</option>
                <option value="computacion">Computacion</option>
                <option value="clases">Clases</option>
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