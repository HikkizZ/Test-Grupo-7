export function formatToLocalTime(date) {                 //? This function formats the date to local time. (Chile)
    return new Date(date).toLocaleString('es-CL', {   
        timeZone: 'America/Santiago',         
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23' // Asegura el formato de 24 horas
    }).replace(',', ''); // Elimina la coma en el formato
}
