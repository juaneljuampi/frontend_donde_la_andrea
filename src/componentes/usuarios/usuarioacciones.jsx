function UsuarioAcciones({ usuario, onEditar, onEliminar, onBloquear, onDesbloquear }) {
  return (
    <div className="d-flex gap-2">
      <button className="btn btn-primary btn-sm"style={{background:'green'}} onClick={() => onEditar(usuario)}>
        Editar
      </button>
      <button className="btn btn-danger btn-sm" onClick={() => onEliminar(usuario.id)}>
        Eliminar
      </button>
      {usuario.bloqueado ? (
        <button className="btn btn-success btn-sm"style={{background:'blue'}} onClick={() => onDesbloquear(usuario.id)}>
          Desbloquear
        </button>
      ) : (
        <button className="btn btn-warning btn-sm"style={{background:'orange'}} onClick={() => onBloquear(usuario.id)}>
          Bloquear
        </button>
      )}
    </div>
  );
}

export default UsuarioAcciones;
