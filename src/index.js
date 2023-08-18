require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});

const resipes = require('./recipes');

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;  
 
  
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Dolma', callback_data: 'option_dolma' }],
        [{ text: 'Khash', callback_data: 'option_khash' }],
        [{ text: 'Harisa', callback_data: 'option_harisa' }],
        [{ text: 'Lahmacun', callback_data: 'option_lahmacun' }],
        [{ text: 'Gata', callback_data: 'option_gata' }],
        [{ text: 'Pakhlava', callback_data: 'option_pakhlava' }],
      ],
    },
  };
 
 bot.sendMessage(chatId, 'Hello! Here are some typical representatives of Armenian cousine. Choose the one and I`ll give you the recipe!', options);
});



bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const chosenOption = query.data;
 
  
  switch (chosenOption) {
    case 'option_dolma':
      bot.sendMessage(chatId, recipes.dolma)
      break

    case 'option_khash':
      bot.sendMessage(chatId, recipes.khash)
      break

    case 'option_harisa':
      bot.sendMessage(chatId, recipes.harisa)
      break

    case 'option_lahmacun':
      bot.sendMessage(chatId, recipes.lahmacun)
      break

    case 'option_gata':
      bot.sendMessage(chatId, recipes.gata)
      break

    case 'option_pakhlava':
      bot.sendMessage(chatId, recipes.pakhlava )
      break
      
    default:
      break
    
  }
  

  // Respond to the callback to remove the inline keyboard
  bot.answerCallbackQuery(query.id);
});


