import alarmStore from './AlarmStore';
import preferenceStore from './PreferenceStore';
import stopWatchStore from './StopWatchStore';
import clockStore from './ClockStore';
export const AlarmStore = new alarmStore();
export const PreferencesStore = new preferenceStore();
export const StopWatchStore = new stopWatchStore();
export const ClockStore = new clockStore();
