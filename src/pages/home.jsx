import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../prueba.css';
import Navbar from '../componentes/home/NavBar';
import Buscador from '../componentes/home/Buscador';
import CarruselProductos from '../componentes/home/CarruselProductos';
import ProductoCard from '../componentes/productocard';
import Footer from '../componentes/home/Footer';
import ModalProducto from '../componentes/modalproductos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mostrarToast } from '../componentes/admin/ToastMensaje'; 
import { toast } from 'react-toastify';

function Home() {
  const estaAutenticado = localStorage.getItem('usuarioAutenticado') === 'true';
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [busquedaCategoria, setBusquedaCategoria] = useState('');
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);


  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  useEffect(() => {
    fetch('https://backend-donde-la-andrea.onrender.com/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioAutenticado');
    window.location.reload();
  };

  const verProducto = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProductoSeleccionado(null);
  };

  const agregarAlCarrito = (producto) => {
    if (!estaAutenticado) {
      mostrarToast('info',
        <div>
          🔐 Debes iniciar sesión para agregar productos al carrito.
          <br />
          <button
            onClick={() => {
              toast.dismiss();
              window.location.href = 'https://juaneljuampi.github.io/frontend-react/#/login';
            }}
            style={{
              marginTop: '8px',
              padding: '6px 12px',
              backgroundColor: '#0d6efd',
              color: '#ffffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Iniciar sesión
          </button>
        </div>,
        { autoClose: false, closeOnClick: false }
      );
      return;
    }

    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevoCarrito = [...carritoActual, producto];
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event('storage'));
    cerrarModal();
  };

  const productosFiltrados = Array.isArray(productos)
    ? productos
        .filter(p => p.activo)
        .filter(p =>
          p.nombre.toLowerCase().includes(busquedaNombre.toLowerCase()) &&
          (busquedaCategoria === '' || p.categoria === busquedaCategoria)
        )
    : [];

  // calculo por pagina 
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const indiceFin = indiceInicio + productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  return (
    <div className="fondo-pagina">
      <div id="header-sticky" style={{
        position: 'sticky',
        top: 0,
        zIndex: 1050,
        backgroundColor: 'plum',
        padding : '10px 0',
        paddingBottom: '0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.69)'
      }}>
        <Navbar />
        <Buscador
          busquedaNombre={busquedaNombre}
          setBusquedaNombre={setBusquedaNombre}
          busquedaCategoria={busquedaCategoria}
          setBusquedaCategoria={setBusquedaCategoria}
        />
      </div>

      <div style={{ marginTop: '5px' }}>
        <CarruselProductos productos={productos} verProducto={verProducto} />
      </div>

      <div className="Productos" style={{ margin: '5px', padding: '60px' }}>
        <div className="row">
          {productosPaginados.length === 0 ? (
            <div className="col-12">
              <p>No hay productos disponibles.</p>
            </div>
          ) : (
            productosPaginados.map(producto => (
              <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <ProductoCard producto={producto} onVer={verProducto} />
              </div>
            ))
          )}
        </div>

        {/*  Paginación visual */}
        {totalPaginas > 1 && (
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPaginas }, (_, i) => (
                <li key={i} className={`page-item ${paginaActual === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setPaginaActual(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <ModalProducto
        producto={productoSeleccionado}
        show={mostrarModal}
        onClose={cerrarModal}
        onAgregar={agregarAlCarrito}
        disabled={!estaAutenticado}
      />
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default Home;
