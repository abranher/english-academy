import { NotificationType } from "../enums/NotificationType";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  data: Object;
  readAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
