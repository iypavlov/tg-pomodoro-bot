import { Context, Scenes } from 'telegraf';

export interface SessionData extends Scenes.SceneSession {
  timerId: number | null;
  isLongBreak: boolean;
  currentTimerCounter: number;
  completedTimersCounter: number;
  interruptedTimersCounter: number;
}

export interface IBotContext extends Context {
  session: SessionData;
  scene: Scenes.SceneContextScene<IBotContext>;
}
