import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.interface';
import { Scenes, Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import { IBotContext } from './context/context.interface';
import { Command } from './commands/command.class';
import { Action } from './actions/action.class';
import { Scene } from './scenes/scene.class';
import { commands } from './commands';
import { actions } from './actions';
import { scenes } from './scenes';

class Bot {
  private readonly bot: Telegraf<IBotContext>;
  private readonly commands: Command[] = [];
  private readonly actions: Action[] = [];
  private readonly scenes: Scene[] = [];

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf(this.configService.get('TOKEN'));
    this.commands = commands.map((Command) => new Command(this.bot));
    this.actions = actions.map((Action) => new Action(this.bot));
    this.scenes = scenes.map((Scene) => new Scene());
  }

  init() {
    this.bot.use(new LocalSession({ database: 'sessions.json' }).middleware());
    this.bot.use(
      new Scenes.Stage<IBotContext>(
        this.scenes.map((scene) => scene.getSceneInstance())
      ).middleware()
    );
    this.bot.catch((err) => {
      console.error(`Error: ${err}`);
      process.exit(1);
    });

    for (const command of this.commands) {
      command.handle();
    }

    for (const action of this.actions) {
      action.handle();
    }

    for (const scene of this.scenes) {
      scene.handle();
    }

    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
