import { SessionData } from './context/context.interface';
import { MAX_COMPLETED_TIMERS } from './constants';

export const getCounterRow = (session: SessionData) =>
  `\n ${session.completedTimersCounter} / ${MAX_COMPLETED_TIMERS} 🍅`;
