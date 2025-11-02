// Declaro los objetos dle HTML que voy a usar.
const formulario = document.querySelector("#formulario");
const btnBuscar = formulario.querySelector("input[type=submit]");
const resultado = document.querySelector("#resultado");
const paginacionDiv = document.querySelector("#paginacion");

// Declaro las variables para hacer la paginación.
let paginaActual = 1;
const registrosPorPagina = 40;
let totalPaginas;
let iterador;

// Añado un evento para esperar a que se cargue correctamete el DOM.
document.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM cargado correctamente");
});

// Añado un eventListener al boton para buscar las imagenes que al clicar llame a la funcion mostrarInfo() pasando el valor del input,
btnBuscar.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarInfo(formulario.querySelector("#termino").value);
});


// Funcion para mostrar la información sin async, según la palabra.
/*function mostrarInfo(termino) {
  // Hago que el div donde se muestra el resultado se quede vacio, para que no se sobrescriba.
  resultado.innerHTML = "";
  // Lo mismo con la paginacion.
  paginacionDiv.innerHTML = "";
  // La url de la llamada, con la key, y los dieferentes parametros, como per_page para esocger las fotos por pagina y page para la página actual.
  const url = `https://pixabay.com/api/?key=53050832-9b1caba4344bb262dc8f801f5&q=${termino}&image_type=photo&per_page=${registrosPorPagina}&page=${paginaActual}`;
  
  // Hago un fect de la url en el que a los datos les hago un destrcuturing para obtener los valores que quiero usar, evidentemente de cada imagen por eso el foreach.
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      // Para sacar el total de páginas redondeo a la alta, ya que si redondeo al mas cercano o mas bajo puede haber momentos en los que no se muestren las 40 imagenes/registros.
      totalPaginas = Math.ceil(data.totalHits / registrosPorPagina);
      data.hits.forEach((imagen) => {
        const { previewURL, likes, views, largeImageURL } = imagen;
        const contenedor = document.createElement("div");
        contenedor.classList.add(
          "w-1/2",
          "md:w-1/3",
          "lg:w-1/4",
          "mb-4",
          "p-3"
        );
        // HAgo DOM scripting para añadir la dieferente información con sus clases correspondientes.
        contenedor.id = "informacion";
        const informacion = document.createElement("div");
        informacion.classList.add("bg-white");
        const imgBaja = document.createElement("img");
        imgBaja.src = previewURL;
        imgBaja.classList.add("w-full");
        informacion.appendChild(imgBaja);
        const infoImg = document.createElement("div");
        infoImg.classList.add("p-4");
        const likeImg = document.createElement("p");
        likeImg.classList.add("font-bold");
        likeImg.textContent = likes;
        const likesImgTexto = document.createElement("span");
        likesImgTexto.textContent = " Me gusta";
        likesImgTexto.classList.add("font-light");
        likeImg.appendChild(likesImgTexto);
        infoImg.appendChild(likeImg);
        const viewsImg = document.createElement("p");
        viewsImg.classList.add("font-bold");
        viewsImg.textContent = views;
        const viewsImgTexto = document.createElement("span");
        viewsImgTexto.textContent = " Veces Vista";
        viewsImgTexto.classList.add("font-light");
        viewsImg.appendChild(viewsImgTexto);
        infoImg.appendChild(viewsImg);
        const enlace = document.createElement("a");
        enlace.href = largeImageURL;
        enlace.textContent = "VER IMAGEN";
        enlace.classList.add(
          "block",
          "w-full",
          "bg-blue-800",
          "hover:bg-blue-500",
          "text-white",
          "uppercase",
          "font-bold",
          "text-center",
          "rounded",
          "mt-5",
          "p-1"
        );
        infoImg.appendChild(enlace);
        informacion.appendChild(infoImg);
        contenedor.appendChild(informacion);
        resultado.appendChild(contenedor);
      });
      mostrarPaginador();
    })
    .catch((error) => {
      console.log(error);
    });
}*/

