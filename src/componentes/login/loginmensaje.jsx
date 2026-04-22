function LoginMensaje({ mensaje }) {
  return mensaje ? <div className="alert alert-info mt-3">{mensaje}</div> : null;
}

export default LoginMensaje;
