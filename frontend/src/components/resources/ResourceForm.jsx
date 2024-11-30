import { useState } from "react";

export default function ResourceForm({ onCreate, loading }) {
    const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario
    const [resourceName, setResourceName] = useState("");

    const handleCancel = () => {
        setResourceName("");
        setShowForm(false); // Ocultar el formulario al cancelar
    };

    const handleSubmit = () => {
        if (!resourceName.trim()) return; // Validar que el nombre no esté vacío
        onCreate({ name: resourceName });
        setResourceName(""); // Limpiar el campo después de crear
        setShowForm(false); // Ocultar el formulario
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


