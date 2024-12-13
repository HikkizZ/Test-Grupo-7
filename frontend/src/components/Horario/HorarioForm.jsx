import { useState } from "react";

export default function HorarioForm({ onCreate, loading }) {
    const [showForm, setShowForm] = useState(false);
    const [horarioData, setHorarioData] = useState({
        curso: "",
        teacher: "",
        classroom: "",
        subject: "",
        period: "",
        dayOfWeek: "",
    });

    const handleCancel = () => {
        setHorarioData({
            curso: "",
            teacher: "",
            classroom: "",
            subject: "",
            period: "",
            dayOfWeek: "",
        });
        setShowForm(false);
    };

    const handleSubmit = () => {
        const { curso, teacher, classroom, subject, period, dayOfWeek } = horarioData;
        if (!curso || !teacher || !classroom || !subject || !period || !dayOfWeek) return;
        onCreate(horarioData);
        handleCancel();
    };

    return (
        <div>
            {!showForm ? (
                <button onClick={() => setShowForm(true)}>Crear Horario</button>
            ) : (
                <div>
                    <input
                        type="text"
                        value={horarioData.curso}
                        onChange={(e) => setHorarioData({ ...horarioData, curso: e.target.value })}
                        placeholder="Curso"
                        disabled={loading}
                    />
                    <input
                        type="text"
                        value={horarioData.teacher}
                        onChange={(e) =>
                            setHorarioData({ ...horarioData, teacher: e.target.value })
                        }
                        placeholder="Profesor"
                        disabled={loading}
                    />
                    <input
                        type="text"
                        value={horarioData.classroom}
                        onChange={(e) =>
                            setHorarioData({ ...horarioData, classroom: e.target.value })
                        }
                        placeholder="Sala"
                        disabled={loading}
                    />
                    <input
                        type="text"
                        value={horarioData.subject}
                        onChange={(e) =>
                            setHorarioData({ ...horarioData, subject: e.target.value })
                        }
                        placeholder="Asignatura"
                        disabled={loading}
                    />
                    <input
                        type="text"
                        value={horarioData.period}
                        onChange={(e) =>
                            setHorarioData({ ...horarioData, period: e.target.value })
                        }
                        placeholder="Periodo"
                        disabled={loading}
                    />
                    <input
                        type="text"
                        value={horarioData.dayOfWeek}
                        onChange={(e) =>
                            setHorarioData({ ...horarioData, dayOfWeek: e.target.value })
                        }
                        placeholder="Día"
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
