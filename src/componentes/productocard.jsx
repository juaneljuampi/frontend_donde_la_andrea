import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductoCard({ producto, onVer }) {
  return (
    <div className="card h-100 shadow-sm rounded" style={{ backgroundColor: '#e5d4ed', borderRadius: '20px' }}>
      <img
        src={`https://backend-donde-la-andrea.onrender.com/${producto.imagen}`}
        alt={producto.nombre}
        className="card-img-top img-thumbnail rounded-top"
        style={{ maxWidth: '280px', height: '200px', objectFit: 'cover', backgroundColor: '#000000ff' }}
        onError={(e) => { e.target.src = '/img/default.jpg'; }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title" style={{ fontSize: '0.9' }}>{producto.nombre}</h5>
          <p className="card-text" style={{ color: 'black', fontSize: '0.9rem', height: '100px' }}>{producto.descripcion}</p>
        </div>
        <div>
          <p className="card-text" style={{ color: '#f80707ff', fontSize: '15px' }}>
            <small>Categoria: {producto.categoria}</small>
          </p>
          <p className="card-text" style={{ color: '#0d00fdff', fontSize: '15px' }}>
            <small>
              Disponible: {producto.cantidad} unidades
              {producto.cantidad < 5 && (
                <span className="badge bg-danger ms-2">⚠️ Stock crítico</span>
              )}
            </small>
          </p>
          <p className="card-text">
            Precio : <strong>${producto.precioUnitario.toLocaleString('es-CL')}</strong>
          </p>
          <button
            className="btn btn-primary btn-sm w-100"
            style={{ backgroundColor: '#0d00fdff', color: '#ffffff', borderRadius: '10px' }}
            onClick={() => onVer(producto)}
          >
            Ver
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoCard;
