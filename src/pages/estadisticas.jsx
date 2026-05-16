import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import AdminNavbar from '../componentes/estadisticas/AdminNavbar';

ChartJS.register(ArcElement, Tooltip, Legend);

const Estadisticas = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [compras, setCompras] = useState([]);
  const [boletas, setBoletas] = useState([]); // 👈 nuevo estado
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://backend-donde-la-andrea.onrender.com/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data));

    fetch('https://backend-donde-la-andrea.onrender.com/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data));


    // 👇 nuevo: cargar boletas
    fetch('https://backend-donde-la-andrea.onrender.com/api/boletas')
      .then(res => res.json())
      .then(data => setBoletas(data));
  }, []);

  // Filtrar compras por correo, id o nombre
  const comprasFiltradas = compras.filter(compra =>
    compra.usuarioCorreo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    compra.usuarioId?.toString().includes(searchTerm) ||
    compra.usuarioNombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrar boletas por usuario o ID
  const boletasFiltradas = boletas.filter(boleta =>
    boleta.usuario?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    boleta.usuario?.correo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    boleta.id?.toString().includes(searchTerm)
  );

  const data = {
    labels: ['Usuarios', 'Productos'],
    datasets: [
      {
        data: [usuarios.length, productos.length],
        backgroundColor: ['#36A2EB', '#FF6384'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <AdminNavbar />
      <div style={{ padding: '2rem' }}>
        <h2 style={{ textAlign: 'center' }}>Registros</h2>

        {/* Campo de búsqueda */}
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <input
            type="text"
            placeholder="Buscar compras/boletas por correo, ID o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem', width: '50%' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
          {/* Tabla de productos */}
          <div style={{ flex: 1 }}>
            <h3>Productos</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
 {productos.slice(0, 12).map((producto) => (
  <tr key={producto.id}>
    <td>{producto.id}</td>
    <td>{producto.nombre}</td>
  </tr>
))}

              </tbody>
            </table>
          </div>

          {/* Gráfico */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <Pie data={data} />
          </div>

          {/* Tabla de usuarios */}
          <div style={{ flex: 1 }}>
            <h3>Usuarios</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>



        {/* 👇 Nueva tabla de boletas */}
        <div style={{ marginTop: '2rem' }}>
          <h3>Boletas generadas</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>ID Boleta</th>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Neto</th>
                <th>IVA</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {boletasFiltradas.map((boleta) => (
                <tr key={boleta.id}>
                  <td>{boleta.id}</td>
                  <td>{boleta.usuario?.nombre}</td>
                  <td>{new Date(boleta.fechaHora).toLocaleString('es-CL')}</td>
                  <td>${boleta.neto?.toLocaleString('es-CL')}</td>
                  <td>${boleta.iva?.toLocaleString('es-CL')}</td>
                  <td>${boleta.total?.toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Estadisticas;
