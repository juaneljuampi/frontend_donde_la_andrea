import { toast } from 'react-toastify';

export const mostrarToast = (tipo, mensaje, opcionesExtra = {}) => {
  const opcionesBase = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...opcionesExtra // permite personalizar desde fuera
  };

  switch (tipo) {
    case 'success':
      toast.success(mensaje, opcionesBase);
      break;
    case 'error':
      toast.error(mensaje, opcionesBase);
      break;
    case 'info':
      toast.info(mensaje, opcionesBase);
      break;
    case 'warning':
      toast.warning(mensaje, opcionesBase);
      break;
    default:
      toast(mensaje, opcionesBase);
  }
};
