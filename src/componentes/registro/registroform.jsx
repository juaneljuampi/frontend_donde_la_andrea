import { useState } from 'react';

function validarContraseña(contraseña) {
  const errores = [];

  if (contraseña.length < 12) errores.push("❌ Mínimo 12 caracteres");
  if (!/[A-Z]/.test(contraseña)) errores.push("❌ Falta una mayúscula (A–Z)");
  if (!/[a-z]/.test(contraseña)) errores.push("❌ Falta una minúscula (a–z)");
  if (!/[0-9]/.test(contraseña)) errores.push("❌ Falta un número (0–9)");
  if (!/[!@#$%^&*(),.?":{}|<>_\-\/\\]/.test(contraseña)) errores.push("❌ Falta un símbolo (!@#$%...)");

  return errores;
}

function RegistroForm({ onRegistro }) {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    comuna: '',
    direccion: ''
  });

  const [verContraseña, setVerContraseña] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const errores = validarContraseña(form.contraseña);

  if (errores.length > 0) {
    alert("⚠️ La contraseña no cumple con los siguientes requisitos:\n\n" + errores.join("\n"));
    return;
  }

  onRegistro(form);
};



  return (
    <form onSubmit={handleSubmit} className="formulario-registro">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        className="form-control mb-2"
        value={form.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="form-control mb-2"
        value={form.email}
        onChange={handleChange}
        required
      />

      <div className="input-group mb-2">
        <input
          type={verContraseña ? "text" : "password"}
          name="contraseña"
          placeholder="Contraseña"
          className="form-control"
          value={form.contraseña}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setVerContraseña(!verContraseña)}
          tabIndex={-1}
        >
          {verContraseña ? "🙈" : "👁️"}
        </button>
      </div>

      <input
        type="text"
        name="comuna"
        placeholder="Comuna"
        className="form-control mb-2"
        value={form.comuna}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        className="form-control mb-2"
        value={form.direccion}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn btn-success">Registrarse</button>
    </form>
  );
}

export default RegistroForm;
