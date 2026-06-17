import React from 'react';
import { useNavigate } from 'react-router-dom';

function UsuarioNavbar() {
  const estaAutenticado = localStorage.getItem('usuarioAutenticado') === 'true';
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioAutenticado');
    navigate('/home');
  };

  const navLinkStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    borderRadius: '4px',
    padding: '0.5rem 0.75rem'
  };

  const buttonStyle = {
    backgroundColor: '#2a00e4ff',
    borderColor: '#007bff',
    color: '#fff',
    fontSize: '1.05rem',
    borderRadius: '6px',
    transition: 'all 0.3s ease'
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#493391ff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <div className="container-fluid px-4">
        <a className="navbar-brand me-4" href="#/home">
          <img
            src={`${process.env.PUBLIC_URL}/img/logo.png`}
            alt="Logo Boutique"
            style={{ height: '45px', objectFit: 'contain' }}
          />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item">
              <a className="nav-link active" style={navLinkStyle} href="#/compras">
                <i className="bi bi-receipt me-2"></i>Boletas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" style={navLinkStyle} href="#/estadisticas">
                <i className="bi bi-bar-chart me-2"></i>Estadísticas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" style={navLinkStyle} href="#/admin">
                <i className="bi bi-gear me-2"></i>Administración de Productos
              </a>
            </li>
            <li className="nav-item">
              {estaAutenticado ? (
                <button 
                  className="btn fw-bold" 
                  style={buttonStyle}
                  onClick={() => {
                    localStorage.removeItem('usuarioAutenticado');
                    window.location.reload();
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>Cerrar sesión
                </button>
              ) : (
                <a 
                  className="btn fw-bold" 
                  style={buttonStyle}
                  href="#/login"
                  onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar sesión
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default UsuarioNavbar;