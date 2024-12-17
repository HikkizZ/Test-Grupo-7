import { useState } from 'react';
import { X } from 'lucide-react';
import '@styles/CursoViewPopup.css';
import { useAssignStudentsCurso } from '../../hooks/cursos/useAssignStudentsCurso';
import { useAssignSubjectsStudentCurso } from '../../hooks/cursos/useAssignSubjectsStudentCurso';

export default function CursoViewPopup({ active, setActive, data, fetchCursos }) {
    const [rutAlumno, setRutAlumno] = useState('');
    const { handleAssign, loading } = useAssignStudentsCurso(fetchCursos);
    const { handleAssignSubjects, loadingSubjects } = useAssignSubjectsStudentCurso(fetchCursos);

    const handleAddStudent = () => {
        if (rutAlumno.trim() !== '') {
            handleAssign(data.code, [{ rut: rutAlumno }]);
            setRutAlumno('');
        }
        fetchCursos();
    };

    const handleAddSubjects = () => {
        console.log('data.code:', data.code);
        handleAssignSubjects(data.code);
    };

    if (!active) return null;

    return (
        <div className="curso-view-popup-bg">
            <div className="curso-view-popup">
                <button className="close-button" onClick={() => setActive(false)}>
                    <X size={24} />
                </button>
                <div className="popup-content">
                    <div className="left-column">
                        <h2 className="section-title">Datos del curso</h2>
                        <div className="course-data">
                            <p><strong>Nombre del curso:</strong> {data.name}</p>
                            <p><strong>Código:</strong> {data.code}</p>
                            <p><strong>Nivel:</strong> {data.level}</p>
                            <p><strong>Sección:</strong> {data.section}</p>
                            <p><strong>Año:</strong> {data.year}</p>
                        </div>
                        <h2 className="section-title">Asignaturas del curso</h2>
                        <ul className="subject-list">
                            {data.subjects.map((subject, index) => (
                                <li key={index}>{subject.name}</li>
                            ))}
                        </ul>
                        <div className="assign-subjects">
                            <button onClick={handleAddSubjects} className="assign-button" disabled={loadingSubjects}>
                                Agregar asignaturas a los alumnos
                            </button>
                        </div>
                    </div>
                    <div className="right-column">
                        <h2 className="section-title">Alumnos inscritos</h2>
                        <ul className="student-list">
                            {data.students.map((student) => (
                                <li key={student.id}>{student.name}</li>
                            ))}
                        </ul>
                        <div className="add-student">
                            <h3 className="subsection-title">Asignar alumnos al curso</h3>
                            <div className="add-student-input-group">
                                <input
                                    type="text"
                                    value={rutAlumno}
                                    onChange={(e) => setRutAlumno(e.target.value)}
                                    placeholder="RUT del alumno"
                                    className="student-input"
                                />
                                <button onClick={handleAddStudent} className="add-button" disabled={loading}>
                                    {loading ? "Cargando..." : "Agregar alumno"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

