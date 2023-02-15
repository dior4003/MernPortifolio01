import TelegramBot from "node-telegram-bot-api";
const token = "5247970998:AAF4U0iyt9TyilvXowcIoDoHqHxCZdD-Sj8";
const bot = new TelegramBot(token, { polling: true });
export const sendMail = async (text) => {
  bot.sendMessage(1463395486, text);
};
