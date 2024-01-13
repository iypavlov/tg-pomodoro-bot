import { IConfigService } from './config.interface';
import { config, DotenvParseOutput } from 'dotenv';

export class ConfigService implements IConfigService {
  private readonly config: DotenvParseOutput;

  constructor() {
    const { parsed, error } = config();

    if (error) {
      throw new Error('Не найден .env');
    }

    if (!parsed) {
      throw new Error('Пустой .env');
    }

    this.config = parsed;
  }

  get(key: string): string {
    const res = this.config[key];
    if (!res) {
      throw new Error(`Ключ ${key} не найден в конфиге`);
    }

    return res;
  }
}
