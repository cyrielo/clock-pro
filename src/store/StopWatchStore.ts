import {runInAction, makeAutoObservable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lap, StopWatchObj, TimeStamp } from '../types';

export default class StopwatchStore implements StopWatchObj {

  laps:Lap[] = [];
  timestamp = 0;
  isPaused = true;

  private STORE_KEY = '_STOPWATCH_KEY__';

  constructor() {
    makeAutoObservable(this);
    this.restoreHistory();
  }



  async setStopWatch(stopWatchObj:StopWatchObj) {
    Object.assign(this, stopWatchObj);
  }

  setTimestamp(timeStamp:number) {
    runInAction(() => this.timestamp = timeStamp);
  }

  async reset() {
    runInAction(() => {
      this.laps = [];
      this.timestamp = 0;
      this.isPaused = true;
      this.saveStopWatchObj();
    })

  }

  private async getStopWatchObj(): Promise<StopWatchObj> {
    const dataStr = await AsyncStorage.getItem(this.STORE_KEY) || '';
    return (dataStr !== 'null') ? JSON.parse(dataStr) : null
  }

  private async saveStopWatchObj() {
    const obj = Object.keys(this).reduce((newObj, k) => {
      const key = k as keyof this;
      if (typeof this[key] !== 'function') { newObj[key] = this[key] }
      return newObj;
    }, {} as this);
    await AsyncStorage.setItem(this.STORE_KEY, JSON.stringify(obj));
  }

  private async restoreHistory() {
    const StopWatchObj: StopWatchObj = await this.getStopWatchObj();
    if (StopWatchObj) {
      runInAction(() => {
        this.timestamp = StopWatchObj.timestamp;
        this.isPaused = StopWatchObj.isPaused;
        this.laps = StopWatchObj.laps;
      });
    }
  }

  async pause(timestamp:number, cb?: Function) {
    runInAction(() => {
      this.timestamp = timestamp;
      if (typeof cb == 'function') {
        cb(timestamp);
      }
    });
    this.saveStopWatchObj();
  }

}
