const tablaBody = document.querySelector("#listado-clientes");

document.addEventListener("DOMContentLoaded", (e) => {
  obtenerClientes();
});

async function obtenerClientes() {
  const url = "http://localhost:4000/clientes";
  try {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    data.forEach((cliente) => {
      const { id, nombre, email, telefono, empresa } = cliente;
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
