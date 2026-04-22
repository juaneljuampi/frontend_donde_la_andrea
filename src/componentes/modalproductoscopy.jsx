import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../prueba.css';

function ModalProducto2({ producto, show, onClose, onAgregar }) {
  if (!producto) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{producto.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={`https://backend-production-cbae.up.railway.app${producto.imagen}`}
          alt={producto.nombre}
          className="card-img-top img-thumbnail"
          style={{ height: '180px', objectFit: 'cover' }}
          onError={(e) => { e.target.src = '/img/default.jpg'; }}
        />

        <p>{producto.descripcion}</p>
        <p><strong>Precio:</strong> ${producto.precioUnitario.toLocaleString('es-CL')}</p>
        <p><strong>Disponible:</strong> {producto.cantidad} unidades</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary"style={{background:'red'}} onClick={onClose}>Cerrar</Button>
        <Button variant="success" style={{background:'blue'}} onClick={() => onAgregar(producto)}>Agregar al carrito</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalProducto2;