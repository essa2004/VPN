const TelegramBot = require('node-telegram-bot-api');

// ضع توكن البوت الخاص بك هنا
const token = '6905090609:AAErK2lotBCgHExm1MZAQjOf9fdR9PBhEyU';

// أنشئ البوت
const bot = new TelegramBot(token, { polling: true });

// عند الضغط على /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || 'صديقي';

  bot.sendMessage(chatId, `مرحباً ${firstName}! كيف يمكنني مساعدتك؟`);
});
