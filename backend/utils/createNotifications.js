import { Notification } from "../models/Notification.js";

export const createNotification = async ({
  sender = null,
  recipient,
  title,
  message,
  type = "custom",
  link = null,
}) => {
  return await Notification.create({
    sender,
    recipient,
    title,
    message,
    type,
    link,
    isRead: false,
  });
};