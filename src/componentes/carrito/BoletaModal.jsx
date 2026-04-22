function BoletaModal({ boleta, onClose }) {
  if (!boleta) return null;
  const fecha = new Date(boleta.fechaHora).toLocaleString('es-CL');

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Boleta #{boleta.id}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>Fecha:</strong> {fecha}</p>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID Producto</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {boleta.detalles.map((d, i) => (
                  <tr key={i}>
                    <td>{d.productoId}</td>
                    <td>{d.nombre}</td>
                    <td>${d.precio.toLocaleString('es-CL')}</td>
                    <td>{d.cantidad}</td>
                    <td>${d.subtotal.toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-end">
              <p><strong>Neto:</strong> ${boleta.neto.toLocaleString('es-CL')}</p>
              <p><strong>IVA (19%):</strong> ${boleta.iva.toLocaleString('es-CL')}</p>
              <h5><strong>Total:</strong> ${boleta.total.toLocaleString('es-CL')}</h5>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BoletaModal;
