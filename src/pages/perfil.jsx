import React, { useEffect, useState } from 'react';
import Navbar from '../componentes/home/NavBar';

function Perfil() {
  const [usuario, setUsuario] = useState({
    id: '',
    nombre: '',
    email: '',
    direccion: '',
    comuna: '',
    contraseña: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(true);
  const [compras, setCompras] = useState([]); // 👈 nuevo estado para compras

  const usuarioId = localStorage.getItem('usuarioId');

  useEffect(() => {
    if (!usuarioId || usuarioId === 'undefined') {
      setMensaje('No se encontró sesión activa');
      setCargando(false);
      return;
    }

    // 👇 Cargar datos del usuario (incluyendo contraseña)
    fetch(`https://backend-donde-la-andrea.onrender.com/usuarios/${usuarioId}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener datos');
        return res.json();
      })
      .then(data => {
        setUsuario({
          id: data.id,
          nombre: data.nombre,
          email: data.email,
          direccion: data.direccion,
          comuna: data.comuna,
          contraseña: data.contraseña // 👈 ahora también se carga la contraseña
        });
        setCargando(false);
      })
      .catch(err => {
        console.error(err);
        setMensaje('Error al cargar datos del perfil');
        setCargando(false);
      });

    // 👇 Cargar compras del usuario
    fetch(`https://backend-donde-la-andrea.onrender.com/api/compras/${usuarioId}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener compras');
        return res.json();
      })
      .then(data => setCompras(data))
      .catch(err => console.error('Error al cargar compras:', err));
  }, [usuarioId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!usuario.nombre || !usuario.email || !usuario.direccion || !usuario.comuna) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    fetch(`https://backend-donde-la-andrea.onrender.com/usuarios/${usuario.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    })
      .then(res => {
        if (res.ok) {
          setMensaje('Perfil actualizado correctamente');
        } else {
          setMensaje('Error al actualizar perfil');
        }
      })
      .catch(err => {
        console.error(err);
        setMensaje('Error de conexión con el servidor');
      });
  };

  if (cargando) return <p className="text-center mt-5">Cargando perfil...</p>;

  if (mensaje === 'Perfil actualizado correctamente') {
    setTimeout(() => {
      window.location.href = '#/';
    }, 1500);
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🛠️ Editar Perfil</h2>
      {mensaje && <div className="alert alert-info text-center">{mensaje}</div>}

      <div className="card shadow-sm border rounded p-4">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" name="nombre" value={usuario.nombre} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Correo electrónico</label>
              <input type="email" className="form-control" name="email" value={usuario.email} onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Dirección</label>
              <input type="text" className="form-control" name="direccion" value={usuario.direccion} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Comuna</label>
              <input type="text" className="form-control" name="comuna" value={usuario.comuna} onChange={handleChange} />
            </div>
          </div>

          {/* 👇 Nuevo campo para mostrar la contraseña */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Contraseña</label>
              <input 
                type="password" 
                className="form-control" 
                name="contraseña" 
                value={usuario.contraseña} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="text-end">
            <button type="submit" style={{backgroundColor:'blue',color :'white'}} className="btn btn-primary">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>

      {/* 👇 Historial de compras del usuario */}
      <div className="mt-5">
        <h4 className="text-center mb-3">🧾 Historial de Compras</h4>
        {compras.length === 0 ? (
          <p className="text-center">No se encontraron compras asociadas.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID Compra</th>
                <th>Fecha</th>
                <th>Productos</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((compra) => (
                <tr key={compra.id}>
                  <td>{compra.id}</td>
                  <td>{new Date(compra.fechaHora).toLocaleString('es-CL')}</td>
                  <td>
                    {compra.productos?.map((p, i) => (
                      <div key={i}>{p.nombre}</div>
                    ))}
                  </td>
                  <td>
                    {compra.productos?.map((p, i) => (
                      <div key={i}>{p.cantidad}</div>
                    ))}
                  </td>
                  <td>${compra.total?.toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Navbar />
    </div>
  );
}

export default Perfil;
