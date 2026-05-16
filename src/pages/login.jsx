import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginTitulo from '../componentes/login/logintitulo';
import LoginForm from '../componentes/login/loginform';
import LoginMensaje from '../componentes/login/loginmensaje';
import LoginNavbar from '../componentes/home/NavBar';
import Footer from '../componentes/carrito/carritofooter';

function Login() {
  const [mensaje, setMensaje] = useState('');
  const [codigo, setCodigo] = useState('');
  const [codigoGenerado, setCodigoGenerado] = useState('');
  const [fase, setFase] = useState('login');
  const navigate = useNavigate();

  const generarCodigo = () => {
    const aleatorio = Math.floor(100000 + Math.random() * 900000).toString();
    setCodigoGenerado(aleatorio);
  };

  const iniciarSesion = async (form) => {
    try {
      const res = await fetch('https://backend-donde-la-andrea.onrender.com/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const texto = await res.text();
      setMensaje(texto);

      const email = (form.email || '').trim().toLowerCase();

      if (texto === "ok") {
        const datosUsuario = await fetch(`https://backend-donde-la-andrea.onrender.com/usuarios/email/${email}`);
        const usuario = await datosUsuario.json();

        if (usuario && usuario.id) {
          localStorage.setItem('usuarioAutenticado', 'true');
          localStorage.setItem('usuarioId', usuario.id.toString());
          localStorage.setItem('usuarioNombre', usuario.nombre);
          localStorage.setItem('usuarioEmail', usuario.email);
        }

        if (email.endsWith('@duocprofesor.cl')) {
          generarCodigo();
          setFase('sms');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      setMensaje("Error al iniciar sesión");
      console.error(error);
    }
  };

  const verificarCodigo = () => {
    if (codigo === codigoGenerado) {
      navigate('/admin');
    } else {
      setMensaje("Código incorrecto");
    }
  };

  return (
    <div className="container mt-5">
      <LoginNavbar />
      <LoginTitulo />

      {fase === 'login' && (
        <>
          <LoginForm onLogin={iniciarSesion} />
          <LoginMensaje mensaje={mensaje} />
        </>
      )}

      {fase === 'sms' && (
        <div className="mt-3">
          <p>🔐 Ingresa el código que aparece abajo para acceder como administrador</p>
          <div className="alert alert-info text-center">
            <strong>Código generado:</strong> {codigoGenerado}
          </div>
          <input
            value={codigo}
            onChange={e => setCodigo(e.target.value)}
            placeholder="Código"
            className="form-control mb-2"
          />
          <button onClick={verificarCodigo} className="btn btn-primary">Verificar código</button>
          <LoginMensaje mensaje={mensaje} />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Login;
