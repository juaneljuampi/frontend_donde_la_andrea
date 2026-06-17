import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {
  const estaAutenticado = localStorage.getItem('usuarioAutenticado') === 'true';
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioAutenticado');
    navigate('/home');
  };

  const gradientBg = { background: 'linear-gradient(90deg, #493391ff 0%, #2a00e4ff 100%)' };
  const actionBtn = { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.15)', color: '#fff' };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={gradientBg}>
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img
            src={`${process.env.PUBLIC_URL}/img/logo.png`}
            alt="Logo Boutique"
            style={{ height: '48px', objectFit: 'contain', marginRight: '12px' }}
          />
          <a className="navbar-brand fs-4 fw-bold text-white" href="#/home" style={{ letterSpacing: '0.5px' }}>Boutique</a>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item px-2"><a className="nav-link active fs-6 text-white" href="#/compras">Boletas</a></li>
            <li className="nav-item px-2"><a className="nav-link active fs-6 text-white" href="#/admin">Administración</a></li>
            <li className="nav-item px-2"><a className="nav-link active fs-6 text-white" href="#/usuarios">Usuarios</a></li>

            <li className="nav-item px-2">
              {estaAutenticado ? (
                <button
                  className="btn btn-sm rounded-3 border-0 d-flex align-items-center"
                  style={{ ...actionBtn, background: 'rgba(255,255,255,0.06)', padding: '8px 12px', fontSize: '0.95rem' }}
                  onClick={cerrarSesion}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Cerrar sesión
                </button>
              ) : (
                <a
                  className="btn btn-sm rounded-3 d-flex align-items-center"
                  href="https://juaneljuampi.github.io/frontend_donde_la_andrea/#/login"
                  style={{ background: '#2a00e4ff', border: 'none', color: '#fff', padding: '8px 12px', fontSize: '0.95rem' }}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Iniciar sesión
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
