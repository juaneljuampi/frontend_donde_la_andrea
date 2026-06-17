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

    const total = productos.reduce(
      (acc, p) => acc + p.precioUnitario,
      0
    );

    const response = await fetch(
      `https://backend-donde-la-andrea.onrender.com/api/pagos/crear?monto=${total}`,
      {
        method: "POST"
      }
    );

    const data = await response.json();

    console.log(data);

    // Crear formulario para enviar token a Transbank
    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.url;

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "token_ws";
    input.value = data.token;

    form.appendChild(input);
    document.body.appendChild(form);

    form.submit();

  } catch (error) {
    console.error(error);
    alert("Error al iniciar pago");
  }
};

  return (
    <div className="table-responsive">

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
