// Declaro el body de la tabla para usarlo.
const tablaBody = document.querySelector("#listado-clientes");

// Hago un eventListener que al cargar el DOM se obtengan los clientes y se muestren.
document.addEventListener("DOMContentLoaded", (e) => {
  obtenerClientes();
});

// Añado un eventListener que al clicar el target de la tabla que contiene la clase "eliminar" recoga el data-cliente y genere una
// alerta preguntando si quiere eliminar el cliente.
tablaBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminar")) {
    const id = e.target.dataset.cliente;
    const confirmar = window.confirm("¿Deseas eliminar este cliente?");
    // Si la respuesta es que si, se elimina.
    if (confirmar) {
      eliminarCliente(id);
    }
  }
});

// Funcion asyncrona para obtener los clientes, mediante la url.
async function obtenerClientes() {
  const url = "http://localhost:4000/clientes";
  try {
    // Espero a que se haga el fetch() para pasar a lo siguiente.
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    // Con la informacion obtenida de la llamada hago un destrcuturing para obtener los valores que necesito del cliente.
    data.forEach((cliente) => {
      const { id, nombre, email, telefono, empresa } = cliente;

      // Creo las filas para los clientes, agregando las celdas necesarias.
      const fila = document.createElement("tr");
      const celdaNombre = document.createElement("td");
      const textNombre = document.createElement("p");
      celdaNombre.classList.add(
        "px-6",
        "py-4",
        "whitespace-no-wrap",
        "border-b",
        "border-gray-200"
      );
      textNombre.classList.add(
        "text-sm",
        "leading-5",
        "font-medium",
        "text-gray-700",
        "text-lg",
        "font-bold"
      );
      textNombre.textContent = nombre;
      celdaNombre.appendChild(textNombre);
      const textCorreo = document.createElement("p");
      textCorreo.classList.add("text-sm", "leading-10", "text-gray-700");
      textCorreo.textContent = email;
      celdaNombre.appendChild(textCorreo);

      const celdaTelefono = document.createElement("td");
      celdaTelefono.classList.add(
        "px-6",
        "py-4",
        "whitespace-no-wrap",
        "border-b",
        "border-gray-200"
      );
      const textTelefono = document.createElement("p");
      textTelefono.textContent = telefono;
      textTelefono.classList.add("text-gray-700");
      celdaTelefono.appendChild(textTelefono);

      const celdaEmpresa = document.createElement("td");
      celdaEmpresa.classList.add(
        "px-6",
        "py-4",
        "whitespace-no-wrap",
        "border-b",
        "border-gray-200"
      );
      const textEmpresa = document.createElement("p");
      textEmpresa.textContent = empresa;
      textEmpresa.classList.add("text-gray-600");
      celdaEmpresa.appendChild(textEmpresa);

      // Agrego las celdas a la fila para posteriormente agregar la fila a la tabla.
      fila.appendChild(celdaNombre);
      fila.appendChild(celdaTelefono);
      fila.appendChild(celdaEmpresa);
      fila.innerHTML += `<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5"> 
                    <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a> 
                    <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a> 
                </td> `;
      tablaBody.appendChild(fila);
    });
  } catch (error) {
    console.log(error);
  }
}


// Creo una función asyncrona para eliminar el cliente selecionado.
async function eliminarCliente(id) {
  const url = `http://localhost:4000/clientes/${id}`;

  try {
    // Hago un fetch() indicando que es para hacer un delete.
    const respuesta = await fetch(url, {
      method: "DELETE",
    });
    // Si se produce algun problema en el borrado lanzo un error.
    if (!respuesta.ok) throw new Error("Error al borrar el cliente");
    // Elimino la fila del cliente.
    document
      .querySelector(`[data-cliente="${id}"]`)
      .parentElement.parentElement.remove();
  } catch (error) {
    console.log(error);
  }
}
