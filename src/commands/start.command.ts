import { Command } from './command.class';
import { Markup, Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { clearInterval } from 'timers';

export class StartCommand extends Command {
  timerId: number | null;

  constructor(protected bot: Telegraf<IBotContext>) {
    super(bot);
    this.timerId = null;
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

    this.bot.action('start_timer', (ctx) => {
      this.clearTimer();

      ctx.editMessageText(
        `
        Помидорка началась! 
        \nЧерез 25 минут я напомню вам сделать перерыв.
        `,
        Markup.inlineKeyboard([
          Markup.button.callback('Прервать помидорку', 'stop_timer'),
        ])
      );

      const timer = setInterval(() => {
        ctx.deleteMessage();
        ctx.reply(
          `
          Помидорка Закончилась! 
          \nСделайте перерыв 5-10 минут. 
          \nНажмите "Начать следующую помидорку" когда будете готовы продолжить.
          `,
          Markup.inlineKeyboard([
            Markup.button.callback('Начать следующую помидорку', 'start_timer'),
          ])
        );
        this.clearTimer();
      }, 3000);

      this.timerId = timer[Symbol.toPrimitive]();
    });

    this.bot.action('stop_timer', (ctx) => {
      this.clearTimer();

      ctx.editMessageText(
        `
        Вы прервали помидорку!
        \nНажмите "Начать помидорку" для запуска новой.
        `,
        Markup.inlineKeyboard([
          Markup.button.callback('Начать помидорку', 'start_timer'),
        ])
      );
    });
  }

  private clearTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    this.timerId = null;
  }
}
