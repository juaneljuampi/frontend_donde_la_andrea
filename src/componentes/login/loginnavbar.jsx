import React from 'react';
import { Link } from 'react-router-dom';

function LoginNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'plum' }}>
      <div className="container-fluid">
                <img
                src={`${process.env.PUBLIC_URL}/img/logo.png`}
                alt="Logo Boutique"
                style={{ height: '50px', objectFit: 'contain' }}
              />
        <Link className="navbar-brand" to=""></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="#/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="#/registro">Registro</Link></li>
          
            <li className="nav-item"><Link className="nav-link" to="#/productos">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="#/carrito">Carrito</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default LoginNavbar;
