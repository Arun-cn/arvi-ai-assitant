import TelegramBot from "node-telegram-bot-api";

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  throw new Error("TELEGRAM_BOT_TOKEN is not defined");
}

/**
 * Initializes a new instance of the TelegramBot with the provided token and polling options.
 * The polling option is set to true so that the bot can receive updates from the Telegram API.
 */
const bot = new TelegramBot(token, {
  polling: true,
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const receivedText = msg.text;
  console.log(`Received message: ${receivedText}`);
  bot.sendMessage(chatId, `You said: ${receivedText}`);
});

export default bot;
