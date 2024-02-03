import { Context, Scenes } from 'telegraf';
import { SceneSessionData } from 'telegraf/typings/scenes';

interface SessionTest extends SceneSessionData {
  test: boolean;
}

export interface SessionData extends Scenes.SceneSession<SessionTest> {
  isStarted: boolean;
  timerId: number | null;
  isMaxCompletedTimers: boolean;
  completedTimersCounter: number;
}

export interface IBotContext extends Context {
  session: SessionData;
  scene: Scenes.SceneContextScene<IBotContext, SessionTest>;
}
