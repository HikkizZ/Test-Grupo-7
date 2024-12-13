import { useState, useEffect } from "react";

export default function HorarioBox({ horarios }) {
    const [horarioMatrix, setHorarioMatrix] = useState([]);

    useEffect(() => {
        // Generar una matriz de horarios basada en los datos
        const hours = [
            "8:10", "9:40", "11:10","12:40",
            "14:10", "15:40", "17:10",
        ];

        const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

        const matrix = hours.map((hour) => {
            const row = { hour };
            days.forEach((day) => {
                const horario = horarios.find(
                    (h) =>
                        h.dayOfWeek === day &&
                        h.period.startTime === hour
                );
                row[day] = horario ? `${horario.curso} (${horario.subject})` : "";
            });
            return row;
        });

        setHorarioMatrix(matrix);
    }, [horarios]);

    return (
        <div style={{ margin: "20px 0" }}>
            <h2>Vista de Horario</h2>
            <table border="1" style={{ width: "100%", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>Horas/Días</th>
                        <th>Lunes</th>
                        <th>Martes</th>
                        <th>Miércoles</th>
                        <th>Jueves</th>
                        <th>Viernes</th>
                    </tr>
                </thead>
                <tbody>
                    {horarioMatrix.map((row, index) => (
                        <tr key={index}>
                            <td>{row.hour}</td>
                            <td>{row.Lunes}</td>
                            <td>{row.Martes}</td>
                            <td>{row.Miércoles}</td>
                            <td>{row.Jueves}</td>
                            <td>{row.Viernes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
