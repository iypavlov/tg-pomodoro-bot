import { Markup, Scenes } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { BUTTONS, SCENE_ID_MAP } from '../constants';
import { Scene } from './scene.class';
import { getCurrentTimerCounterRow } from '../utils';

export class CompletedScene extends Scene {
  constructor() {
    super(new Scenes.BaseScene<IBotContext>(SCENE_ID_MAP.completed));
  }

  handle() {
    this.scene.enter(async (ctx) => {
      try {
        await ctx.deleteMessage();
      } catch (e) {
        console.error(e);
      }

      try {
        if (ctx.session.isLongBreak) {
          await ctx.reply(
            `
          🤖 
          \n 🏁 Четвертая помидорка закончилась!
          \n 🛏 Сделайте перерыв 15 - 30 минут. 
          \n 🍅 Нажмите "Начать новую помидорку" когда будете готовы продолжить.
          `,
            Markup.inlineKeyboard([BUTTONS.restart, BUTTONS.startNew])
          );
        } else {
          await ctx.reply(
            `
          🤖 
          \n Помидорка Закончилась!
          \n Сделайте перерыв 3 - 5 минут. 
          \n Нажмите "Начать следующую помидорку" когда будете готовы продолжить.
          ${getCurrentTimerCounterRow(ctx.session)}
          `,
            Markup.inlineKeyboard([BUTTONS.restart, BUTTONS.start])
          );
        }
      } catch (e) {
        console.error(e);
      }
    });
  }
}
