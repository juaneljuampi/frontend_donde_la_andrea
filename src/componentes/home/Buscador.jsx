import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Buscador({ busquedaNombre, setBusquedaNombre, busquedaCategoria, setBusquedaCategoria }) {
  return (
    <div className="container mt-2" style={{
  backgroundColor: 'transparent',
  paddingBottom: '0.5px'
}}>
      
      <div className="row">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre de producto"
            value={busquedaNombre}
            onChange={(e) => setBusquedaNombre(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={busquedaCategoria}
            onChange={(e) => setBusquedaCategoria(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            <option value="cuidado corporal">Cuidado corporal</option>
            <option value="fragancias">Fragancias</option>
            <option value="capilar">Capilar</option>
            <option value="higiene">Higiene</option>
            <option value="exfoliantes">Exfoliantes</option>
            <option value="cuidado facial">Cuidado facial</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Buscador;
