import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CarritoLista from '../componentes/carrito/carritolista';
import CarritoResumen from '../componentes/carrito/carritoresumen';
import CarritoModal from '../componentes/carrito/carritomodal';
import CarritoFooter from '../componentes/carrito/carritofooter';
import RegistroNavbar from '../componentes/registro/registronavbar';

function Carrito() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const guardado = localStorage.getItem('carrito');
    if (guardado) {
      const lista = JSON.parse(guardado);
      setProductos(lista);
      const totalTemp = lista.reduce((acc, p) => acc + p.precioUnitario, 0);
      setTotal(totalTemp);
    }
  }, []);

  const incrementarCantidad = (id) => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      const actualizado = [...productos, producto];
      setProductos(actualizado);
      localStorage.setItem('carrito', JSON.stringify(actualizado));
      recalcularTotal(actualizado);
      window.location.reload();
    }
  };

  const decrementarCantidad = (id, eliminarTodo = false) => {
    let actualizado;
    if (eliminarTodo) {
      actualizado = productos.filter(p => p.id !== id);
    } else {
      const index = productos.findIndex(p => p.id === id);
      if (index !== -1) {
        actualizado = [...productos];
        actualizado.splice(index, 1);
      } else {
        return;
      }
    }
    setProductos(actualizado);
    localStorage.setItem('carrito', JSON.stringify(actualizado));
    recalcularTotal(actualizado);
    window.location.reload();
  };

  const recalcularTotal = (lista) => {
    const nuevoTotal = lista.reduce((acc, p) => acc + p.precioUnitario, 0);
    setTotal(nuevoTotal);
  };

const pagar = async () => {
  try {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const usuarioId = localStorage.getItem('usuarioId');

    if (!usuarioId) {
      alert("Debes iniciar sesión para realizar la compra.");
      navigate('/login');
      return;
    }

    // 🔁 Agrupar productos por id y sumar cantidades
    const productosAgrupados = carrito.reduce((acc, prod) => {
      const existente = acc.find(p => p.productoId === prod.id);
      if (existente) {
        existente.cantidad += 1;
      } else {
        acc.push({
          productoId: prod.id,
          nombre: prod.nombre,
          cantidad: 1,
          precio: prod.precioUnitario
        });
      }
      return acc;
    }, []);

    // ✅ Ahora sí puedes usar productosAgrupados
    const productosConSubtotal = productosAgrupados.map(p => ({
      ...p,
      subtotal: p.precio * p.cantidad
    }));

    const totalCompra = productosConSubtotal.reduce((acc, p) => acc + p.subtotal, 0);

    // Descontar stock
    const resStock = await fetch('https://backend-donde-la-andrea.onrender.com/descontar-stock', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productosConSubtotal.map(p => ({
        id: p.productoId,
        cantidad: p.cantidad
      })))
    });

    if (!resStock.ok) {
      const errorText = await resStock.text();
      throw new Error("Error al descontar stock: " + errorText);
    }

    // Guardar compra
    const compra = {
      usuario: { id: parseInt(usuarioId) },
      productos: productosConSubtotal,
      total: totalCompra
    };

    const resCompra = await fetch(`https://backend-donde-la-andrea.onrender.com/api/compras/guardar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(compra)
    });

    if (!resCompra.ok) {
      const errorText = await resCompra.text();
      throw new Error("Error al guardar compra: " + errorText);
    }

    alert("¡Gracias por tu compra!");
    localStorage.removeItem('carrito');
    setProductos([]);
    setTotal(0);
    navigate('/');
  } catch (error) {
    console.error("Error al pagar:", error);
    alert("Ocurrió un error al procesar la compra: " + error.message);
  }
};


  return (
    <div className="table-responsive">
      setMostrarModalBoleta(true);
      setBoleta(boleta);

      <RegistroNavbar />
      <CarritoLista
        productos={productos}
        onIncrementar={incrementarCantidad}
        onDecrementar={decrementarCantidad}
      />
      <CarritoResumen total={total} onMostrarModal={() => setMostrarModal(true)} />
      {mostrarModal && (
        <CarritoModal
          productos={productos}
          total={total}
          onClose={() => setMostrarModal(false)}
          onPagar={pagar}
        />
      )}
      <CarritoFooter />
    </div>
  );
}

export default Carrito;
