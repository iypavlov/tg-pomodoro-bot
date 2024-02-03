import { SessionData } from './context/context.interface';
import { MAX_CURRENT_TIMER_COUNTER } from './constants';

export const getCurrentTimerCounterRow = (session: SessionData) =>
  `\n ${session.currentTimerCounter} / ${MAX_CURRENT_TIMER_COUNTER} 🍅`;
