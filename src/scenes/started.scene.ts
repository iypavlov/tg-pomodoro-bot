import { Markup, Scenes } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { BUTTONS, SCENE_ID_MAP } from '../constants';
import { Scene } from './scene.class';
import { getCurrentTimerCounterRow } from '../utils';

export class StartedScene extends Scene {
  constructor() {
    super(new Scenes.BaseScene<IBotContext>(SCENE_ID_MAP.started));
  }

  handle() {
    this.scene.enter(async (ctx) => {
      try {
        await ctx.editMessageText(
          `
        🤖 
        \n Помидорка началась! 
        \n Переключите все внимание на решение вашей задачи.
        \n Через 25 минут я напомню вам сделать перерыв.
        ${getCurrentTimerCounterRow(ctx.session)}
        `,
          Markup.inlineKeyboard([BUTTONS.stop])
        );
      } catch (e) {
        console.log(e);
      }
    });
  }
}
