import { runInAction, makeAutoObservable } from "mobx";
import { Timer } from "../types";
import { CancelTimerNotification, GetTriggerNotificationIds, DisplayNotification, ScheduleTimer } from "../services/NotificationServices";
import { storage } from "../utils/storage";

  const __TIMER_STORE_ = '__TIMER_STORE_';

export default class TimerStore {
  timer:Record<string, Timer> = this.fetchTimer() || {};
  timerModalVisibility = false;
  activeColumnKey = '';

  constructor() {
    makeAutoObservable(this);
  }

  async updateTimer(activeColumnKey:string, timer:Timer) {
    runInAction(() => {
      const oldTimer = this.timer[activeColumnKey] || {};
      this.timer[activeColumnKey] = Object.assign(oldTimer, { ...timer });
    });
    this.persistTimer();
    // handle notification triggers
    if (timer.isPaused && !timer.isComplete) {
      await CancelTimerNotification(timer.id);
    }

    if(!timer.isPaused && !timer.isComplete) {
      const notificationsIds = await GetTriggerNotificationIds();
      const diff = timer.duration - timer.elapsedTime;
      const timestamp = Date.now() + diff;
      if (!notificationsIds.includes(timer.id)) {
        await ScheduleTimer(timer, timestamp);
        return;
      }
    }
  }

  async addTimer(activeColumnKey: string, timer: Timer) {
    const timestamp = Date.now() + timer.duration;
    runInAction(() => {
      this.timer[activeColumnKey] = timer;
    });
    await ScheduleTimer(timer, timestamp);
    this.persistTimer();
  }

  toggleTimerModalVisibility(activeColumnKey?:string) {
    runInAction(() => {
      this.timerModalVisibility = !this.timerModalVisibility;
      if (activeColumnKey) {
        this.activeColumnKey = activeColumnKey;
      }
    });
  }

  setActiveColumnKey(activeColumnKey:string) {
    runInAction(() => {
      this.activeColumnKey = activeColumnKey;
    });
  }

  async deleteTimer(activeColumnKey:string) {
    try {
      await CancelTimerNotification(this.timer[activeColumnKey].id);
      runInAction(() => {
        delete this.timer[activeColumnKey];
      });
      this.persistTimer();
    } catch (error) {
      console.error('failed to delete ->', error);
    }

  }

  persistTimer() {
    storage.set(__TIMER_STORE_, JSON.stringify(this.timer))
  }

  private fetchTimer() {
    const timerStr = storage.getString(__TIMER_STORE_);
    return (timerStr !== undefined) ? JSON.parse(timerStr) : this.timer;
  }
}
