import { useState, useEffect } from 'react';
import UsuarioTabla from '../componentes/usuarios/usuariotabla';
import UsuarioForm from '../componentes/usuarios/usuarioform';
import UsuarioNavbar from '../componentes/usuarios/usuarionavbar';

function Usuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

 
  useEffect(() => {
    cargarUsuarios();
  }, []);

const cargarUsuarios = () => {
  fetch('https://backend-donde-la-andrea.onrender.com/usuarios')
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error("La respuesta no es un array");
      }
      setUsuarios(data);
    })
    .catch(err => {
      console.error('Error al cargar usuarios:', err);
      setUsuarios([]); // evita que el .map falle
    });
};

  const handleEditar = (usuario) => setUsuarioEditando(usuario);

  const handleEliminar = async (id) => {
    await fetch(`https://backend-donde-la-andrea.onrender.com/usuarios/${id}`, { method: 'DELETE' });
    cargarUsuarios(); //  actualiza la lista después de eliminar
  };

  const handleBloquear = async (id) => {
    await fetch(`https://backend-donde-la-andrea.onrender.com/usuarios/${id}/bloquear`, { method: 'PUT' });
    cargarUsuarios(); //  actualiza la lista
  };

  const handleDesbloquear = async (id) => {
    await fetch(`https://backend-donde-la-andrea.onrender.com/usuarios/${id}/desbloquear`, { method: 'PUT' });
    cargarUsuarios(); //  actualiza la lista
  };

  
  const handleActualizar = () => {
    cargarUsuarios(); 
    setUsuarioEditando(null); 
  };

  return (
    <div className="container mt-4">
        <UsuarioNavbar />
      <h2>Gestión de Usuarios</h2>

      <UsuarioTabla
        usuarios={usuarios}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        onBloquear={handleBloquear}
        onDesbloquear={handleDesbloquear}
      />

      {usuarioEditando && (
        <UsuarioForm
          usuario={usuarioEditando}
          onClose={() => setUsuarioEditando(null)}
          onActualizar={handleActualizar} 
        />
      )}
    </div>
  );
}

export default Usuario;
