function ProductoTabla({ productos, onEditar, onEliminar, onToggleActivo }) {
  return (
    <div className="table-responsive">
    <table className="table table-bordered table-sm">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Imagen</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nombre}</td>
            <td>{p.descripcion}</td>
            <td>{p.categoria}</td>
            <td>${p.precioUnitario.toLocaleString('es-CL')}</td>
            <td>{p.cantidad}</td>
            <td>
              <img
                src={`https://backend-donde-la-andrea.onrender.com${p.imagen}`}
                width="50"
                alt={p.nombre}
                className="img-thumbnail"
                onError={(e) => { e.target.src = '/img/default.jpg'; }}
              />
            </td>
            <td>
              <span className={`badge ${p.activo ? 'bg-success' : 'bg-secondary'}`}>
                {p.activo ? 'Activo' : 'Inactivo'}
              </span>
            </td>
            <td>
              <button className="btn btn-primary btn-sm me-2"style={{color:'white',background:'green'}} onClick={() => onEditar(p)}>Editar</button>
              <button className="btn btn-danger btn-sm me-2" onClick={() => { onEliminar(p.id);  }}>Eliminar</button>
              <button
                className={`btn btn-sm ${p.activo ? 'btn-warning' : 'btn-success'}`}style={{color:p.activo ? 'black' : 'white',background:p.activo ? 'yellow' : 'blue'}}
                onClick={() => onToggleActivo(p.id, p.activo)}
              >
                {p.activo ? 'Desactivar' : 'Activar'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default ProductoTabla;
