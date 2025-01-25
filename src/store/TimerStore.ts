import { runInAction, makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Timer } from "../types";
import { CancelTimerNotification, GetTriggerNotificationIds, DisplayNotification, ScheduleTimer } from "../services/NotificationServices";

export default class TimerStore {
  timer = {} as Record<string, Timer>
  timerModalVisibility = false;
  activeColumnKey = '';
  private key = '__TIMER_STORE_';

  constructor() {
    makeAutoObservable(this);
    this.setTimer();
  }

  async updateTimer(activeColumnKey:string, timer:Timer) {
    runInAction(() => {
      this.timer[activeColumnKey] = Object.assign(this.timer[activeColumnKey], { ...timer });
    });
    await this.persistTimer();
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
    await this.persistTimer();
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
      await this.persistTimer();
    } catch (error) {
      console.error('failed to delete ->', error);
    }

  }

  async persistTimer() {
    await AsyncStorage.setItem(this.key, JSON.stringify(this.timer));
  }

  private async fetchTimer() {
    const timerStr = await AsyncStorage.getItem(this.key) || null;
    return (timerStr != null) ? JSON.parse(timerStr) : this.timer;
  }

  async setTimer() {
    const timer = await this.fetchTimer();
    runInAction(() => {
      this.timer = Object.assign(this.timer, timer);
    });
  }
}
