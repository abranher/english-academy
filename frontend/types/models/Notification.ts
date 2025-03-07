import { NotificationType } from "../enums/NotificationType";

export interface NotificationData {
  heading: string;
  message: string;
  path: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  data: NotificationData;
  readAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
