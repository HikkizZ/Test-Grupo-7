import { useEffect } from "react";
import { useGetNotas } from "../hooks/calificacion/useGetNotas";
import { useCalificar } from "../hooks/calificacion/useCalificar";

import NotasTable from "../components/calificaciones/NotasTable";

export default function Calificar() {
    const { notas, fetchNotas, loading } = useGetNotas();
    const { handleCalificar, loading: loadingCalificar } = useCalificar(fetchNotas);
    
    useEffect(() => {
        fetchNotas(); 
    }, [fetchNotas]);

    const noNotas = !notas || notas.length === 0;

    console.log('notas:', notas);
    return (
        <div>
            <br />
            <br />
            <br />
            <section>
                <h1>Calificaciones</h1>
            </section>

            <section>
                {noNotas ? (
                    <p>No hay calificaciones registradas</p>
                ) : (
                    <NotasTable
                    notas={notas}
                    onCalificar={handleCalificar}
                    />
                )}
            </section>
        </div>
    );
}
