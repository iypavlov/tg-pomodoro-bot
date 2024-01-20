import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.interface';
import { Telegraf } from 'telegraf';
import { IBotContext } from './context/context.interface';
import { Command } from './commands/command.class';
import { StartCommand } from './commands/start.command';
import LocalSession from 'telegraf-session-local';
import { Action } from './actions/action.class';
import { StartTimerAction } from './actions/startTimer.action';
import { StopTimerAction } from './actions/stopTimer.action';

class Bot {
  private readonly bot: Telegraf<IBotContext>;
  private commands: Command[] = [];
  private actions: Action[] = [];

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
    this.bot.use(new LocalSession({ database: 'sessions.json' }).middleware());
  }

  init() {
    this.commands = [new StartCommand(this.bot)];
    for (const command of this.commands) {
      command.handle();
    }

    this.actions = [
      new StartTimerAction(this.bot),
      new StopTimerAction(this.bot),
    ];
    for (const actions of this.actions) {
      actions.handle();
    }

    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
