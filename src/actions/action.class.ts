import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';

export abstract class Action {
  constructor(protected bot: Telegraf<IBotContext>) {}

  abstract handle(): void;
}
