import { Command } from './command.class';
import { Markup, Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';

export class StartCommand extends Command {
  constructor(protected bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.start((ctx) => {
      ctx.session.isStarted = true;
      ctx.reply(
        `
        Привет! Я бот помидорка, ваш помощник в продуктивной работе! 
        \nЧто я умею:
         \n - Запускать помидорку которая длится 25 мин
         \n - Прерывать запущенную помидорку (не желательно)
        `,
        Markup.inlineKeyboard([
          Markup.button.callback('Начать помодорку', 'start_timer'),
        ])
      );
    });
  }
}
