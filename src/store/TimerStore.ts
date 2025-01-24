import { runInAction, makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Timer } from "../types";
import { cancelNotificationSchedule,  getTriggerNotificationIds, scheduleTimer } from "../services/NotificationServices";

export default class TimerStore {
  timer = {} as Record<string, Timer>
  timerModalVisibility = false;
  activeColumnKey = '';
  private key = '__TIMER_STORE_';

  constructor() {
    makeAutoObservable(this);
    this.setTimer();
  }

  async updateTimer(activeColumnKey:string, timer:Timer, initiator?:string) {
    runInAction(() => {
      this.timer[activeColumnKey] = Object.assign(this.timer[activeColumnKey], { ...timer });
    });
    // handle notification triggers
    if (timer.isPaused && !timer.isComplete) {
      await cancelNotificationSchedule(timer.id);
    }
    if (!timer.isPaused) {
      const notificationsIds = await getTriggerNotificationIds();
      const diff = timer.duration - timer.elapsedTime;
      const timestamp = Date.now() + diff;
      if (notificationsIds.includes(timer.id)) {
        if (timer.elapsedTime > 0) {
          await cancelNotificationSchedule(timer.id);
          await scheduleTimer(timer, timestamp);
        }
        await this.persistTimer();
        return;
      }
      if (!timer.isComplete) {
        await this.persistTimer();
        await scheduleTimer(timer, timestamp);
      }
    }
  }

  async addTimer(activeColumnKey: string, timer: Timer) {
    const timestamp = Date.now() + timer.duration;
    runInAction(() => {
      this.timer[activeColumnKey] = timer;
    });
    await scheduleTimer(timer, timestamp);
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
      await cancelNotificationSchedule(this.timer[activeColumnKey].id);
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
