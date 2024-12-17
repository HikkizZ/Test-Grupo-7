import SubjectFormPopup from './SubjectFormPopup';
import '@styles/SubjectPopup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupSubjects({ show, setShow, data, action }) {
    const subjectData = data || { name: "", curso: "", teacher: "" }; // Datos iniciales del curso

    const handleSubmit = (formData) => {
        action(formData); // Llamar a la función pasada por props para actualizar el curso
    };

    return (
        <div>
            {show && (
                <div className="subject-popup-bg">
                    <div className="subject-popup">
                        {/* Botón para cerrar el popup */}
                        <button className="close" onClick={() => setShow(false)}>
                            <img src={CloseIcon} alt="Cerrar" />
                        </button>
                        {/* Formulario */}
                        <SubjectFormPopup
                            title={data ? "Editar asignatura" : "Nueva asignatura"}
                            fields={[
                                {
                                    label: "Nombre de la asignatura",
                                    name: "name",
                                    defaultValue: subjectData.name,
                                    placeholder: "Ej:Artes Visuales",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 5,
                                    maxLength: 50,
                                    pattern: /^[A-Za-zÑ\s]+$/,
                                    patternMessage: "No se permiten números ni caracteres especiales",
                                },
                                {
                                    label: "Descripción",
                                    name: "description",
                                    defaultValue: subjectData.description,
                                    placeholder: "Curso teorico-práctico",
                                    fieldType: "input",
                                    type: "text",
                                    minLength: 5,
                                    maxLength: 50,
                                    pattern: /^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ\s.,:;()¿?¡!-]+$/,
                                    patternMessage: "Debe contener solo letras, números y algunos caracteres especiales",
                                },
                                {
                                    label: "Código del Curso",
                                    name: "codeCurso",
                                    defaultValue: subjectData.curso.code,
                                    placeholder: "Ej: 1A-2024 (Primero Medio A)",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 5,
                                    maxLength: 50,
                                    pattern: /^[A-Za-z0-9-]+$/,
                                    patternMessage: "Debe contener solo letras, números y un guión",
                                },
                                {
                                    label: "Rut del profesor",
                                    name: "rutProfesor",
                                    defaultValue: subjectData.teacher.rut,
                                    placeholder: "12.345.678-9",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 5,
                                    maxLength: 50,
                                    pattern: /^\d{1,2}(\.\d{3}){2}-[\dkK]$|^\d{7,8}-[\dkK]$/,
                                    patternMessage: "Debe contener solo números y un guión",
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Actualizar asignatura"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
