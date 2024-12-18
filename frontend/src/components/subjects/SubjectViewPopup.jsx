import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useGetCalificaciones } from '../../hooks/calificacion/useGetCalificaciones';
import { useAssignCalificaciones } from '../../hooks/calificacion/useAssignCalificaciones';
import { useConfigCalificacion } from '../../hooks/calificacion/useConfigCalificacion';
import { useUpdateConfigCalificacion } from '../../hooks/calificacion/useUpdateConfigCalificacion';
import { useEditNameCalificacion } from '../../hooks/calificacion/useEditNameCalificacion';
import { useNavigate } from 'react-router-dom';

import '@styles/SubjectViewPopup.css';

export default function SubjectViewPopup({ active, setActive, data, subject }) {
    const [cantidadCalificaciones, setCantidadCalificaciones] = useState(2);
    const { calificaciones, loading, fetchCalificaciones } = useGetCalificaciones();
    const { handleAssign, loading: loadingAssign } = useAssignCalificaciones(fetchCalificaciones);
    const [hasFetched, setHasFetched] = useState(false);
    const { handleConfigCalificacion, loading: loadingConfig } = useConfigCalificacion();
    const { handleUpdateConfigCalificacion } = useUpdateConfigCalificacion();
    const { handleEditNameCalificacion } = useEditNameCalificacion();
    const [editingCalificacion, setEditingCalificacion] = useState(false);
    const [newName, setNewName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (active && data?.code && !hasFetched) {
            fetchCalificaciones(data.code);
            setHasFetched(true);
        }
    }, [active, data, fetchCalificaciones, hasFetched]);

    useEffect(() => {
        if (!active) {
            setHasFetched(false);
        }
    }, [active]);

    const handleAssignCalificaciones = () => {
        handleAssign({ codeSubject: data.code });
    };

    const handleConfigOrUpdateClick = async () => {
        const configData = {
            codeSubject: data.code,
            cantidad: parseInt(cantidadCalificaciones, 10)
        };

        if (calificaciones?.data?.length > 0) {
            await handleUpdateConfigCalificacion(data.code, cantidadCalificaciones);
        } else {
            await handleConfigCalificacion(configData);
        }

        fetchCalificaciones(data.code);
    };


    const handleEditCalificacion = (calificacion) => {
        setEditingCalificacion(calificacion.id);
        setNewName(calificacion.name);
    };

    const handleSaveEdit = async () => {
        const dataConfig = {
            idCalificacion: editingCalificacion,
            newName: newName
        }
        await handleEditNameCalificacion(dataConfig);
        setEditingCalificacion(null);

        fetchCalificaciones(data.code);
    }

    const handleGoToNotas = () => {
        console.log("Go to notas");
        navigate('/cursos');
    }

    if (!active) return null;

    console.log(subject)
    return (
        <div className="subject-view-popup-bg">
            <div className="subject-view-popup">
                <button className="close-button" onClick={() => setActive(false)}>
                    <X size={24} />
                </button>
                <div className="popup-content">
                    {/* Columna izquierda */}
                    <div className="left-column">
                        <h2 className="section-title">Datos de la Asignatura</h2>
                        <p><strong>Nombre:</strong> {data.name}</p>
                        <p><strong>Descripción:</strong> {data.description}</p>
                        <p><strong>Curso:</strong> {data.curso.code}</p>
                        <p><strong>Profesor:</strong> {data.teacher.name}</p>
                        <p><strong>Rut Profesor:</strong> {data.teacher.rut}</p>

                        <h2 className="section-title">Configuración de Calificaciones</h2>
                        <div className='table-responsive'>
                            {loading ? (
                                <p>Cargando...</p>
                            ) : calificaciones?.data?.length > 0 ? (
                                <table className='notas-table-config'>
                                    <thead>
                                        <tr>
                                            <th align='center'>ID</th>
                                            <th align='center'>Nombre</th>
                                            <th align='center'>Porcentaje</th>
                                            <th align='center'>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {calificaciones.data.map((calificacion) => (
                                            <tr key={calificacion.id}>
                                                <td align='center'>{calificacion.id}</td>
                                                <td align='center'>
                                                    {editingCalificacion === calificacion.id ? (
                                                        <input
                                                            type='text'
                                                            value={newName}
                                                            onChange={(e) => setNewName(e.target.value)}
                                                            className='edit-name-input'
                                                        />
                                                    ) : (
                                                        calificacion.name
                                                    )}
                                                </td>
                                                <td align='center'>{calificacion.porcentaje}%</td>
                                                <td align='center'>
                                                    {editingCalificacion === calificacion.id ? (
                                                        <button
                                                            onClick={handleSaveEdit}
                                                            className='save-edit-button'
                                                        >
                                                            Guardar
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleEditCalificacion(calificacion)}
                                                            className='edit-button-config'
                                                        >
                                                            Editar
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No hay calificaciones configuradas</p>
                            )
                            }
                        </div>
                        <div className="assign-subjects">
                            <h4>Cantidad de calificaciones en el curso</h4>
                            <select
                                value={cantidadCalificaciones}
                                onChange={(e) => setCantidadCalificaciones(e.target.value)}
                                className='popup-calificaciones-select'
                            >
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </select>

                            <button
                                onClick={handleConfigOrUpdateClick}
                                className={`assign-button ${calificaciones?.data?.length > 0 ? 'edit-mode' : ''}`}
                                disabled={loadingConfig}
                            >
                                {calificaciones?.data?.length > 0
                                    ? "Editar cantidad de calificaciones"
                                    : "Asignar Configuración de Calificaciones"}
                            </button>
                        </div>
                    </div>

                    {/* Columna derecha */}
                    <div className="right-column">
                        <div>
                            <h2 className="section-title">Asignar Calificaciones</h2>
                            <button
                                onClick={handleAssignCalificaciones}
                                className="assign-button"
                                disabled={loadingAssign}
                            >
                                {loadingAssign ? "Asignando..." : "Asignar Calificaciones a Alumnos"}
                            </button>
                        </div>
                        <div>
                            <h2 className="section-title">¿Desea colocar calificaciones?</h2>
                                <button
                                    onClick={handleGoToNotas}
                                    className="assign-button"
                                >
                                    Calificar Alumnos
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
