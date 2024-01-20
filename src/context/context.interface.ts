import { Context } from 'telegraf';

export interface SessionData {
  isStarted: boolean;
  timerId: number | null;
}

export interface IBotContext extends Context {
  session: SessionData;
}
