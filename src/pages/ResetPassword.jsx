import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cambiarPassword = async (e) => {
    e.preventDefault();

    // Validar contraseña
    const falta = [];
    if (passwordNueva.length < 12) falta.push('mínimo 12 caracteres');
    if (!/[a-z]/.test(passwordNueva)) falta.push('una letra minúscula');
    if (!/[A-Z]/.test(passwordNueva)) falta.push('una letra mayúscula');
    if (!/\d/.test(passwordNueva)) falta.push('un número');
    if (!/[@$!%*?&]/.test(passwordNueva)) falta.push('un símbolo (@$!%*?&)');

    if (falta.length > 0) {
      setMensaje('Contraseña inválida: falta ' + falta.join(', '));
      return;
    }

    try {
      const response = await fetch(
        `https://backend-donde-la-andrea.onrender.com/usuarios/reset-password?token=${token}&passwordNueva=${passwordNueva}`,
        {
          method: "POST",
        }
      );

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data);
      }

      setMensaje(data);

      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {
      setMensaje(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">
          Nueva Contraseña
        </h2>

        <form onSubmit={cambiarPassword}>
          <div className="mb-3">
            <label className="form-label">
              Token
            </label>

            <input
              type="text"
              className="form-control"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Nueva Contraseña
            </label>

            <input
              type="password"
              className="form-control"
              value={passwordNueva}
              onChange={(e) => setPasswordNueva(e.target.value)}
              required
            />
          </div>

          <button
            className="btn w-100 text-white"
            style={{ backgroundColor: "#198754", borderColor: "#198754" }}
          >
            Cambiar Contraseña
          </button>
        </form>

        {mensaje && (
          <div className="alert alert-info mt-3">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}