import { runInAction, makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Timer } from "../types";
export default class TimerStore {
  timer = {} as Record<string, Timer>
  private key = '__TIMER_STORE_';

  constructor() {
    makeAutoObservable(this);
    this.setTimer();
  }

  async toggleTimer(index:string) {
    runInAction(() => {
      const timer = this.timer[index];
      timer.isPaused = !timer.isPaused;
      this.timer[index] = timer;
    });
    await this.persistTimer();
  }

  async addTimer(index: string, timer: Timer) {
    runInAction(() => {
      this.timer[index] = timer;
    });
    await this.persistTimer();
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

  async setTimer() {
    const timer = await this.fetchTimer();
    runInAction(() => {
      this.timer = Object.assign(this.timer, timer);
    });
  }

}
