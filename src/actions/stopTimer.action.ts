import { Action } from './action.class';
import { Markup, Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { Timer } from '../common/timer';

export class StopTimerAction extends Action {
  private timer: Timer;

  constructor(protected bot: Telegraf<IBotContext>) {
    super(bot);
    this.timer = Timer.getInstance();
  }

  handle() {
    this.bot.action('stop_timer', (ctx) => {
      this.timer.clear(ctx.session);

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
