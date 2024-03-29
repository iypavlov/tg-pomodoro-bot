import { Markup, Scenes } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { DEFAULT_CURRENT_TIMER_COUNTER, SCENE_ID_MAP } from '../constants';
import { Scene } from './scene.class';

export class StartScene extends Scene {
  constructor() {
    super(new Scenes.BaseScene<IBotContext>(SCENE_ID_MAP.start));
  }

  handle() {
    this.scene.enter(async (ctx) => {
      ctx.session.timerId = null;
      ctx.session.currentTimerCounter = DEFAULT_CURRENT_TIMER_COUNTER;
      ctx.session.isLongBreak = false;

      try {
        await ctx.reply(
          `
        🤖 
        \nПривет! Я бот помидорка, ваш помощник в продуктивной работе! 
        \n Начнем❔
         \n 1️⃣ Определитесь с задачей которую будете решать
         \n 2️⃣ Нажмите "Начать помидорку" когда будете готовы, это запустит таймер на 25 минут
         \n 3️⃣ Переключите все свое внимание на решение вашей задачи
         \n 4️⃣ По завершению таймера сделайте перерыв 3 - 5 минут
         \n 5️⃣ Продолжайте помидорки, до тех пор пока не решите задачу
         \n 6️⃣ После каждой четвертой помидорки делайте длинный перерыв в 15 - 30 минут
         
         \n 🔵 Если задача занимает более 8 помидорок, постарайтесь разбить ее на мелкие подзадачи.
         \n 🔵 Не прерывайте помидорку.
         \n 🔵 Если задача занимает меньше одной помидорки, попробуйте скомбинировать несколько мелких задач.
        `,
          Markup.inlineKeyboard([
            Markup.button.callback('Начать помидорку 🍅', 'start_timer'),
          ])
        );
      } catch (e) {
        console.log(e);
      }
    });
  }
}
