import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

export default function PopupCursos({ show, setShow, data, action }) {
    const cursoData = data || { name: "", level: "", year: "", section: "" }; // Datos iniciales del curso

    const handleSubmit = (formData) => {
        action(formData); // Ejecuta la acción pasada por props (crear o actualizar)
    };

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        <button className="close" onClick={() => setShow(false)}>
                            <img src={CloseIcon} alt="Cerrar" />
                        </button>
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
                                    fieldType: "input",
                                    type: "number",
                                    required: true,
                                    min: 1,
                                    max: 4,
                                    pattern: /^[1-4]$/,
                                    patternMessage: "Debe ser un número entre 1 y 4",
                                },
                                {
                                    label: "Año",
                                    name: "year",
                                    defaultValue: cursoData.year,
                                    placeholder: "Ej: 2024",
                                    fieldType: "input",
                                    type: "number",
                                    required: true,
                                    min: 2000,
                                    max: 2100,
                                    pattern: /^[0-9]{4}$/,
                                    patternMessage: "Debe ser un año válido (4 dígitos)",
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
                                {
                                    label: "Código (Autogenerado)",
                                    name: "code",
                                    defaultValue: cursoData.code,
                                    placeholder: "Ej: 1A-24",
                                    fieldType: "input",
                                    type: "text",
                                    disabled: true, // Este campo es solo informativo
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText={data ? "Actualizar Curso" : "Crear Curso"}
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
