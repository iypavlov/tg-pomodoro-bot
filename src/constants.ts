import { Markup } from 'telegraf';

export const DEFAULT_CURRENT_TIMER_COUNTER = 0;
export const MAX_CURRENT_TIMER_COUNTER = 4;
export const SCENE_ID_MAP = {
  start: 'start_scene',
  help: 'help_scene',
  started: 'started_scene',
  completed: 'completed_scene',
  stop: 'stop_scene',
};

export const BUTTONS = {
  start: Markup.button.callback('Начать помидорку 🍅', 'start_timer'),
  startNew: Markup.button.callback('Начать новую помидорку 🍅', 'start_timer'),
  restart: Markup.button.callback('◀ Вернуться в начало', 'restart'),
  stop: Markup.button.callback('Прервать помидорку ⛔', 'stop_timer'),
};
