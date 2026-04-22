import { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ email: '', contraseña: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    const campos = Object.values(form);
    if (campos.some(c => c.trim() === '')) {
      setMensaje("Todos los campos son obligatorios");
      return false;
    }

    const dominiosPermitidos = ["@duocuc.cl", "@duocprofesor.cl", "@gmail.com"];
    const esDominioValido = dominiosPermitidos.some(d => form.email.endsWith(d));
    if (!esDominioValido) {
      setMensaje("Correo no permitido");
      return false;
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/;
    if (!regex.test(form.contraseña)) {
      setMensaje("Contraseña inválida: mínimo 12 caracteres, una mayúscula, una minúscula, un número y un símbolo");
      return false;
    }

    return true;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    await onLogin(form); 
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          className="form-control mb-2"
          value={form.contraseña}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-success" style={{ backgroundColor: '#0d00fdff', borderRadius: '20px', fontWeight: 'bold' }}>Iniciar sesión</button>
      </form>

      {mensaje && <div className="alert alert-danger mt-2">{mensaje}</div>}

      <div className="mt-3 text-center">
        <span>¿No tienes cuenta? </span>
        <Link to="/registro">Regístrate aquí</Link>
      </div>
    </>
  );
}

export default LoginForm;
