import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  useEffect(() => {
    const autenticado = localStorage.getItem('usuarioAutenticado') === 'true';
    setEstaAutenticado(autenticado);

    const actualizarCantidad = () => {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      setCantidadCarrito(carrito.length);
    };

    window.addEventListener('storage', actualizarCantidad);
    actualizarCantidad();

    // 🔒 Expirar sesión automáticamente después de 30 minutos
    const tiempoExpiracion = 30 * 60 * 1000; // 30 minutos
    const temporizador = setTimeout(() => {
      if (localStorage.getItem('usuarioAutenticado') === 'true') {
        localStorage.removeItem('usuarioAutenticado');
        localStorage.removeItem('usuarioId');
        alert('Tu sesión ha expirado por tiempo. Debes iniciar sesión nuevamente.');
        window.location.href = '/login';
      }
    }, tiempoExpiracion);

    return () => {
      window.removeEventListener('storage', actualizarCantidad);
      clearTimeout(temporizador);
    };
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioAutenticado');
    localStorage.removeItem('usuarioId');
    window.location.reload();
  };

  const colorBadge = cantidadCarrito >= 10
    ? 'bg-danger'
    : cantidadCarrito >= 5
    ? 'bg-warning'
    : 'bg-success';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ height: '60px', backgroundColor: 'transparent' }}>
      <div className="container-fluid d-flex align-items-center" style={{ height: '60px', }}>
        <div className="d-flex align-items-center me-3" style={{ height: '60px' }}>
          <img
            src={`${process.env.PUBLIC_URL}/img/logo.png`}
            alt="Logo Boutique"
            style={{ height: '50px', objectFit: 'contain' }}
          />
          <Link className="navbar-brand fs-2 fw-bold ms-2" to="/" style={{ lineHeight: '50px' }}></Link>
        </div>

        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center" style={{ gap: '0.75rem' }}>
            {/* Ícono de carrito con contador */}
            <li className="nav-item position-relative d-flex align-items-center" style={{ height: '60px' }}>
              <Link
                className="nav-link d-flex align-items-center p-2"
                to="/carrito"
                style={{ height: '100%' }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/img/carrito.png`}
                  alt="Carrito"
                  style={{ height: '40px', width: '40px', objectFit: 'contain' }}
                />
                {cantidadCarrito > 0 && (
                  <span
                    className="position-absolute translate-middle badge rounded-pill bg-warning text-dark badge-animada"
                    style={{ fontSize: '0.80rem', top: '10px', right: '2px' }}
                  >
                    {cantidadCarrito}
                  </span>
                )}
              </Link>
            </li>

            <li className="nav-item d-flex align-items-center" style={{ height: '60px' }}>
              <Link
                className="nav-link active fs-5 fw-bold p-2"
                style={{ color: 'black', height: '100%', display: 'flex', alignItems: 'center' }}
                to="/registro"
              >
                Registro
              </Link>
            </li>

            <li className="nav-item d-flex align-items-center" style={{ height: '60px' }}>
              <Link
                className="nav-link active fs-5 fw-bold p-2"
                style={{ color: 'black', height: '100%', display: 'flex', alignItems: 'center' }}
                to="/productos"
              >
                Productos
              </Link>
            </li>

            {estaAutenticado && (
              <li className="nav-item d-flex align-items-center" style={{ height: '60px' }}>
                <img
                  src={`${process.env.PUBLIC_URL}/img/avatar.png`}
                  alt="Avatar"
                  className="rounded-circle me-2"
                  style={{
                    height: '40px',
                    width: '40px',
                    objectFit: 'cover',
                    border: '2px solid #007bff'
                  }}
                />
                <Link
                  className="nav-link active fs-5 fw-bold p-2"
                  style={{
                    color: 'black',
                    display: 'flex',
                    alignItems: 'center',
                    height: '40px',
                    borderRadius: '5px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    border: '2px solid transparent'
                  }}
                  to="/perfil"
                >
                  <i className="bi bi-person-circle me-1"></i> Editar perfil
                </Link>
              </li>
            )}

            <li className="nav-item d-flex align-items-center" style={{ height: '60px' }}>
              {estaAutenticado ? (
                <button
                  className="btn btn-outline-danger fw-bold"
                  style={{
                    backgroundColor: '#0c00f0ff',
                    borderColor: '#007bff',
                    color: '#fff',
                    fontSize: '0.9rem',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  onClick={cerrarSesion}
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
                </button>
              ) : (
                <Link
                  className="btn btn-primary ms-2 fw-bold"
                  to="/login"
                  style={{
                    backgroundColor: '#2a00e4ff',
                    borderColor: '#007bff',
                    color: '#fff',
                    fontSize: '1.05rem',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i> Iniciar sesión
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
