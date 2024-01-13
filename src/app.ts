import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.interface';
import { session, Telegraf } from 'telegraf';

class Bot {
  bot: Telegraf;

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf(this.configService.get('TOKEN'));
    this.bot.use(session());
  }

  init() {
    this.bot.launch();
  }
}

const bot = new Bot(new ConfigService());
bot.init();
