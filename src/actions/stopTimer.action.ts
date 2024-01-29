import { Action } from './action.class';
import { Markup, Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';

export class StopTimerAction extends Action {
  constructor(protected bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.action('stop_timer', (ctx) => {
      if (ctx.session.timerId) {
        clearInterval(ctx.session.timerId);
      }
      ctx.session.timerId = null;

      ctx.editMessageText(
        `
        🤖
        \n Вы прервали помидорку!
        \n Нажмите "Начать помидорку" для запуска новой.
        `,
        Markup.inlineKeyboard([
          Markup.button.callback('Начать помидорку 🍅', 'start_timer'),
        ])
      );
    });
  }
}
