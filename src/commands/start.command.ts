import { Command } from './command.class';
import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';
import { DEFAULT_CURRENT_TIMER_COUNTER, SCENE_ID_MAP } from '../constants';

export class StartCommand extends Command {
  constructor(protected bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.start((ctx) => {
      ctx.session.timerId = null;
      ctx.session.currentTimerCounter = DEFAULT_CURRENT_TIMER_COUNTER;

      ctx.scene.enter(SCENE_ID_MAP.start);
    });
  }
}
