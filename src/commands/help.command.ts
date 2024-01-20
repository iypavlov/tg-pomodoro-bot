import { Command } from './command.class';
import { Telegraf } from 'telegraf';
import { IBotContext } from '../context/context.interface';

export class HelpCommand extends Command {
  constructor(protected bot: Telegraf<IBotContext>) {
    super(bot);
  }

  handle() {
    this.bot.help((ctx) => {
      ctx.reply(
        `
        «Метод помидора» — техника управления временем, предложенная Франческо Чирилло в конце 1980. 
        \nМетодика предполагает увеличение эффективности работы при меньших временных затратах за счёт глубокой концентрации и коротких перерывов. 
        \nВ классической технике отрезки времени — «помидоры» длятся полчаса: 25 минут работы и 5 минут отдыха
        \n\nДоступные команды:
        \n/start - Начать работать с ботом
        \n/help - Дополнительная информация
        `
      );
    });
  }
}
