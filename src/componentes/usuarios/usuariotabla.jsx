
import UsuarioAcciones from './usuarioacciones';


function UsuarioTabla({ usuarios, onEditar, onEliminar, onBloquear, onDesbloquear }) {
  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Correo</th>
          <th>Nombre</th>
          <th>Comuna</th>
          <th>Dirección</th>
          <th>Contraseña</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map(u => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.email}</td>
            <td>{u.nombre}</td>
            <td>{u.comuna}</td>
            <td>{u.direccion}</td>
            <td>{u.contraseña}</td>
            <td>{u.bloqueado ? 'Bloqueado' : 'Activo'}</td>
            <td>
              <UsuarioAcciones
                usuario={u}
                onEditar={onEditar}
                onEliminar={onEliminar}
                onBloquear={onBloquear}
                onDesbloquear={onDesbloquear}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsuarioTabla;