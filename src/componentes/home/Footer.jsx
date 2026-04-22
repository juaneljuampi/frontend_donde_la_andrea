import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Footer() {
  const [correo, setCorreo] = useState('');

  const handleSuscribir = async () => {
    if (!correo.includes('@')) {
      toast.error('❌ Ingresa un correo válido');
      return;
    }

    try {
      const res = await fetch('https://backend-production-fcfc3.up.railway.app/api/suscripciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: correo }), // 👈 clave correcta para tu backend
      });

      const mensaje = await res.text();

      if (res.ok) {
        toast.success(`✅ ${mensaje}`);
        setCorreo('');
      } else {
        toast.error(`❌ ${mensaje}`);
      }
    } catch (err) {
      toast.error('❌ No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="theme-dani">
      <footer className="py-4 mt-5">
        <div className="text-center">
          <h4>¡Únete a la comunidad de Natura!</h4>
          <p>Recibe ofertas exclusivas y novedades directamente en tu correo.</p>
          <div className="input-group mb-3 w-75 mx-auto">
            <input
              type="email"
              className="form-control"
              placeholder="Ingresa tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <button className="btn btn-primary" type="button" onClick={handleSuscribir}>
              Suscribirse
            </button>
          </div>
          <h4>Datos de contacto</h4>
          <p>
            Natura:{' '}
            <a href="https://www.natura.cl/consultoria/janni" target="_blank" rel="noopener noreferrer">
              www.natura.cl/consultoria/janni
            </a>
          </p>
          <p>
            Instagram:{' '}
            <a href="https://www.instagram.com/donde_laandrea/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i> @donde_laandrea
            </a>
          </p>
          <p>Medios de pago:</p>
          <ul className="list-unstyled">
            <li><i className="fas fa-hand-holding-usd"></i> Efectivo</li>
            <li><i className="fas fa-money-check-alt"></i> Transferencia</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
