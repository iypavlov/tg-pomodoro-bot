import { Action } from './action.class';
import { Markup, Telegraf } from 'telegraf';
import { IBotContext, SessionData } from '../context/context.interface';

export class StartTimerAction extends Action {
  constructor(protected bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.action('start_timer', (ctx) => {
      this.clearTimer(ctx.session);

      ctx.editMessageText(
        `
        🤖 
        \n Помидорка началась! 
        \n Переключите все внимание на решение вашей задачи.
        \n Через 25 минут я напомню вам сделать перерыв.
        `,
        Markup.inlineKeyboard([
          Markup.button.callback('Прервать помидорку 🍅', 'stop_timer'),
        ])
      );

      const timer = setInterval(() => {
        ctx.deleteMessage();
        ctx.reply(
          `
          🤖 
          \n Помидорка Закончилась! 
          \n Сделайте перерыв 5-10 минут. 
          \n Нажмите "Начать следующую помидорку" когда будете готовы продолжить.
          `,
          Markup.inlineKeyboard([
            Markup.button.callback(
              'Начать следующую помидорку 🍅',
              'start_timer'
            ),
          ])
        );

        this.clearTimer(ctx.session);
      }, 3000); // TODO: Заменить на 25мин.

      ctx.session.timerId = timer[Symbol.toPrimitive]();
    });
  }

  private clearTimer(session: SessionData) {
    if (session.timerId) {
      clearInterval(session.timerId);
    }

    session.timerId = null;
  }
}