// Esta función hace exactamente lo mimsmo que la anterior solo que con Asyn / Await.
async function mostrarInfo(termino) {
  resultado.innerHTML = "";
  paginacionDiv.innerHTML = "";

  const url = `https://pixabay.com/api/?key=53050832-9b1caba4344bb262dc8f801f5&q=${termino}&image_type=photo&per_page=${registrosPorPagina}&page=${paginaActual}`;

  try {
    const respuesta = await fetch(url);
    const data = await respuesta.json();

    totalPaginas = Math.ceil(data.totalHits / registrosPorPagina);

    data.hits.forEach((imagen) => {
      const { previewURL, likes, views, largeImageURL } = imagen;
      const contenedor = document.createElement("div");
      contenedor.classList.add("w-1/2", "md:w-1/3", "lg:w-1/4", "mb-4", "p-3");
      contenedor.id = "informacion";

      const informacion = document.createElement("div");
      informacion.classList.add("bg-white");

      const imgBaja = document.createElement("img");
      imgBaja.src = previewURL;
      imgBaja.classList.add("w-full");
      informacion.appendChild(imgBaja);

      const infoImg = document.createElement("div");
      infoImg.classList.add("p-4");

      const likeImg = document.createElement("p");
      likeImg.classList.add("font-bold");
      likeImg.textContent = likes;
      const likesImgTexto = document.createElement("span");
      likesImgTexto.textContent = " Me gusta";
      likesImgTexto.classList.add("font-light");
      likeImg.appendChild(likesImgTexto);
      infoImg.appendChild(likeImg);

      const viewsImg = document.createElement("p");
      viewsImg.classList.add("font-bold");
      viewsImg.textContent = views;
      const viewsImgTexto = document.createElement("span");
      viewsImgTexto.textContent = " Veces Vista";
      viewsImgTexto.classList.add("font-light");
      viewsImg.appendChild(viewsImgTexto);
      infoImg.appendChild(viewsImg);

      const enlace = document.createElement("a");
      enlace.href = largeImageURL;
      enlace.textContent = "VER IMAGEN";
      enlace.classList.add(
        "block",
        "w-full",
        "bg-blue-800",
        "hover:bg-blue-500",
        "text-white",
        "uppercase",
        "font-bold",
        "text-center",
        "rounded",
        "mt-5",
        "p-1"
      );
      infoImg.appendChild(enlace);

      informacion.appendChild(infoImg);
      contenedor.appendChild(informacion);
      resultado.appendChild(contenedor);
    });

    mostrarPaginador();
  } catch (error) {
    console.log(error);
  }
}

// Funcion para crear el paginador al cual le paso el total de las paginas obtenido, mediante un generado "function*"
function* crearPaginador(total) {
  for (let i = 1; i <= total; i++) {
    // El yield lo que hace es pausar la ejecucion y devolver el valor de i.
    yield i;
  }
}

// Función para mostrar el paginador.
function mostrarPaginador() {
  paginacionDiv.innerHTML = "";
  iterador = crearPaginador(totalPaginas);

  // Genero un bucle infinito para obtener la informacion de las ejecuciones del paginador, usando iterador.next() devuelvo el valor y si la ejecucion ya ha terminado.
  while (true) {
    const { value, done } = iterador.next();
    // Si ha acabado sale del bucle.
    if (done) return;

    // Si no ha acabado, es decir, tiene paginas que mostrar, creo el boton para mostrar la siguiente página.
    const boton = document.createElement("button");
    boton.textContent = value;
    boton.classList.add(
      "siguiente",
      "bg-yellow-400",
      "px-4",
      "py-1",
      "mr-2",
      "font-bold",
      "mb-4",
      "rounded"
    );

    // Le añado un eventListener que al clicar cambie el valor de página actual, el cual se le pone en la url de la llamada y vuelva a mostrar la información.
    boton.addEventListener("click", () => {
      paginaActual = value;
      const termino = document.querySelector("#termino").value;
      mostrarInfo(termino);
    });

    paginacionDiv.appendChild(boton);
  }
}
