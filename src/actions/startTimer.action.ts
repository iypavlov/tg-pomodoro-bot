import { Action } from './action.class';
import { Markup, Telegraf } from 'telegraf';
import { IBotContext, SessionData } from '../context/context.interface';
import { DEFAULT_COMPLETED_TIMERS, MAX_COMPLETED_TIMERS } from '../constants';

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
        ${this.getCounterRow(ctx.session)}
        `,
        Markup.inlineKeyboard([
          Markup.button.callback('Прервать помидорку ⏹', 'stop_timer'),
        ])
      );

      const timer = setTimeout(() => {
        ctx.session.completedTimersCounter++;

        const isMaxCompletedTimers =
          ctx.session.completedTimersCounter >= MAX_COMPLETED_TIMERS;

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

        if (isMaxCompletedTimers)
          ctx.session.completedTimersCounter = DEFAULT_COMPLETED_TIMERS;

        this.clearTimer(ctx.session);
      }, 3000); // TODO: Заменить на 25мин.

      ctx.session.timerId = timer[Symbol.toPrimitive]();
    });
  }

  private getCounterRow = (session: SessionData) =>
    `\n ${session.completedTimersCounter} / ${MAX_COMPLETED_TIMERS} 🍅`;

  private clearTimer(session: SessionData) {
    if (session.timerId) {
      clearInterval(session.timerId);
    }

    session.timerId = null;
  }
}
