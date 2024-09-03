export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = 'Solo se permiten archivos de imagen';
    return callback(null, false);
  }
  callback(null, true);
};
