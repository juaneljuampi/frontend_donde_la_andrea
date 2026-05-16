import React, { useEffect, useState } from 'react';
import AdminNavbar from '../componentes/admin/AdminNavbar';
import ProductoForm from '../componentes/admin/ProductoForm';
import ProductoTabla from '../componentes/admin/ProductoTabla';
import ProductoBuscador from '../componentes/admin/ProductoBuscador';
import ProductoResultado from '../componentes/admin/ProductoResultado';
import { mostrarToast } from '../componentes/admin/ToastMensaje';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    precioUnitario: '',
    cantidad: '',
    imagenFile: ''
  });
  const [imagenFile, setImagenFile] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [busquedaId, setBusquedaId] = useState('');
  const [productoBuscado, setProductoBuscado] = useState(null);

  useEffect(() => {
    if (!busquedaId) return;

    fetch(`https://backend-donde-la-andrea.onrender.com/api/productos/${busquedaId}`)
      .then(res => {
        if (!res.ok) throw new Error('Producto no encontrado');
        return res.json();
      })
      .then(data => setProductoBuscado(data))
      .catch(() => setProductoBuscado(null));
  }, [busquedaId]);

  useEffect(() => {
    cargarProductos();
  }, []);

  

  const cargarProductos = () => {
    fetch('https://backend-donde-la-andrea.onrender.com/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => {
        console.error('Error al cargar productos:', err);
        mostrarToast('error', '❌ Error al cargar productos.');
      });
  };

  const eliminarProducto = (id) => {
    fetch(`https://backend-donde-la-andrea.onrender.com/eliminar/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        cargarProductos();
        mostrarToast('success', '🗑️ Producto eliminado correctamente.');
      })
      .catch(err => {
        console.error('Error al eliminar producto:', err);
        mostrarToast('error', '❌ Error al eliminar el producto.');
      });
  };

  const toggleActivo = (id, estadoActual) => {
    fetch(`https://backend-donde-la-andrea.onrender.com/api/productos/estado/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activo: !estadoActual })
    })
      .then(() => {
        cargarProductos();
        mostrarToast('success', `🔄 Producto ${!estadoActual ? 'activado' : 'desactivado'} correctamente.`);
      })
      .catch(err => {
        console.error('Error al cambiar estado del producto:', err);
        mostrarToast('error', '❌ Error al cambiar el estado del producto.');
      });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const onImagenSeleccionada = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setImagenFile(archivo);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("nombre", formData.nombre);
    formDataToSend.append("descripcion", formData.descripcion);
    formDataToSend.append("categoria", formData.categoria);
    formDataToSend.append("precioUnitario", formData.precioUnitario);
    formDataToSend.append("cantidad", formData.cantidad);
    if (imagenFile) {
      formDataToSend.append("imagen", imagenFile);
    }

const url = editandoId
  ? `https://backend-donde-la-andrea.onrender.com/api/productos/modificar/${editandoId}`
  : 'https://backend-donde-la-andrea.onrender.com/api/productos/agregar';

const method = editandoId ? 'PUT' : 'POST';

fetch(url, {
  method,
  body: formDataToSend
})
  .then(async res => {
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Error al guardar producto');
    }
    return res.text();
  })
  .then(msg => {
    cargarProductos();

    if (editandoId && productoBuscado && editandoId === productoBuscado.id) {
      fetch(`https://backend-donde-la-andrea.onrender.com/api/productos/${editandoId}`)
        .then(res => res.json())
        .then(data => setProductoBuscado(data))
        .catch(() => setProductoBuscado(null));
    }

    if (editandoId) {
      window.alert('✅ Producto actualizado correctamente. 📷 ' + (imagenFile ? 'Imagen actualizada en el servidor.' : 'La imagen no fue modificada.'));
    } else {
      window.alert('✅ Producto creado correctamente. 📷 Imagen guardada en el servidor.');
    }

    setFormData({ nombre: '', descripcion: '', categoria: '', precioUnitario: '', cantidad: '', imagenFile: '' });
    setImagenFile(null);
    setEditandoId(null);
  })
  .catch(err => {
    console.error('Error al guardar producto:', err);
    mostrarToast('error', '❌ Error al guardar el producto: ' + err.message);
  });
  };
  const handleEditar = (producto) => {
    setEditandoId(producto.id);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      precioUnitario: producto.precioUnitario,
      cantidad: producto.cantidad
    });
    setImagenFile(null);
  };

  const handleCancelarEdicion = () => {
    setEditandoId(null);
    setFormData({ nombre: '', descripcion: '', categoria: '', precioUnitario: '', cantidad: '' });
    setImagenFile(null);
  };

  const handleBusquedaIdChange = (e) => {
    setBusquedaId(e.target.value);
  };

  const handleToggleActivo = async (id, estadoActual) => {
    try {
      const nuevoEstado = !estadoActual;

      await fetch(`https://backend-donde-la-andrea.onrender.com/api/productos/estado/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activo: nuevoEstado })
      });

      setProductoBuscado(prev => ({ ...prev, activo: nuevoEstado }));
      mostrarToast('success', `🔄 Producto ${nuevoEstado ? 'activado' : 'desactivado'} correctamente.`);
    } catch (error) {
      console.error('Error al cambiar estado del producto:', error);
      mostrarToast('error', '❌ Error al cambiar el estado del producto.');
    }
  };

  const handleBuscarPorId = (e) => {
    e.preventDefault();
    if (!busquedaId) return;
    fetch(`https://backend-donde-la-andrea.onrender.com/api/productos/${busquedaId}`)
      .then(res => {
        if (!res.ok) throw new Error('Producto no encontrado');
        return res.json();
      })
      .then(data => setProductoBuscado(data))
      .catch(() => setProductoBuscado(null));
  };

  return (
    <div className="container-fluid px-3 px-md-4">
      <AdminNavbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="mb-4">🛠️ Panel de Administración</h1>

      <ProductoBuscador
        busquedaId={busquedaId}
        onChange={handleBusquedaIdChange}
        onBuscar={handleBuscarPorId}
      />

      {busquedaId && (
        <ProductoResultado
          producto={productoBuscado}
          onEditar={handleEditar}
          onEliminar={eliminarProducto}
          onToggleActivo={handleToggleActivo}
        />
      )}

      <ProductoForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editandoId={editandoId}
        onCancel={handleCancelarEdicion}
        onImagenSeleccionada={onImagenSeleccionada}
      />

      <ProductoTabla
        productos={productos}
        
        onEditar={handleEditar}
        onEliminar={eliminarProducto}
        onToggleActivo={toggleActivo}
      />
    </div>
  );
}

export default AdminPanel;
