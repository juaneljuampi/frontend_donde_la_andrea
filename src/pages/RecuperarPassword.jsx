import { useState } from "react";

function RecuperarPassword() {

  const [email, setEmail] = useState("");

  const enviar = async () => {

    await fetch(
      "http://localhost:8080/usuarios-rest/recuperar",
      {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({ email })
      }
    );

    alert("Se envió la solicitud");
  };

  return (
    <div>
      <h2>Recuperar contraseña</h2>

      <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <button onClick={enviar}>
        Recuperar
      </button>
    </div>
  );
}

export default RecuperarPassword;