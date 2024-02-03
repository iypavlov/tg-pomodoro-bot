import { Action } from './action.class';
import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { SCENE_ID_MAP } from '../constants';

export class RestartAction extends Action {
  constructor(protected readonly bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.action('restart', (ctx) => {
      try {
        ctx.deleteMessage();
      } catch (e) {
        console.log(e);
      }

      ctx.scene.enter(SCENE_ID_MAP.start);
    });
  }
}
