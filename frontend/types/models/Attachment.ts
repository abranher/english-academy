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


const attachedAttachments: Attachment[] = lessonClass.attachments
  .map((classAttachment) => {
    const attachment = attachments?.find(
      (a) => a.id === classAttachment.attachmentId
    );
    return attachment
      ? { ...attachment, classAttachmentId: classAttachment.id } // Incluye el ID de ClassAttachment
      : null;
  })
  .filter((attachment): attachment is Attachment => attachment !== null);