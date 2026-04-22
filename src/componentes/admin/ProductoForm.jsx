import { useState, useEffect } from 'react';
import React from 'react';


function ProductoForm({ formData, onChange, onSubmit, editandoId, onCancel, onImagenSeleccionada }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

useEffect(() => {
  if (imagenSeleccionada) {
    const url = URL.createObjectURL(imagenSeleccionada);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url); // limpia la URL anterior
    };
  } else {
    setPreviewUrl(null);
  }
}, [imagenSeleccionada]);

const handleImagenChange = (e) => {
  const archivo = e.target.files[0];
  setImagenSeleccionada(archivo); 
  onImagenSeleccionada(e);        
};


  return (
    <form className="row g-3 mb-5" onSubmit={onSubmit}>
      <div className="col-md-4">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          value={formData.nombre}
          onChange={onChange}
          required
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Descripción</label>
        <input
          type="text"
          className="form-control"
          id="descripcion"
          value={formData.descripcion}
          onChange={onChange}
          required
        />
      </div>
<div className="col-md-4">
  <label className="form-label">Categoría</label>
<select
  id="categoria"
  value={formData.categoria}
  onChange={onChange}
  className="form-control"
>
  <option value="">Selecciona una categoría</option>
  <option value="Cuidado corporal">Cuidado corporal</option>
  <option value="Fragancias">Fragancias</option>
  <option value="Capilar">Capilar</option>
  <option value="Higiene">Higiene</option>
  <option value="Exfoliantes">Exfoliantes</option>
  <option value="Cuidado facial">Cuidado facial</option>
</select>

</div>
      <div className="col-md-2">
        <label className="form-label">Precio</label>
        <input
          type="number"
          className="form-control"
          id="precioUnitario"
          value={formData.precioUnitario}
          onChange={onChange}
          required
        />
      </div>

      <div className="col-md-2">
        <label className="form-label">Cantidad</label>
        <input
          type="number"
          className="form-control"
          id="cantidad"
          value={formData.cantidad}
          onChange={onChange}
          required
        />
      </div>

      <div className="col-md-4">
        <label className="form-label">Seleccionar imagen</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleImagenChange}
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Vista previa"
            className="img-thumbnail mt-2"
            style={{ width: '150px' }}
          />
        )}
      </div>

      <div className="col-12">
        <button type="submit" className={`btn ${editandoId ? 'btn-primary' : 'btn-success'}`} style={{color:'white',background: editandoId ? 'green' : 'blue'}}>
          {editandoId ? 'Guardar cambios' : 'Agregar producto'}
        </button>
        {editandoId && (
          <button type="button" className="btn btn-secondary ms-2"style={{background:'red'}} onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductoForm;
