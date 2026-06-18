import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {

  const navigate = useNavigate();

  // Obtiene el token desde la URL:
  // #/reset-password?token=xxxx
  const token = window.location.hash.split("token=")[1];

  const [passwordNueva, setPasswordNueva] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [faltanRequisitos, setFaltanRequisitos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [segundos, setSegundos] = useState(0);
  const intervaloRef = useRef(null);

  const evaluarPassword = (password) => {
    const faltan = [];

    if (password.length < 8) faltan.push("mínimo 8 caracteres");
    if (!/[A-Z]/.test(password)) faltan.push("una mayúscula");
    if (!/[a-z]/.test(password)) faltan.push("una minúscula");
    if (!/[0-9]/.test(password)) faltan.push("un número");
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) faltan.push("un carácter especial");

    setFaltanRequisitos(faltan);
    return faltan;
  };

  useEffect(() => {
    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, []);

  const cambiarPassword = async (e) => {
    e.preventDefault();

    if (passwordNueva !== confirmarPassword) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }

    const faltan = evaluarPassword(passwordNueva);
    if (faltan.length > 0) {
      setMensaje(`La contraseña debe tener: ${faltan.join(", ")}`);
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

      // Iniciar contador de 8 segundos antes de redirigir
      setSegundos(8);
      setMensaje("✅ Contraseña actualizada correctamente. Redirigiendo al login...");

      intervaloRef.current = setInterval(() => {
        setSegundos((s) => {
          if (s <= 1) {
            clearInterval(intervaloRef.current);
            navigate("/login");
            return 0;
          }
          return s - 1;
        });
      }, 1000);

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
              onChange={(e) => {
                const valor = e.target.value;
                setPasswordNueva(valor);
                evaluarPassword(valor);
              }}
              required
            />
            {faltanRequisitos.length > 0 && (
              <div className="form-text text-danger mt-1">
                Faltan: {faltanRequisitos.join(", ")}
              </div>
            )}
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
            style={{ backgroundColor: "#198754", borderColor: "#198754", color: "#fff" }}
          >
            {loading
              ? "Actualizando..."
              : "Cambiar Contraseña"}
          </button>

        </form>

        {mensaje && (
          <div className="alert alert-info mt-3">
            {mensaje}
            {segundos > 0 && (
              <div className="mt-1">
                Redirigiendo en {segundos} segundo{segundos !== 1 ? "s" : ""}...
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}