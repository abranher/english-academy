export const imageFileFilter = (req, file, callback) => {
  const allowedMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    req.fileValidationError = 'Solo se permiten archivos de imagen';
    return callback(null, false);
  }
  callback(null, true);
};

export const videoFileFilter = (req, file, callback) => {
  const allowedMimeTypes = ['video/mp4'];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    req.fileValidationError = 'Solo se permiten archivos de video (MP4)';
    return callback(null, false);
  }
  callback(null, true);
};

export const attachmentFilter = (req, file, callback) => {
  const allowedMimeTypes = [
    'application/pdf',
    'image/jpg',
    'image/jpeg',
    'image/png',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    req.fileValidationError = 'Solo se permiten archivos de imagen, PDF, ';
    return callback(null, false);
  }

  callback(null, true);
};
