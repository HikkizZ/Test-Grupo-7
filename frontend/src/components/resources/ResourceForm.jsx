import { useState } from "react";
import { showErrorAlert } from "../../utils/alerts"; // Importamos la alerta de error

export default function ResourceForm({ onCreate, loading }) {
    const [showForm, setShowForm] = useState(false);
    const [resourceName, setResourceName] = useState("");

    const handleCancel = () => {
        setResourceName("");
        setShowForm(false);
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
        setShowForm(false);
    };

    return (
        <div>
            {!showForm ? (
                <button onClick={() => setShowForm(true)}>Crear Recurso</button>
            ) : (
                <div>
                    <input
                        type="text"
                        value={resourceName}
                        onChange={(e) => setResourceName(e.target.value)}
                        placeholder="Nombre del recurso"
                        disabled={loading}
                    />
                    <button onClick={handleSubmit} disabled={loading}>
                        Guardar
                    </button>
                    <button onClick={handleCancel} disabled={loading}>
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
}
