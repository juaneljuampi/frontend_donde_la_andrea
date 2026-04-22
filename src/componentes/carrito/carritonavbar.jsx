import React, { useEffect, useState } from 'react';

function CarritoNavbar() {
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

    return () => window.removeEventListener('storage', actualizarCantidad);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioAutenticado');
    window.location.reload();
  };
const colorBadge = cantidadCarrito >= 10
  ? 'bg-danger'
  : cantidadCarrito >= 5
  ? 'bg-warning'
  : 'bg-success';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark " style={{ height: '60px', backgroundColor: 'colorBadge' }}>
      <div className="container-fluid">
          <img
            src={`${process.env.PUBLIC_URL}/img/logo.png`}
            alt="Logo Boutique"
            style={{ height: '50px', objectFit: 'contain' }}
          />        <a className="navbar-brand fs-2 fw-bold" href=""></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span
            className={`position-absolute top-0 start-100 translate-middle badge rounded-pill text-light ${colorBadge} badge-animada`}
            style={{ fontSize: '0.75rem' }}
          >
            {cantidadCarrito}
          </span>

        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
                        {/* Ícono de carrito con contador */}
            <li className="nav-item position-relative me-3">
              <a className="nav-link" href="https://juaneljuampi.github.io/frontend-react/#/carrito">
                <img
                  src="/public/img/carrito.png"
                  alt="Carrito"
                  style={{ height: '40px', width: '40px', objectFit: 'contain' }}
                />
                {cantidadCarrito > 0 && (
                <span
                  className={`position-absolute top-2 start-100 translate-middle badge rounded-pill bg-warning text-dark badge-animada`}
                  style={{ fontSize: '0.80rem' }}
                >
                  {cantidadCarrito}
                </span>
                )}
              </a>
            </li>

            <li className="nav-item"><a className="nav-link active fs-5 fw-bold"style={{color:'black'}} href="https://juaneljuampi.github.io/frontend-react/#/registro">Registro</a></li>
            <li className="nav-item"><a className="nav-link active fs-5 fw-bold"style={{color:'black'}} href="https://juaneljuampi.github.io/frontend-react/#/productos">Productos  </a></li>
            <li className="nav-item"><a className="nav-link active fs-5 fw-bold" href=""></a></li>




            {/* Botón de login/logout */}
            <li className="nav-item">
              {estaAutenticado ? (
                <button
                  className="btn btn-outline-danger fw-bold"
                  style={{
                    backgroundColor: '#0c00f0ff',
                    borderColor: '#007bff',
                    color: '#fff',
                    fontSize: '0.9rem'
                    
                  }}
                  onClick={cerrarSesion}
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
                </button>
              ) : (
                <a
                  className="btn btn-primary ms-2 fw-bold"
                  href="/login"
                  style={{
                    backgroundColor: '#2a00e4ff',
                    borderColor: '#007bff',
                    color: '#fff',
                    fontSize: '1.05rem'
                  }}
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i> Iniciar sesión
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CarritoNavbar;
