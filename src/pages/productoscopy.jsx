import React, { useState, useEffect } from 'react';
import ProductoCard2 from '../componentes/productocardcopy';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../prueba.css';
import ModalProducto2 from '../componentes/modalproductoscopy';
import { Modal, Button } from 'react-bootstrap';

function Productos2({carrito, setCarrito}) {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const verProducto = (producto) => {

  setProductoSeleccionado(producto);
  setMostrarModal(true);
};
const cerrarModal = () => {
  setMostrarModal(false);
  setProductoSeleccionado(null);
};
const agregarAlCarrito = (producto) => {
  
  const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
  const nuevoCarrito = [...carritoActual, producto];
  localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  cerrarModal();
};

  useEffect(() => {
    fetch('https://backend-donde-la-andrea.onrender.com/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#5a4a91' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Logo</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="/admin">Panel de administración</a></li>
              
              <li className="nav-item">
                <a
                  className="btn btn-primary ms-2"
                  href="/login"
                  role="button"
                  style={{ backgroundColor: '#007bff', borderColor: '#007bff', color: '#fff' }}
                >
                  Cerrar Sesión
                </a>
                </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <h1>Productos</h1>
        {productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          productos.map(producto => (
             <ProductoCard2
              key={producto.id}
              producto={producto}
              onVer={verProducto}
              />
          ))
        )}
         <ModalProducto2
        producto={productoSeleccionado}
        show={mostrarModal}
        onClose={cerrarModal}
        onAgregar={agregarAlCarrito}
      />
      </div>
    </div>
  );
}

export default Productos2;
