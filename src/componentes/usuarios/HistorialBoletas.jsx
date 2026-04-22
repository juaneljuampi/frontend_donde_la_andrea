function HistorialBoletas() {
  const [boletas, setBoletas] = useState([]);
  useEffect(() => {
    const usuarioId = localStorage.getItem('usuarioId');
    fetch(`https://backend.../api/boletas/${usuarioId}`)
      .then(res => res.json())
      .then(setBoletas)
      .catch(err => console.error("Error al cargar boletas:", err));
  }, []);

  return (
    <div className="container">
      <h3>Historial de boletas</h3>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Neto</th>
            <th>IVA</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {boletas.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{new Date(b.fechaHora).toLocaleString('es-CL')}</td>
              <td>${b.neto.toLocaleString('es-CL')}</td>
              <td>${b.iva.toLocaleString('es-CL')}</td>
              <td>${b.total.toLocaleString('es-CL')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default HistorialBoletas;