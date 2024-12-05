import { useEffect, useState } from "react";
import {
    getCursos,
    deleteCurso,
    createCurso,
    updateCurso,
} from "@services/curso.service";
import {
    deleteDataAlert,
    showSuccessAlert,
    showErrorAlert,
} from "../helpers/sweetAlert";
import Table from "@components/Table";
import Search from "@components/Search";
import PopupCursos from "@components/PopupCursos";

export default function Cursos() { //? Página para mostrar los cursos
    const [cursos, setCursos] = useState([]); //? Estado para almacenar los cursos
    const [loading, setLoading] = useState(true); //? Estado para mostrar un mensaje de carga
    const [filter, setFilter] = useState(""); //? Estado para filtrar los cursos
    const [showPopup, setShowPopup] = useState(false); //? Estado para mostrar el popup
    const [selectedCurso, setSelectedCurso] = useState(null); //? Estado para almacenar el curso seleccionado

    const fetchCursos = async () => { //? Función para obtener los cursos
        try {
            const response = await getCursos(); //? Obtenemos los cursos
            if (response) {
                setCursos(response);
            } else {
                showErrorAlert( //? Mostramos un mensaje de error
                    "Error al cargar los cursos",
                    "No se pudieron obtener los datos desde el servidor."
                );
            }
        } catch (error) {
            console.error("Error al cargar los cursos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => { //? Función para eliminar un curso
        try {
            if (!selectedCurso) {
                showErrorAlert("Error", "Selecciona un curso antes de eliminarlo.");
                return;
            }
            const result = await deleteDataAlert();
            if (result.isConfirmed) {
                await deleteCurso(selectedCurso.code);
                showSuccessAlert(
                    "¡Curso eliminado!",
                    "El curso ha sido eliminado correctamente."
                );
                setSelectedCurso(null);
                fetchCursos();
            }
        } catch (error) {
            console.error("Error al eliminar el curso:", error);
        }
    };

    const handleCreate = async (data) => { //? Función para crear un curso
        try {
            await createCurso(data);
            setShowPopup(false);
            fetchCursos();
            showSuccessAlert(
                "¡Curso creado!",
                "El curso ha sido creado correctamente."
            );
        } catch (error) {
            console.error("Error al crear el curso:", error);
            showErrorAlert(
                "Error al crear el curso",
                "Ocurrió un error al intentar crear el curso."
            );
        }
    };

    const handleUpdate = async (data) => {  //? Función para actualizar un curso
        try {
            await updateCurso(data, selectedCurso.code);
            setShowPopup(false);
            setSelectedCurso(null);
            fetchCursos();
            showSuccessAlert(
                "¡Curso actualizado!",
                "El curso ha sido actualizado correctamente."
            );
        } catch (error) {
            console.error("Error al actualizar el curso:", error);
            showErrorAlert(
                "Error al actualizar el curso",
                "Ocurrió un error al intentar actualizar el curso."
            );
        }
    };

    // Función para manejar la búsqueda por código
    const handleSearch = (e) => {
        setFilter(e.target.value);
    };

    // Función para manejar el click en una fila de la tabla
    const handleRowClick = (curso) => {
        console.log("Curso seleccionado:", curso);
        setSelectedCurso(curso);
        setShowPopup(true);
    };

    useEffect(() => {
        fetchCursos();
    }, []);

    return (
        <div className="container">
            <h1>Cursos</h1>
            <div className="actions">
                <Search
                    value={filter}
                    onChange={handleSearch}
                    placeholder="Buscar por código"
                />
                <button
                    onClick={() => {
                        setSelectedCurso(null);
                        setShowPopup(true);
                    }}
                >
                    Nuevo Curso
                </button>
            </div>
            {loading ? (
                <p>Cargando cursos...</p>
            ) : (
                <Table
                    data={cursos}
                    columns={[
                        { title: "Código", field: "code" },
                        { title: "Nombre", field: "name" },
                    ]}
                    filter={filter}
                    dataToFilter="code"
                    rowClick={(e, row) => handleRowClick(row)}
                />
            )}
            {selectedCurso && (
                <div className="actions">
                    <button onClick={() => setShowPopup(true)}>Editar Curso</button>
                    <button onClick={handleDelete}>Eliminar Curso</button>
                </div>
            )}
            {showPopup && (
                <PopupCursos
                    show={showPopup}
                    setShow={setShowPopup}
                    data={selectedCurso}
                    action={selectedCurso ? handleUpdate : handleCreate}
                />
            )}
        </div>
    );
}
