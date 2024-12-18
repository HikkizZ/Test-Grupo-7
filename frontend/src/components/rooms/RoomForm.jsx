import Modal from "react-modal";
import { useState } from "react";
import { showErrorAlert } from "../../utils/alerts";
import "../../styles/around.css";

export default function RoomForm({ onCreate, loading, onClose }) {
    const [roomName, setRoomName] = useState("");
    const [roomCapacity, setRoomCapacity] = useState("");
    const [roomType, setRoomType] = useState("");

    const handleCancel = () => {
        setRoomName("");
        setRoomCapacity("");
        setRoomType("");
        onClose();
    };

    const handleSubmit = () => {
        if (!roomName.trim() || !roomCapacity || !roomType) {
            showErrorAlert(
                "Campos incompletos",
                "Debes completar todos los campos para crear una sala."
            );
            return;
        }

        if (roomName.trim().length < 3) {
            showErrorAlert(
                "Nombre demasiado corto",
                "El nombre de la sala debe tener al menos 3 caracteres."
            );
            return;
        }

        if (parseInt(roomCapacity) <= 0) {
            showErrorAlert(
                "Capacidad inválido",
                "La Capacidad de alumnos en la sala debe ser un número positivo."
            );
            return;
        }

        onCreate({ name: roomName, capacity: parseInt(roomCapacity), roomType });
        handleCancel();
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={handleCancel}
            overlayClassName="modal-overlay"
            className="modal-content"
            ariaHideApp={false}
        >
            <h2 className="modal-header">Crear Sala</h2>
            <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Nombre de la sala"
                disabled={loading}
                className="modal-input"
            />
            <input
                type="number"
                value={roomCapacity}
                onChange={(e) => setRoomCapacity(e.target.value)}
                placeholder="Capacidad de alumnos en la sala"
                disabled={loading}
                className="modal-input"
            />
            <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                disabled={loading}
                className="modal-input"
            >
                <option value="">Seleccionar tipo de sala</option>
                <option value="laboratorio">Laboratorio</option>
                <option value="computacion">Computación</option>
                <option value="clases">Clases</option>
            </select>
            <div className="modal-buttons">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="modal-button-save"
                >
                    Guardar
                </button>
                <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="modal-button-cancel"
                >
                    Cancelar
                </button>
            </div>
        </Modal>
    );
}