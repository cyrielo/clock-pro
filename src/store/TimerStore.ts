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

  async updateTimer(activeColumnKey:string, timer:Timer) {
    runInAction(() => {
      this.timer[activeColumnKey] = Object.assign(this.timer[activeColumnKey], { ...timer });
    });
    await this.persistTimer();
  }

  isTimerPaused(activeColumnKey: string) :boolean|undefined {
    const timer = this.timer[activeColumnKey];
    return (timer) ? timer.isPaused : undefined;
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

  setActiveColumnKey(activeColumnKey:string) {
    runInAction(() => {
      this.activeColumnKey = activeColumnKey;
    });
  }

  async deleteTimer(activeColumnKey:string) {
    runInAction(() => {
      delete this.timer[activeColumnKey];
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

  async setTimer() {
    const timer = await this.fetchTimer();
    runInAction(() => {
      this.timer = Object.assign(this.timer, timer);
    });
  }
}
