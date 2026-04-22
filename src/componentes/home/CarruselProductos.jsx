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
              <button
                type="button"
                data-bs-target="#carouselProductos"
                data-bs-slide-to="1"
                aria-label="Video demo 2"
              ></button>
              {productos.slice(0, 2).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#carouselProductos"
                  data-bs-slide-to={i + 2}
                  aria-label={`Slide ${i + 3}`}
                ></button>
              ))}
            </div>

            <div className="carousel-inner">
              {/* 🎥 Video 1 */}
              <div className="carousel-item active">
                <video
                  className="d-block w-100"
                  style={{ height: '340px', objectFit: 'cover' }}
                  controls
                  muted
                  autoPlay
                  loop
                >
                  <source src={`${process.env.PUBLIC_URL}/video/demo2.mp4`} type="video/mp4" />
                  
                </video>
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                  <p>Explora nuestros productos</p>
                </div>
              </div>

              {/* 🎥 Video 2 */}
              <div className="carousel-item">
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

              {/* 🖼️ Productos */}
              {productos.slice(0, 2).map((producto) => (
                <div key={producto.id} className="carousel-item">
                  <img
                    src={`https://backend-production-fcfc3.up.railway.app${producto.imagen}`}
                    alt={producto.nombre}
                    className="d-block w-100"
                    style={{ height: '340px', objectFit: 'cover' }}
                  />
                  <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                    <h5>{producto.nombre}</h5>
                    <p>{producto.descripcion}</p>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ backgroundColor: '#0d00fdff', borderRadius: '20px', fontWeight: 'bold' }}
                      onClick={() => verProducto(producto)}
                    >
                      Ver producto
                    </button>
                  </div>
                </div>
              ))}
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
