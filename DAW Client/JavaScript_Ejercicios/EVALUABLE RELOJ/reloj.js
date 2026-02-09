// Funcion para mostrar el reloj e ir actualizandolo mediante el setInterval() que hay en el HTML, cada 100 ms.
function mostrarReloj() {
    // Declaro la fecha de hoy.
  const hoy = new Date();
  // Cojo el div con id "hora" del DOM para añadirle el string con la hora con "text.context".
  const reloj = document.querySelector("#hora");
  // A la hora que añado al div, le pongo que salga la informacion con dos digitos.
  reloj.textContent = hoy.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  // Con parenElement le digo que se vaya quitando y añadiendo la clase "animar" del CSS.
  reloj.parentElement.classList.toggle("animar");

  // Declaro la fecha cogiendo el div con id "fecha" al igual que antes,
  // y con "textContext" le asigno la fecha de hoy con "toLocaleDateString()" diciendole
  // que sea en español y seleccionando el formato que deseo. 
  const fecha = document.querySelector("#fecha");
  fecha.textContent = hoy.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
};
