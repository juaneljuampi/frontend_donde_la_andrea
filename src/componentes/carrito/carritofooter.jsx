function CarritoFooter() {
  return (
    <footer className="py-4 mt-5" style={{ backgroundColor: '#5e548e', color: 'white' }}>
      <div className="container text-center">
        <h4 className="text-white">¡Únete a la comunidad de Natura!</h4>
        <p className="text-white">Recibe ofertas exclusivas y novedades directamente en tu correo.</p>
        <div className="input-group mb-3 w-75 mx-auto">

        </div>
        <h4 className="text-white">Datos de contacto</h4>
        <p className="text-white">Natura: <a href="https://www.natura.cl/consultoria/janni" target="_blank">www.natura.cl/consultoria/janni</a></p>
        <p className="text-white">Instagram: <a href="https://www.instagram.com/donde_laandrea/" target="_blank"><i className="fab fa-instagram"></i></a></p>
        <p className="text-white">Medios de pago:</p>
        <ul className="list-unstyled text-white">
          <li><i className="fas fa-hand-holding-usd"></i> Efectivo</li>
          <li><i className="fas fa-money-check-alt"></i> Transferencia</li>
        </ul>
      </div>
    </footer>
  );
}

export default CarritoFooter;
