export default function cambioMoneda(number) {
    return number.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}