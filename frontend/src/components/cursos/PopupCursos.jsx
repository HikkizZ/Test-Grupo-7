import CursoFormPopup from './CursoFormPopup';
import '@styles/CursoPopup.css';
import { X } from 'lucide-react';

export default function PopupCursos({ show, setShow, data, action }) {
    const cursoData = data || { name: "", level: "", year: "", section: "" };

    const handleSubmit = (formData) => {
        console.log(formData);
        action(formData);
    };

    if (!show) return null;

    return (
        <div className="popup-cursos-bg">
            <div className="popup-cursos">
                <button className="popup-cursos-close" onClick={() => setShow(false)}>
                    <X size={24} />
                </button>
                <CursoFormPopup
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
                            className: "popup-cursos-input"
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
                            className: "popup-cursos-select"
                        },
                        {
                            label: "Año",
                            name: "year",
                            defaultValue: cursoData.year || new Date().getFullYear(),
                            placeholder: "Ej: 2024",
                            fieldType: "input",
                            type: "number",
                            required: true,
                            className: "popup-cursos-input",
                            readOnly: true
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
                            className: "popup-cursos-input"
                        },
                    ]}
                    onSubmit={handleSubmit}
                    buttonText="Actualizar Curso"
                    className="popup-cursos-form"
                />
            </div>
        </div>
    );
}

