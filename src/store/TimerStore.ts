import { runInAction, makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Timer } from "../types";

export default class TimerStore {
  timer = {} as Record<string, Timer>
  timerModalVisibility = false;
  activeColumnKey = '';
  private key = '__TIMER_STORE_';

  constructor() {
    makeAutoObservable(this);
    this.setTimer();
  }

  async toggleTimer(activeColumnKey:string) {
    runInAction(() => {
      const timer = this.timer[activeColumnKey];
      timer.isPaused = !timer.isPaused;
      this.timer[activeColumnKey] = timer;
    });
    await this.persistTimer();
  }

  async addTimer(activeColumnKey: string, timer: Timer) {
    runInAction(() => {
      this.timer[activeColumnKey] = timer;
    });
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

  setActiveColumn(activeColumnKey:string) {
    runInAction(() => {
      this.activeColumnKey = activeColumnKey;
    });
  }

  async deleteTimer(index:string) {
    runInAction(() => {
      delete this.timer[index];
    });
    await this.persistTimer();
  }

  async persistTimer() {
    await AsyncStorage.setItem(this.key, JSON.stringify(this.timer));
  }

  private async fetchTimer() {
    const timerStr = await AsyncStorage.getItem(this.key) || null;
    return (timerStr != null) ? JSON.parse(timerStr) : this.timer;
  }

  private async clearTimer () {
    await AsyncStorage.removeItem(this.key);
  }

  async setTimer() {
    const timer = await this.fetchTimer();
    runInAction(() => {
      this.timer = Object.assign(this.timer, timer);
    });
  }

}
