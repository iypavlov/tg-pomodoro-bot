import { Markup, Scenes } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { SCENE_ID_MAP } from '../constants';
import { Scene } from './scene.class';
import { getCounterRow } from '../utils';

export class StartedScene extends Scene {
  constructor() {
    super(new Scenes.BaseScene<IBotContext>(SCENE_ID_MAP.started));
  }

  handle() {
    this.scene.enter(async (ctx) => {
      await ctx.editMessageText(
        `
        🤖 
        \n Помидорка началась! 
        \n Переключите все внимание на решение вашей задачи.
        \n Через 25 минут я напомню вам сделать перерыв.
        ${getCounterRow(ctx.session)}
        `,
        Markup.inlineKeyboard([
          Markup.button.callback('Прервать помидорку ⏹', 'stop_timer'),
        ])
      );
    });
  }
}
