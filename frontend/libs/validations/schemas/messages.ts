const message = (message: string) => ({ message });

const messages = {
  email: message("Correo electrónico no válido."),
  min: (num: number) => message(`Debe contener al menos ${num} caracteres.`),
  max: (num: number) => message(`Debe contener como máximo ${num} caracteres.`),
};

export default messages;
