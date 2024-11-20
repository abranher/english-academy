export const imageFileFilter = (req, file, callback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    req.fileValidationError = 'Solo se permiten archivos de imagen';
    return callback(null, false);
  }
  callback(null, true);
};

export const videoFileFilter = (req, file, callback) => {
  const allowedMimeTypes = ['video/mp4', 'video/webm', 'video/ogg'];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    req.fileValidationError =
      'Solo se permiten archivos de video (MP4, WebM, Ogg)';
    return callback(null, false);
  }
  callback(null, true);
};

export const attachmentFilter = (req, file, callback) => {
  const allowedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
    'text/plain',
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    req.fileValidationError =
      'Solo se permiten archivos de imagen, PDF, texto plano';
    return callback(null, false);
  }

  callback(null, true);
};
