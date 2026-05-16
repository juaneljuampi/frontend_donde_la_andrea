import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function ProductoCard2({ producto, onVer }) {
  return (
    <div className="d-inline-block">
      <div className="card m-3 shadow-sm" style={{ width: '16rem' }}>
        <img
          src={`https://backend-donde-la-andrea.onrender.com${producto.imagen}`}
          alt={producto.nombre}
          className="card-img-top img-thumbnail"
          style={{ height: '180px', objectFit: 'cover' }}
          onError={(e) => { e.target.src = '/img/default.jpg'; }}
        />
        <div className="card-body">
          <h5 className="card-title">{producto.nombre}</h5>
          <p className="card-text" style={{ fontSize: '0.9rem' }}>{producto.descripcion}</p>
          <p className="card-text"><strong>${producto.precioUnitario.toLocaleString('es-CL')}</strong></p>
          <button className="btn btn-primary btn-sm"style={{background:'blue'}} onClick={() => onVer(producto)}>Ver</button>
        </div>
      </div>
    </div>
  );
  
}


export default ProductoCard2;
