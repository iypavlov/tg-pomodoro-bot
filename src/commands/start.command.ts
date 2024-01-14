import { Command } from './command.class';
import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';

export class StartCommand extends Command {
  constructor(protected bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.start((ctx) => {
      ctx.session.isStarted = true;
      ctx.reply('Начало работы');
    });
  }
}
