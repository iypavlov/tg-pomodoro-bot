import { Action } from './action.class';
import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { SCENE_ID_MAP } from '../constants';
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

      this.timer.start(ctx.session, () => {
        ctx.scene.enter(SCENE_ID_MAP.completed);
      });

      ctx.scene.enter(SCENE_ID_MAP.started);
    });
  }
}
