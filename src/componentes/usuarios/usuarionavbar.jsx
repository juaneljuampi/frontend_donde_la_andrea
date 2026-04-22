import { Link } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function UsuarioNavbar() {
  const navigate = useNavigate();
  const estaAutenticado = localStorage.getItem('usuarioAutenticado') === 'true';
  const cerrarSesion = () => {
    localStorage.removeItem('usuarioAutenticado');
    navigate('/home');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#5a4a91' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to=""></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
                                    <li className="nav-item"><a className="nav-link active fs-5 fw-bold" href="#/compras">boletas</a></li>

                        <li className="nav-item"><a className="nav-link active fs-5 fw-bold" href="#/estadisticas">Estadísticas</a></li>

                        <li className="nav-item"><a className="nav-link active fs-5 fw-bold" href="#/admin">Administración de Productos</a></li>

  <li className="nav-item">
  {estaAutenticado ? (
    <button className="btn btn-outline-danger fw-bold" style={{ backgroundColor: '#2a00e4ff', borderColor: '#007bff', color: '#fff', fontSize: '1.05rem' }} onClick={() => {
      localStorage.removeItem('usuarioAutenticado');
      window.location.reload();
    }}>
      <i className="bi bi-box-arrow-right me-1"></i> Cerrar sesión
    </button>
  ) : (
    <a className="btn btn-primary ms-2 fw-bold" href="/login"
      style={{ backgroundColor: '#2a00e4ff', borderColor: '#007bff', color: '#fff', fontSize: '1.05rem' }}>
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

export default UsuarioNavbar;