import { useState, useEffect } from "react";
import Modal from "react-modal";
import RoomTable from "../rooms/RoomTable";
import ResourceTable from "../resources/ResourceTable";
import { useGetRooms } from "../../hooks/rooms/useGetRooms";
import { useGetResources } from "../../hooks/resources/useGetResources";
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
        maxWidth: "800px",
        width: "100%",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
};

export default function ReservationForm({ onCreate, loading, onClose }) {
    const [step, setStep] = useState(1); // Paso del formulario
    const [formData, setFormData] = useState({
        fechaDesde: "",
        fechaHasta: "",
        tipoReserva: "",
        recurso_id: null,
        sala_id: null,
    });
    const [selectedResource, setSelectedResource] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const { rooms, fetchRooms, loading: loadingRooms } = useGetRooms();
    const { resources, fetchResources, loading: loadingResources } = useGetResources();

    useEffect(() => {
        if (formData.tipoReserva === "sala") fetchRooms();
        if (formData.tipoReserva === "recurso") fetchResources();
    }, [formData.tipoReserva, fetchRooms, fetchResources]);

    const handleCancel = () => {
        setFormData({
            fechaDesde: "",
            fechaHasta: "",
            tipoReserva: "",
            recurso_id: null,
            sala_id: null,
        });
        setSelectedResource(null);
        setSelectedRoom(null);
        setStep(1);
        onClose();
    };

    const handleSelect = (type, item) => {
        if (type === "sala") {
            setSelectedRoom(item);
            setFormData({ ...formData, sala_id: item.id });
        } else if (type === "recurso") {
            setSelectedResource(item);
            setFormData({ ...formData, recurso_id: item.id });
        }
        setStep(2); // Paso para seleccionar fechas
    };

    const handleSubmit = () => {
        if (!formData.fechaDesde || !formData.fechaHasta) {
            showErrorAlert("Datos incompletos", "Debes ingresar ambas fechas.");
            return;
        }
        onCreate(formData);
        handleCancel();
    };

    return (
        <Modal isOpen={true} onRequestClose={handleCancel} style={modalStyles} ariaHideApp={false}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Crear Reservación</h2>

            {/* Paso 1: Seleccionar tipo de reserva */}
            {step === 1 && (
                <>
                    <select
                        value={formData.tipoReserva}
                        onChange={(e) => setFormData({ ...formData, tipoReserva: e.target.value })}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            fontSize: "14px",
                        }}
                    >
                        <option value="">-- Selecciona el tipo de reserva --</option>
                        <option value="recurso">Recurso</option>
                        <option value="sala">Sala</option>
                    </select>

                    {/* Mostrar tabla de recursos o salas */}
                    {formData.tipoReserva === "sala" && (
                        <>
                            <h3>Seleccionar Sala</h3>
                            {loadingRooms ? (
                                <p>Cargando salas...</p>
                            ) : (
                                <RoomTable
                                    rooms={rooms}
                                    onSelect={(room) => handleSelect("sala", room)}
                                />
                            )}
                        </>
                    )}

                    {formData.tipoReserva === "recurso" && (
                        <>
                            <h3>Seleccionar Recurso</h3>
                            {loadingResources ? (
                                <p>Cargando recursos...</p>
                            ) : (
                                <ResourceTable
                                    resources={resources}
                                    onSelect={(resource) => handleSelect("recurso", resource)}
                                />
                            )}
                        </>
                    )}
                </>
            )}

            {/* Paso 2: Seleccionar fechas */}
            {step === 2 && (
                <>
                    <p>
                        <strong>
                            {selectedRoom
                                ? `Sala seleccionada: ${selectedRoom.name} - ${selectedRoom.roomType}`
                                : `Recurso seleccionado: ${selectedResource.name} - ${selectedResource.resourceType}`}
                        </strong>
                    </p>

                    <input
                        type="text"
                        value={formData.fechaDesde}
                        onChange={(e) => setFormData({ ...formData, fechaDesde: e.target.value })}
                        placeholder="Fecha Desde (DD-MM-YYYY HH:mm)"
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
                        onChange={(e) => setFormData({ ...formData, fechaHasta: e.target.value })}
                        placeholder="Fecha Hasta (DD-MM-YYYY HH:mm)"
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
                </>
            )}
        </Modal>
    );
}