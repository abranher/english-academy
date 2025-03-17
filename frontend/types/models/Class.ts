import { ClassAttachment } from "./ClassAttachment";

export interface Class {
  id: string;
  title: string;
  description: string | null;
  video: string | null;

  lessonId: string;

  attachments: ClassAttachment[] | [];

  createdAt: Date;
  updatedAt: Date;
}
