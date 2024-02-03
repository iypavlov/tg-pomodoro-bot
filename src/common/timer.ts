import { SessionData } from '../context/context.interface';
import {
  DEFAULT_CURRENT_TIMER_COUNTER,
  MAX_CURRENT_TIMER_COUNTER,
} from '../constants';

export class Timer {
  private static instance: Timer;
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new Timer();
    }
    return this.instance;
  }

  start(session: SessionData, callback: () => void) {
    const timer = setTimeout(() => {
      session.completedTimersCounter++;
      session.currentTimerCounter++;

      session.isLongBreak =
        session.currentTimerCounter >= MAX_CURRENT_TIMER_COUNTER;

      callback();

      if (session.isLongBreak) {
        session.currentTimerCounter = DEFAULT_CURRENT_TIMER_COUNTER;
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
