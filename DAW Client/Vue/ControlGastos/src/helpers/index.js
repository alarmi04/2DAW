export default function cambioMoneda(number) {
    return number.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

export const generarId = () => {
    const fecha = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    return fecha + random;
}

export const formatearFecha = (fecha) => {
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return fecha.toLocaleDateString('es-Es', opciones);
}