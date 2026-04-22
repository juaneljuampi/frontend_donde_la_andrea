function ProductoBuscador({ busquedaId, onChange, onBuscar }) {
  return (
    <div className="table-responsive">
    <form className="mb-4" onSubmit={onBuscar}>
      <div className="input-group">
        <input
          type="number"
          className="form-control"
          placeholder="Buscar producto por ID"
          value={busquedaId}
          onChange={onChange}
        />
    
        
      </div>
    </form>
    </div>
  );
}

export default ProductoBuscador;
