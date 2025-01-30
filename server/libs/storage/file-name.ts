import { randomUUID } from 'node:crypto';

export const createFileName = (req, file, cb) => {
  const fileName = `${randomUUID()}.${file.originalname.split('.')[1]}`;
  cb(null, fileName);
};
