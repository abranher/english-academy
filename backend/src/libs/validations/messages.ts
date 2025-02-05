const message = (message: string) => ({ message });

const messages = {
  email: message('Correo electrónico no válido.'),
  min: message('Debe contener al menos $constraint1 caracteres.'),
  max: message('Debe contener como máximo $constraint1 caracteres.'),
};

export default messages;
