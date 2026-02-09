import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Guitarra from "./components/Guitarra.jsx";
import { db } from "./data/db.js";

function App() {
  // const [ data, setData ] = useState(db);
  const [data, setData] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    setData(db);
    setCarrito(JSON.parse(localStorage.getItem('carrito')));
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  function anyadirAlCarrito(guitarraObj) {
    const articuloExiste = carrito.findIndex(
      (element) => guitarraObj.id === element.id
    );
    if (articuloExiste >= 0) {
      // Hay q crear una copia porq React con los estados no re-renderiza hasta q nota una nueva entrada, es decir,
      // si modificamos el mismo array no lo detecta como una nueva entrada y no se actualiza directamente, solo
      // re-renderiza cuando detecta un cambio en la referencia del estado.

      // Usamos el spread operator porque sino no se crearia una copia, es decir,
      // "const copiaCarrito = carrito" trabajaría sobre el original.
      const copiaCarrito = [...carrito];
      copiaCarrito[articuloExiste].cantidad++;
      setCarrito(copiaCarrito);
    } else {
      guitarraObj.cantidad = 1;
      setCarrito((carrito) => [...carrito, guitarraObj]);
    }
  }

  function agregarCantidad(id) {
    const articuloIndex = carrito.findIndex((element) => element.id === id);
    const copiaCarrito = [...carrito];
    copiaCarrito[articuloIndex].cantidad++;
    setCarrito(copiaCarrito);
  }

  function eliminarCantidad(id) {
    const articuloIndex = carrito.findIndex((element) => element.id === id);
    const copiaCarrito = [...carrito];
    if (copiaCarrito[articuloIndex].cantidad > 0) {
      copiaCarrito[articuloIndex].cantidad--;
      setCarrito(copiaCarrito);
    }
  }

  function vaciarCarrito() {
    const copiaCarrito = [...carrito];
    copiaCarrito.splice(0, copiaCarrito.length);
    setCarrito(copiaCarrito);
  }

  function eliminarDelCarrito(id) {
    const nuevoCarrito = () => carrito.filter((element) => element.id !== id);
    setCarrito(nuevoCarrito);
  }

  return (
    <>
      <Header
        carrito={carrito}
        eliminarDelCarrito={eliminarDelCarrito}
        agregarCantidad={agregarCantidad}
        eliminarCantidad={eliminarCantidad}
        vaciarCarrito={vaciarCarrito}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((element) => (
            <Guitarra
              key={element.id}
              guitarraObj={element}
              anyadirAlCarrito={anyadirAlCarrito}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
