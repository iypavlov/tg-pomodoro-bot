import { Markup, Scenes } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { SCENE_ID_MAP } from '../constants';
import { Scene } from './scene.class';
import { getCounterRow } from '../utils';

export class CompletedScene extends Scene {
  constructor() {
    super(new Scenes.BaseScene<IBotContext>(SCENE_ID_MAP.completed));
  }

  handle() {
    this.scene.enter(async (ctx) => {
      await ctx.deleteMessage();

      if (ctx.session.isMaxCompletedTimers) {
        await ctx.reply(
          `
          🤖 
          \n Четвертая помидорка закончилась! 🔥
          \n Сделайте перерыв 15 - 30 минут. 
          \n Нажмите "Начать новую помидорку" когда будете готовы продолжить.
          ${getCounterRow(ctx.session)}
          `,
          Markup.inlineKeyboard([
            Markup.button.callback('Начать новую помидорку ▶', 'start_timer'),
          ])
        );
      } else {
        await ctx.reply(
          `
          🤖 
          \n Помидорка Закончилась!
          \n Сделайте перерыв 5-10 минут. 
          \n Нажмите "Начать следующую помидорку" когда будете готовы продолжить.
          ${getCounterRow(ctx.session)}
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
  }
}
