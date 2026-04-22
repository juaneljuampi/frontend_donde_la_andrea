function CarritoResumen({ total, onMostrarModal }) {
  return (
    <>
      <h4 className="mt-3 text-end me-5">Total Compra: ${total.toLocaleString('es-CL')}</h4>
      <div className="mt-4" style={{ width: '15%', margin: '0 auto' }}>
        <button className="btn" style={{ backgroundColor: '#039b29', color: '#fff' }} onClick={onMostrarModal}>
          Terminar compra
        </button>
      </div>
    </>
  );
}

export default CarritoResumen;
