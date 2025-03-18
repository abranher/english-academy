export interface Attachment {
  id: string;
  title: string;
  url: string;

  tutorId: string;

  createdAt: Date;
  updatedAt: Date;
}


export interface Attachment {
  id: string;
  title: string;
  url: string;
  tutorId: string;
  createdAt: Date;
  updatedAt: Date;
  classAttachmentId?: string; // Nueva propiedad para almacenar el ID de ClassAttachment
}