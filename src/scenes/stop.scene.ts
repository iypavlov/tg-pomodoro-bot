import { Markup, Scenes } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { BUTTONS, SCENE_ID_MAP } from '../constants';
import { Scene } from './scene.class';

export class StopScene extends Scene {
  constructor() {
    super(new Scenes.BaseScene<IBotContext>(SCENE_ID_MAP.stop));
  }

  handle() {
    this.scene.enter(async (ctx) => {
      try {
        await ctx.editMessageText(
          `
        🤖
        \n Вы прервали помидорку!
        \n Нажмите "Начать помидорку" для запуска новой.
        `,
          Markup.inlineKeyboard([BUTTONS.restart, BUTTONS.start])
        );
      } catch (e) {
        console.log(e);
      }
    });
  }
}
