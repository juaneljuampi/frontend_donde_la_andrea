import { useState } from 'react';

function ImagenConCarga({ src, alt, className }) {
  const [cargando, setCargando] = useState(true);

  const handleLoad = () => setCargando(false);
  const handleError = (e) => {
    e.target.src = '/fallback.jpg'; // imagen por defecto si falla
    setCargando(false);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100px' }}>
      {cargando && (
        <div className="spinner-border text-primary" role="status" style={{ position: 'absolute', top: '40%', left: '45%' }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${cargando ? 'd-none' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy" 
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}

export default ImagenConCarga;
