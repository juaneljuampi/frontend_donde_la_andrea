function ProductoResultado({ producto, onEditar, onEliminar, onToggleActivo }) {
  if (!producto) return <p className="text-danger">El producto no se encuentra en la base de datos.</p>;

  return (
    <div className="table-responsive">
    <table className="table table-bordered">
      <thead className="table-secondary">
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
        <tr>
          <td>{producto.id}</td>
          <td>{producto.nombre}</td>
          <td>{producto.descripcion}</td>
          <td>{producto.categoria}</td>
          <td>${producto.precioUnitario?.toLocaleString('es-CL')}</td>
          <td>{producto.cantidad}</td>
          <td><img
                src={`https://backend-production-fcfc3.up.railway.app${producto.imagen}`}
                width="50"
                alt={producto.nombre}
                className="img-thumbnail"
                onError={(e) => { e.target.src = '/img/default.jpg'; }}
              /></td>
          <td>
            <span className={`badge ${producto.activo ? 'bg-success' : 'bg-secondary'}`}>
              {producto.activo ? 'Activo' : 'Inactivo'}
            </span>
          </td>
          <td>
            <button className="btn btn-primary btn-sm me-2"style={{background:'green'}} onClick={() => onEditar(producto)}>Editar</button>
            <button className="btn btn-danger btn-sm me-2" onClick={() => { onEliminar(producto.id); window.alert('Producto eliminado correctamente.'); }}>Eliminar</button>
            
            <button
              className={`btn btn-sm ${producto.activo ? 'btn-warning' : 'btn-success'}`}style={{background:'yellow', color:'black'}}
              onClick={() => {
                onToggleActivo(producto.id, producto.activo);
                
              }}
            >
              {producto.activo ? 'Desactivar' : 'Activar'}

            </button>

          </td>
        </tr>
      </tbody>
    </table>
    </div>
  );
}

export default ProductoResultado;
