import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistroTitulo from '../componentes/registro/registrotitulo';
import RegistroForm from '../componentes/registro/registroform';
import RegistroMensaje from '../componentes/registro/registromensaje';
import RegistroNavbar from '../componentes/registro/registronavbar';


function Registro() {
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); 

  const registrarUsuario = async (form) => {
    try {
      const res = await fetch('https://backend-donde-la-andrea.onrender.com/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const texto = await res.text();
      setMensaje(texto);

      
      if (texto === "Usuario registrado correctamente") {
        navigate('/login');
      }
    } catch (error) {
      setMensaje("Error al registrar usuario");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <RegistroNavbar />
      <RegistroTitulo />
      <RegistroForm onRegistro={registrarUsuario} />
      <RegistroMensaje mensaje={mensaje} />
    </div>
  );
}

export default Registro;
