import { useMemo } from "react";

export default function Header({ carrito, eliminarDelCarrito, agregarCantidad, eliminarCantidad, vaciarCarrito }) {
  // Arrow function
  // const carritoVacio = () => carrito.length == 0;
  // const carritoTotal = () => carrito.reduce((total, element) => total + (element.cantidad * element.price), 0)
  const carritoVacio = useMemo(() => carrito.length === 0, [carrito]);
  // UseMemo sirve para optimizar, y evitar que se ejecute en cada render, solo se recalcula cuando cambian las dependencias
  // que le indicamos.
  const carritoTotal = useMemo(
    () =>
      carrito.reduce(
        (total, element) => total + element.cantidad * element.price,
        0
      ),
    [carrito] // Dependencias del UseMemo()
  );

  return (
    <>
      <header className="py-5 header">
        <div className="container-xl">
          <div className="row justify-content-center justify-content-md-between">
            <div className="col-8 col-md-3">
              <a href="index.html">
                <img
                  className="img-fluid"
                  src="./img/logo.svg"
                  alt="imagen logo"
                />
              </a>
            </div>
            <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
              <div className="carrito">
                <img
                  className="img-fluid"
                  src="./img/carrito.png"
                  alt="imagen carrito"
                />

                <div id="carrito" className="bg-white p-3">
                  {carritoVacio ? (
                    <p className="text-center">El carrito esta vacio</p>
                  ) : (
                    <>
                      <table className="w-100 table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {carrito.map((element) => (
                            <tr key={element.id}>
                              <td>
                                <img
                                  className="img-fluid"
                                  src={`./public/img/${element.image}.jpg`}
                                  alt="imagen guitarra"
                                />
                              </td>
                              <td>{element.name}</td>
                              <td className="fw-bold">{element.price}€</td>
                              <td className="flex align-items-start gap-4">
                                <button type="button" className="btn btn-dark" onClick={() => eliminarCantidad(element.id)}>
                                  -
                                </button>
                                {element.cantidad}
                                <button type="button" className="btn btn-dark" onClick={() => agregarCantidad(element.id)}>
                                  +
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  type="button"
                                  onClick={() => eliminarDelCarrito(element.id)}
                                >
                                  X
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <p className="text-end">
                        Total pagar:{" "}
                        <span className="fw-bold">{carritoTotal}€</span>
                      </p>
                    </>
                  )}

                  <button className="btn btn-dark w-100 mt-3 p-2" onClick={() => vaciarCarrito()}>
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
