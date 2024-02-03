import { Scene } from './scene.class';
import { Scenes } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { SCENE_ID_MAP } from '../constants';

export class HelpScene extends Scene {
  constructor() {
    super(new Scenes.BaseScene<IBotContext>(SCENE_ID_MAP.help));
  }

  handle() {
    this.scene.enter(async (ctx) => {
      try {
        await ctx.reply(
          `
        ℹ
        \n «Метод помидора» — техника управления временем, предложенная Франческо Чирилло в конце 1980. 
        \n Методика предполагает увеличение эффективности работы при меньших временных затратах за счёт глубокой концентрации и коротких перерывов. 
        \n В классической технике отрезки времени — «помидоры» длятся полчаса: 25 минут работы и 5 минут отдыха
        \n Github - https://github.com/iypavlov/tg-pomodoro-bot
        `
        );
      } catch (e) {
        console.log(e);
      }
    });
  }
}
