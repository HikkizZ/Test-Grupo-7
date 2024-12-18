import { useState } from "react";
import Modal from "react-modal";
import { showErrorAlert } from "../../utils/alerts";
import "../../styles/around.css"; 
import "../../styles/around.css"; 

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
            overlayClassName="modal-overlay"
            className="modal-content"
            ariaHideApp={false}
        >
            {/* Encabezado del modal */}
            <h2 className="modal-header">Crear Recurso</h2>

            {/* Campos del formulario */}
            <input
                type="text"
                value={resourceName}
                onChange={(e) => setResourceName(e.target.value)}
                placeholder="Nombre del recurso"
                disabled={loading}
                className="modal-input"
            />
            <input
                type="text"
                value={resourceBrand}
                onChange={(e) => setResourceBrand(e.target.value)}
                placeholder="Marca del recurso"
                disabled={loading}
                className="modal-input"
            />
            <select
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value)}
                disabled={loading}
                className="modal-input"
            >
                <option value="">Seleccionar tipo de recurso</option>
                <option value="Tecnologia">Tecnología</option>
                <option value="Equipo de Sonido">Equipo de Sonido</option>
                <option value="Material Didactico">Material Didáctico</option>
            </select>

            {/* Botones de acción */}
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