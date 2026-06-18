import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function RecuperarPassword() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const recuperarPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `https://backend-donde-la-andrea.onrender.com/usuarios/recuperar?email=${email}`,
        {
          method: "POST",
        }
      );

      const token = await response.text();

      if (!response.ok) {
        throw new Error(token);
      }

      const resetLink =
        `https://juaneljuampi.github.io/frontend_donde_la_andrea/#/reset-password?token=${token}`;

      await emailjs.send(
        "service_pqbc1uq",
        "template_7lfo244",
        {
          email: email,
          reset_link: resetLink,
          name: "Cliente",
        },
        "a5mkoAXJ5rvokq7db"
      );

      setMensaje(
        "Correo enviado correctamente. Revisa tu bandeja de entrada."
      );
    } catch (error) {
      setMensaje("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">
          Recuperar Contraseña
        </h2>

        <form onSubmit={recuperarPassword}>
          <div className="mb-3">
            <label className="form-label">
              Correo Electrónico
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="correo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: '#0d6efd', color: '#ffffff', border: 'none' }}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Recuperar Contraseña'}
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