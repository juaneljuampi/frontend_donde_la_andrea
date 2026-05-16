import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../prueba.css';
import { mostrarToast } from './admin/ToastMensaje';

function ModalProducto({ producto, show, onClose, onAgregar , disabled}) {
  if (!producto) return null;
  const estaAutenticado = localStorage.getItem('usuarioAutenticado') === 'true';

  const handleAgregar = () => {
    if (!estaAutenticado) {
      mostrarToast('info',
        <div>
          🔐 Debes iniciar sesión para agregar productos al carrito.
          <br />
          <button
            onClick={() => {
              toast.dismiss();
              window.location.href = '/login';
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
        { autoClose: 5000, closeOnClick: true }
      );
      return;
    }

    onAgregar(producto);
    toast.success('Producto agregado al carrito');
    onClose(); // cerrar el modal inmediatamente
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{producto.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={`https://backend-donde-la-andrea.onrender.com/${producto.imagen}`}
          alt={producto.nombre}
          className="card-img-top img-thumbnail"
          style={{ height: '180px', objectFit: 'cover' }}
          onError={(e) => { e.target.src = '/img/default.jpg'; }}
        />
        <p>{producto.descripcion}</p>
        <p><strong>Precio:</strong> ${producto.precioUnitario.toLocaleString('es-CL')}</p>
        <p><strong>Disponible:</strong> {producto.cantidad} unidades</p>
        {producto.cantidad < 5 && (
          <div className="alert alert-danger mt-2 p-2">
            ⚠️ Stock crítico: quedan  <strong>{producto.cantidad}</strong> unidades
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" style={{ background: 'red' }} onClick={onClose}>Cerrar</Button>
        <Button
          variant="success"
          style={{ backgroundColor: '#0d00fdff', color: '#ffffff', borderRadius: '10px' }}
          onClick={handleAgregar}
          disabled={producto.cantidad === 0}
          >
          {producto.cantidad === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalProducto;
