import { Context } from 'telegraf';

export interface SessionData {
  test: boolean;
}

export interface IBotContext extends Context {
  session: SessionData;
}
