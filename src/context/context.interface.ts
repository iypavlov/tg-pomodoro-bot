import { Context, Scenes } from 'telegraf';

export interface SessionData extends Scenes.SceneSession {
  isStarted: boolean;
  timerId: number | null;
  isMaxCompletedTimers: boolean;
  completedTimersCounter: number;
}

export interface IBotContext extends Context {
  session: SessionData;
  scene: Scenes.SceneContextScene<IBotContext>;
}
