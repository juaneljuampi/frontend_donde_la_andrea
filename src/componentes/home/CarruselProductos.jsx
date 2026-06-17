import React from 'react';

function CarruselProductos({ productos, verProducto }) {
  return (
    <div className="container my-4">
      <div className="row align-items-center">
        {/* bienvenida con el logo */}
        <div className="col-12 col-md-3 p-3">
          <div className="card h-100 shadow-sm rounded" style={{ backgroundColor: '#f8f7f8ff' }}>
            <div className="card-body text-center">
              <h3 className="card-title" style={{ color: '#000000ff', fontSize: '0.9rem', fontWeight: 'bold' }}>
                Bienvenido a nuestra tienda
              </h3>
              <img
                src={`${process.env.PUBLIC_URL}/img/logo.png`}
                alt="Logo Boutique"
                style={{ backgroundColor: '#1b1a5fff', height: '200px', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

        {/* carrusel */}
        <div className="col-12 col-md-9">
          <div
            id="carouselProductos"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselProductos"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Video demo 1"
              ></button>
            </div>

            <div className="carousel-inner">
              {/* 🎥 Video (único slide activo) */}
              <div className="carousel-item active">
                <video
                  className="d-block w-100"
                  style={{ height: '340px', objectFit: 'cover' }}
                  controls
                  muted
                  autoPlay
                  loop
                >
                  <source src={`${process.env.PUBLIC_URL}/video/demo.mp4`} type="video/mp4" />
                </video>
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                  <p>Explora nuestros productos</p>
                </div>
              </div>
              {/* No mostrar otros slides, pero mantener funcionalidad de carrusel */}
            </div>

            {/* ⏪⏩ Controles */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselProductos"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselProductos"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarruselProductos;
