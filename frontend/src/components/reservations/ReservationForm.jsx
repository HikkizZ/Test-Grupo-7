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
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fechaDesde: "",
        horaDesde: "",
        fechaHasta: "",
        horaHasta: "",
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

    const handleDateChange = (date, field) => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const [year, month, day] = date.split("-").map(Number);
        const selectedDate = new Date(year, month - 1, day);
    
        if (selectedDate < today) {
            showErrorAlert("Fecha inválida", "No puedes seleccionar una fecha anterior a hoy.");
            setFormData((prev) => ({ ...prev, [field]: "" }));
            return;
        }
    
        setFormData((prev) => ({ ...prev, [field]: date }));
    
        if (field === "fechaDesde" && formData.horaDesde) {
            validateDateTime(date, formData.horaDesde, field);
        } else if (field === "fechaHasta" && formData.horaHasta) {
            validateDateTime(date, formData.horaHasta, field);
        }
    };
    
    const handleTimeChange = (time, field) => {
        setFormData((prev) => ({ ...prev, [field]: time })); 
    
        if (field === "horaDesde" && formData.fechaDesde) {
            validateDateTime(formData.fechaDesde, time, "fechaDesde");
        } else if (field === "horaHasta" && formData.fechaHasta) {
            validateDateTime(formData.fechaHasta, time, "fechaHasta");
        }
    };
    
    const validateDateTime = (date, time, field) => {
        const [year, month, day] = date.split("-").map(Number);
        const [hour, minute] = time.split(":").map(Number);
    
        const selectedDateTime = new Date(year, month - 1, day, hour || 0, minute || 0);
        const currentDateTime = new Date();
    
        currentDateTime.setSeconds(0, 0);
    
        if (selectedDateTime < currentDateTime) {
            showErrorAlert(
                "Fecha y hora inválida",
                "No puedes seleccionar una fecha y hora anteriores al momento actual."
            );
            setFormData((prev) => ({
                ...prev,
                [field]: "",
                [field === "fechaDesde" ? "horaDesde" : "horaHasta"]: "",
            }));
        }
    };

    const handleCancel = () => {
        setFormData({
            fechaDesde: "",
            horaDesde: "",
            fechaHasta: "",
            horaHasta: "",
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
        setStep(2);
    };

    const formatDateTime = (date, time) => {
        if (!date || !time) return "";
        const [year, month, day] = date.split("-");
        const [hour, minute] = time.split(":");
        return `${day}-${month}-${year} ${hour}:${minute}`;
    };

    const handleSubmit = () => {
        const fechaDesde = formatDateTime(formData.fechaDesde, formData.horaDesde);
        const fechaHasta = formatDateTime(formData.fechaHasta, formData.horaHasta);
    
        if (!fechaDesde || !fechaHasta) {
            showErrorAlert("Datos incompletos", "Debes ingresar ambas fechas y horas.");
            return;
        }
    
        const finalData = {
            ...formData,
            fechaDesde,
            fechaHasta,
        };
    
        delete finalData.horaDesde;
        delete finalData.horaHasta;
    
        onCreate(finalData);
        handleCancel();
    };

    return (
        <Modal isOpen={true} onRequestClose={handleCancel} style={modalStyles} ariaHideApp={false}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Crear Reservación</h2>

            {step === 1 && (
                <>
                    <select
                        value={formData.tipoReserva}
                        onChange={(e) => setFormData({ ...formData, tipoReserva: e.target.value })}
                        style={selectStyle}
                    >
                        <option value="">-- Selecciona el tipo de reserva --</option>
                        <option value="recurso">Recurso</option>
                        <option value="sala">Sala</option>
                    </select>

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

            {step === 2 && (
                <>
                    <p style={{ textAlign: "center", fontWeight: "bold", marginBottom: "20px" }}>
                        {selectedRoom
                            ? `Sala seleccionada: ${selectedRoom.name} - ${selectedRoom.roomType}`
                            : `Recurso seleccionado: ${selectedResource.name} - ${selectedResource.resourceType}`}
                    </p>

                    <DateTimeInput
                        label="Fecha Desde"
                        date={formData.fechaDesde}
                        time={formData.horaDesde}
                        onDateChange={(value) => handleDateChange(value, "fechaDesde")}
                        onTimeChange={(value) => handleTimeChange(value, "horaDesde")}
                    />
                    <DateTimeInput
                        label="Fecha Hasta"
                        date={formData.fechaHasta}
                        time={formData.horaHasta}
                        onDateChange={(value) => handleDateChange(value, "fechaHasta")}
                        onTimeChange={(value) => handleTimeChange(value, "horaHasta")}
                    />

                    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                        <button onClick={handleSubmit} disabled={loading} style={buttonStyleGreen}>
                            Guardar
                        </button>
                        <button onClick={handleCancel} disabled={loading} style={buttonStyleRed}>
                            Cancelar
                        </button>
                    </div>
                </>
            )}
        </Modal>
    );
}

function DateTimeInput({ label, date, time, onDateChange, onTimeChange }) {
    return (
        <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold" }}>{label}</label>
            <div style={{ display: "flex", gap: "10px" }}>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => onDateChange(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => onTimeChange(e.target.value)}
                    style={inputStyle}
                />
            </div>
        </div>
    );
}

const inputStyle = {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
};
const selectStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
};
const buttonStyleGreen = {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
};

const buttonStyleRed = {
    backgroundColor: "#d33",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
};