import { SessionData } from '../context/context.interface';
import { DEFAULT_COMPLETED_TIMERS, MAX_COMPLETED_TIMERS } from '../constants';

export class Timer {
  private static instance: Timer;
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Timer();
    }
    return this.instance;
  }

  start(
    session: SessionData,
    callback: (params: { isMaxCompletedTimers: boolean }) => void
  ) {
    const timer = setTimeout(() => {
      session.completedTimersCounter++;

      const isMaxCompletedTimers =
        session.completedTimersCounter >= MAX_COMPLETED_TIMERS;

      callback({ isMaxCompletedTimers });

      if (isMaxCompletedTimers) {
        session.completedTimersCounter = DEFAULT_COMPLETED_TIMERS;
      }

      this.clear(session);
    }, 3000); // TODO: Заменить на 25мин.
    session.timerId = timer[Symbol.toPrimitive]();
  }

  clear(session: SessionData) {
    if (session.timerId) {
      clearTimeout(session.timerId);
    }

    session.timerId = null;
  }
}
