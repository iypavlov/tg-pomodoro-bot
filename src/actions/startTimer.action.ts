import { Action } from './action.class';
import { Markup, Telegraf } from 'telegraf';
import { IBotContext, SessionData } from '../context/context.interface';
import { MAX_COMPLETED_TIMERS } from '../constants';
import { Timer } from '../common/timer';

export class StartTimerAction extends Action {
  private timer: Timer;

  constructor(protected bot: Telegraf<IBotContext>) {
    super(bot);
    this.timer = Timer.getInstance();
  }

  handle() {
    this.bot.action('start_timer', (ctx) => {
      this.timer.clear(ctx.session);

      ctx.editMessageText(
        `
        🤖 
        \n Помидорка началась! 
        \n Переключите все внимание на решение вашей задачи.
        \n Через 25 минут я напомню вам сделать перерыв.
        ${this.getCounterRow(ctx.session)}
        `,
        Markup.inlineKeyboard([
          Markup.button.callback('Прервать помидорку ⏹', 'stop_timer'),
        ])
      );

      this.timer.start(ctx.session, ({ isMaxCompletedTimers }) => {
        ctx.deleteMessage();

        if (isMaxCompletedTimers) {
          ctx.reply(
            `
          🤖 
          \n Четвертая помидорка закончилась! 🔥
          \n Сделайте перерыв 15 - 30 минут. 
          \n Нажмите "Начать новую помидорку" когда будете готовы продолжить.
          ${this.getCounterRow(ctx.session)}
          `,
            Markup.inlineKeyboard([
              Markup.button.callback(
                'Начать новую помидорку ▶',
                'start_timer'
              ),
            ])
          );
        } else {
          ctx.reply(
            `
          🤖 
          \n Помидорка Закончилась!
          \n Сделайте перерыв 5-10 минут. 
          \n Нажмите "Начать следующую помидорку" когда будете готовы продолжить.
          ${this.getCounterRow(ctx.session)}
          `,
            Markup.inlineKeyboard([
              Markup.button.callback(
                'Начать следующую помидорку ⏭',
                'start_timer'
              ),
            ])
          );
        }
      });
    });
  }

  private getCounterRow = (session: SessionData) =>
    `\n ${session.completedTimersCounter} / ${MAX_COMPLETED_TIMERS} 🍅`;
}
