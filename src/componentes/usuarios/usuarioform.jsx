import { useState, useEffect } from 'react';

function UsuarioForm({ usuario, onClose, onActualizar }) {
  const [form, setForm] = useState({
    id: '',
    nombre: '',
    email: '',
   contraseña: '',
   comuna:''
  });

  // aqui cargamos los ddatos de los usuarios en el formulario
  useEffect(() => {
    if (usuario) {
      setForm(usuario);
    }
  }, [usuario]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://backend-donde-la-andrea.onrender.com/usuarios/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        if (onActualizar) onActualizar(); 
        onClose(); 
      } else {
        console.error("Error al actualizar usuario:", await res.text());
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <h4>Editar Usuario</h4>
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Nombre"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Correo electrónico"
        required
      />
      <input
        type="password"
        name="contraseña"
        value={form.contraseña}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Nueva contraseña"
        required
      />

      <div className="d-flex gap-2">
        <button type="submit"style={{background:'green'}} className="btn btn-success">
          Guardar
        </button>
        <button type="button" className="btn btn-secondary"style={{background:'red'}} onClick={onClose}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default UsuarioForm;
