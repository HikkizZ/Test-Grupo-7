import Form from '../Form';
import '@styles/CursoPopup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupCursos({ show, setShow, data, action }) {
    const cursoData = data || { name: "", level: "", year: "", section: "" }; // Datos iniciales del curso

    const handleSubmit = (formData) => {
        console.log(formData);
        action(formData); // Llamar a la función pasada por props para actualizar el curso
    };

    return (
        <div>
            {show && (
                <div className="curso-popup-bg">
                    <div className="curso-popup">
                        {/* Botón para cerrar el popup */}
                        <button className="close" onClick={() => setShow(false)}>
                            <img src={CloseIcon} alt="Cerrar" />
                        </button>
                        {/* Formulario */}
                        <Form
                            title={data ? "Editar Curso" : "Nuevo Curso"}
                            fields={[
                                {
                                    label: "Nombre del curso",
                                    name: "name",
                                    defaultValue: cursoData.name,
                                    placeholder: "Ej: Primero Medio A",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 5,
                                    maxLength: 50,
                                    pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                                    patternMessage: "Debe contener solo letras y espacios",
                                },
                                {
                                    label: "Nivel",
                                    name: "level",
                                    defaultValue: cursoData.level,
                                    placeholder: "Ej: 1 (Primero Medio)",
                                    fieldType: "select",
                                    options: [
                                        { value: "1", label: "1" },
                                        { value: "2", label: "2" },
                                        { value: "3", label: "3" },
                                        { value: "4", label: "4" },
                                    ],
                                    required: true,
                                },
                                {
                                    label: "Año",
                                    name: "year",
                                    defaultValue: cursoData.year,
                                    placeholder: "Ej: 2024",
                                    fieldType: "input",
                                    type: "number",
                                    required: true,
                                    min: 2020,
                                    max: 2100,
                                },
                                {
                                    label: "Sección",
                                    name: "section",
                                    defaultValue: cursoData.section,
                                    placeholder: "Ej: A, B, C",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 1,
                                    maxLength: 1,
                                    pattern: /^[A-Za-z]$/,
                                    patternMessage: "Debe ser una letra (A-Z)",
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Actualizar Curso"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
