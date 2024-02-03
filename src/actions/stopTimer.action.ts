import { Action } from './action.class';
import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { Timer } from '../common/timer';
import { SCENE_ID_MAP } from '../constants';

export class StopTimerAction extends Action {
  private timer: Timer;

  constructor(protected bot: Telegraf<IBotContext>) {
    super(bot);
    this.timer = Timer.getInstance();
  }

  handle() {
    this.bot.action('stop_timer', (ctx) => {
      this.timer.clear(ctx.session);
      ctx.session.interruptedTimersCounter++;

      ctx.scene.enter(SCENE_ID_MAP.stop);
    });
  }
}
