import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/home';
import Carrito from './pages/carrito';
import Productos from './pages/productos';
import Admin from './pages/admin';
import FormularioRegistro from './pages/registro';
import Login from './pages/login';
import Usuario from './pages/usuarios';
import Productoscopy from './pages/productoscopy';
import Estadisticas from './pages/estadisticas';
import Perfil from './pages/perfil';
import Compras from './pages/compras';
import PerfilMobile from './pages/perfilmobile';
import LoginMobile from './pages/loginmobile';

function App() {
  const [carrito, setCarrito] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} />} />
        <Route path="/productos" element={<Productos carrito={carrito} setCarrito={setCarrito} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/registro" element={<FormularioRegistro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuarios" element={<Usuario />} />
        <Route path="/productoscopy" element={<Productoscopy />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/perfilmobile" element={<PerfilMobile />} />
        <Route path="/loginmobile" element={<LoginMobile />} />
      </Routes>
    </Router>
  );
}

export default App;
