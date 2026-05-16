import React, { useState, useEffect } from 'react';
import ProductoCard from '../componentes/productocard';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../prueba.css';
import Navbar from '../componentes/NavBar';
import ModalProducto from '../componentes/modalproductos';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../componentes/home/Footer';
import { mostrarToast } from '../componentes/admin/ToastMensaje';
import Buscador from '../componentes/home/Buscador'; 
import { toast } from 'react-toastify';
function Productos({ carrito, setCarrito }) {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [busquedaNombre, setBusquedaNombre] = useState('');
  const [busquedaCategoria, setBusquedaCategoria] = useState('');
  const estaAutenticado = localStorage.getItem('usuarioAutenticado') === 'true'; // ✅ faltaba definir

  useEffect(() => {
    fetch('https://backend-donde-la-andrea.onrender.com/api/productos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          console.error('Respuesta inesperada del backend:', data);
          setProductos([]);
        }
      })
      .catch(err => {
        console.error('Error al cargar productos:', err);
        setProductos([]);
      });
  }, []);

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
              window.location.href = 'https://backend-donde-la-andrea.onrender.com/#/login';
            }}
            style={{
              marginTop: '8px',
              padding: '6px 12px',
              backgroundColor: '#0d6efd',
              color: '#fff',
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

  return (
    <div className="fondo-pagina">
      <div
        id="header-sticky"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1050,
          backgroundColor: 'plum',
          paddingBottom: '5px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        <Navbar />
        <Buscador
          busquedaNombre={busquedaNombre}
          setBusquedaNombre={setBusquedaNombre}
          busquedaCategoria={busquedaCategoria}
          setBusquedaCategoria={setBusquedaCategoria}
        />
      </div>

      <div className="container mt-4">
        <div className="row">
          {productosFiltrados.length === 0 ? (
            <div className="col-12">
              <p>No hay productos disponibles.</p>
            </div>
          ) : (
            productosFiltrados.map(producto => (
              <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <ProductoCard
                  producto={producto}
                  onVer={verProducto}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <ModalProducto
        producto={productoSeleccionado}
        show={mostrarModal}
        onClose={cerrarModal}
        onAgregar={agregarAlCarrito}
        disabled={!estaAutenticado}
      />
      <ToastContainer position="bottom-right" autoClose={2000} />
      <Footer />
    </div>
  );
}

export default Productos;
