import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {

  const navigate = useNavigate();

  // Obtiene el token desde la URL:
  // #/reset-password?token=xxxx
  const token = window.location.hash.split("token=")[1];

  const [passwordNueva, setPasswordNueva] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const cambiarPassword = async (e) => {
    e.preventDefault();

    if (passwordNueva !== confirmarPassword) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://backend-donde-la-andrea.onrender.com/usuarios/reset-password?token=${token}&passwordNueva=${encodeURIComponent(passwordNueva)}`,
        {
          method: "POST",
        }
      );

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data);
      }

      setMensaje("✅ Contraseña actualizada correctamente. Redirigiendo al login...");

      setTimeout(() => {
        navigate("/login");
      }, 3000);

    } catch (error) {
      setMensaje(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">

      <div
        className="card p-4 mx-auto shadow"
        style={{ maxWidth: "500px" }}
      >

        <h2 className="text-center mb-4">
          Nueva Contraseña
        </h2>

        <form onSubmit={cambiarPassword}>

          <div className="mb-3">
            <label className="form-label">
              Nueva Contraseña
            </label>

            <input
              type="password"
              className="form-control"
              value={passwordNueva}
              onChange={(e) =>
                setPasswordNueva(e.target.value)
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Confirmar Contraseña
            </label>

            <input
              type="password"
              className="form-control"
              value={confirmarPassword}
              onChange={(e) =>
                setConfirmarPassword(e.target.value)
              }
              required
            />
          </div>

          <button
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading
              ? "Actualizando..."
              : "Cambiar Contraseña"}
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