import {runInAction, makeAutoObservable} from 'mobx';
import { Lap, StopWatchObj } from '../types';
import { storage } from '../utils/storage';

const STORE_KEY = '_STOPWATCH_KEY__';

export default class StopwatchStore implements StopWatchObj {

  laps:Lap[] = this.restoreHistory().laps || [];
  timestamp:number = this.restoreHistory().timestamp || 0;
  isPaused:boolean = this.restoreHistory().isPaused || true;

  constructor() {
    makeAutoObservable(this);
  }

  setStopWatch(stopWatchObj:StopWatchObj) {
    runInAction(() => {
      this.laps = stopWatchObj.laps;
      this.timestamp = stopWatchObj.timestamp;
      this.isPaused = stopWatchObj.isPaused;
    });
    this.saveStopWatchObj();
  }

  reset() {
    runInAction(() => {
      this.laps = [];
      this.timestamp = 0;
      this.isPaused = true;
    })
    this.saveStopWatchObj();
  }


  private saveStopWatchObj() {
    const objstr = JSON.stringify({
      laps: this.laps,
      timestamp: this.timestamp,
      isPaused: this.isPaused
    });
    storage.set(STORE_KEY, objstr);
  }

  private restoreHistory() {
    const objstr = storage.getString(STORE_KEY);
    const StopWatchObj: StopWatchObj = (objstr !== undefined) ? JSON.parse(objstr) : {}
    return StopWatchObj;
  }

}
