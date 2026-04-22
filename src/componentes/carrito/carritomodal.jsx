function CarritoModal({ productos, total, onClose, onPagar }) {
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

  const fechaCompra = new Date().toLocaleString('es-CL');

  // 👇 cálculos de neto, IVA y total
  const neto = productosAgrupados.reduce(
    (acc, p) => acc + p.precioUnitario * p.cantidad,
    0
  );
  const iva = Math.round(neto * 0.19); // IVA 19%
  const totalConIva = neto + iva;

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">🧾 Boleta de Compra</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>Fecha de compra:</strong> {fechaCompra}</p>

            <table className="table table-bordered mb-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Precio Unitario</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {productosAgrupados.map((p, index) => (
                  <tr key={index}>
                    <td>{p.id}</td>
                    <td>{p.nombre}</td>
                    <td>${p.precioUnitario.toLocaleString('es-CL')}</td>
                    <td>{p.cantidad}</td>
                    <td>${(p.precioUnitario * p.cantidad).toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 👇 mostrar neto, IVA y total */}
            <div className="text-end">
              <p><strong>Neto:</strong> ${neto.toLocaleString('es-CL')}</p>
              <p><strong>IVA (19%):</strong> ${iva.toLocaleString('es-CL')}</p>
              <h5><strong>Total a pagar:</strong> ${totalConIva.toLocaleString('es-CL')}</h5>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn"
              style={{ backgroundColor: '#039b29', color: '#fff' }}
              onClick={onPagar}
            >
              Pagar
            </button>
            <button className="btn btn-secondary"style={{backgroundColor :'red', color :'white' }} onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarritoModal;
