import React, { useEffect, useState } from 'react';

const TablaBoletas = () => {
  const [boletas, setBoletas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://backend-production-fcfc3.up.railway.app/api/boletas')
      .then(res => res.json())
      .then(data => setBoletas(data));
  }, []);

  const boletasFiltradas = boletas.filter(boleta =>
    boleta.usuario?.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    boleta.id?.toString().includes(searchTerm)
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>Boletas Generadas</h2>

      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Buscar por usuario o ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', width: '50%' }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID Compra</th>
            <th>ID Boleta</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Usuario</th>
            <th>Fecha Compra</th>
            <th>Neto</th>
            <th>IVA</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {boletasFiltradas.map((boleta) => (
            <React.Fragment key={boleta.id}>
              <tr>
                <td>{boleta.compra?.id || '-'}</td>
                <td>{boleta.id}</td>
                <td>{boleta.detalles?.[0]?.nombre || '-'}</td>
                <td>${boleta.detalles?.[0]?.precio?.toLocaleString('es-CL') || '-'}</td>
                <td>{boleta.usuario?.nombre}</td>
                <td>{new Date(boleta.fechaHora).toLocaleString('es-CL')}</td>
                <td>${boleta.neto?.toLocaleString('es-CL')}</td>
                <td>${boleta.iva?.toLocaleString('es-CL')}</td>
                <td>${boleta.total?.toLocaleString('es-CL')}</td>
              </tr>

            
              
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaBoletas;
