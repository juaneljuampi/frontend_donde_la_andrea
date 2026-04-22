function CarritoLista({ productos, onIncrementar, onDecrementar }) {
  // 🔁 Agrupar productos por ID y contar cantidades
  const productosAgrupados = productos.reduce((acc, prod) => {
    const existente = acc.find(p => p.id === prod.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      acc.push({ ...prod, cantidad: 1 });
    }
    return acc;
  }, []);

  return (
    <ul className="list-group mt-4">
      {productosAgrupados.map((p, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>{p.nombre}</strong>
            <span className="badge bg-primary ms-2">x{p.cantidad}</span>
            <span className="ms-3 text-muted">(${p.precioUnitario.toLocaleString('es-CL')} c/u)</span>
          </div>
          <div>
            <button
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={() => onDecrementar(p.id)}
              title="Quitar una unidad"
            >
              –
            </button>
            <button
              className="btn btn-outline-success btn-sm me-2"
              onClick={() => onIncrementar(p.id)}
              title="Agregar una unidad"
            >
              +
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDecrementar(p.id, true)}
              title="Eliminar producto"
            >
              🗑
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CarritoLista;
