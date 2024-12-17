import { useState } from "react";
import SubjectRow from "./SubjectRow";
import PopupSubjects from "./SubjectPopup";

export default function SubjectTable({ subjects, onDelete, onUpdate }) {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const handleEditClick = (subject) => {
        setSelectedSubject(subject);
        setShowPopup(true);
    };

    const handleUpdate = (updatedsubjectData) => {
        onUpdate(selectedSubject.id, updatedsubjectData);
        setShowPopup(false);
    };

    return (
        <div style={styles.container}>
                <h2 style={styles.title}>Lista de Asignaturas</h2>
            <div style={styles.tableResponsive}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Código</th>
                            <th style={styles.th}>Nombre</th>
                            <th style={styles.th}>Descripción</th>
                            <th style={styles.th}>Curso</th>
                            <th style={styles.th}>Profesor</th>
                            <th style={styles.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject) => (
                            <SubjectRow
                                key={subject.id}
                                subject={subject}
                                onEdit={handleEditClick}
                                onDelete={onDelete}
                                loadingUpdate={false}
                                loadingDelete={false}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {showPopup && (
                <PopupSubjects
                    show={showPopup}
                    setShow={setShowPopup}
                    data={selectedSubject}
                    action={handleUpdate}
                />
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        color: '#333',
        marginBottom: '20px',
        fontSize: '24px',
        textAlign: 'center',
    },
    tableResponsive: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
    },
    th: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f8f9fa',
        color: '#333',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: '14px',
    },
    td: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
};
