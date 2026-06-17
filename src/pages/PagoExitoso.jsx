import React from "react";
import { useNavigate } from "react-router-dom";

export default function PagoExitoso() {
  const navigate = useNavigate();

  const fecha = new Date().toLocaleString("es-CL");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "500px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          padding: "30px"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "green" }}>✅ Pago Exitoso</h1>
          <p>Tu compra ha sido procesada correctamente.</p>
        </div>

        <hr />

        <h3>Boleta Electrónica</h3>

        <p>
          <strong>Fecha:</strong> {fecha}
        </p>

        <p>
          <strong>Estado:</strong> Aprobado
        </p>

        <p>
          <strong>Método de Pago:</strong> Webpay Plus
        </p>

        <p>
          <strong>Comercio:</strong> Donde la Andrea
        </p>

        <hr />

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}