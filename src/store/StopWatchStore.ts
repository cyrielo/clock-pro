import {runInAction, makeAutoObservable} from 'mobx';
import { Lap, StopWatchObj } from '../types';
import { storage } from '../utils/storage';

export default class StopwatchStore implements StopWatchObj {

  laps:Lap[] = this.restoreHistory().laps || [];
  timestamp:number = this.restoreHistory().timestamp || 0;
  isPaused:boolean = this.restoreHistory().isPaused || true;

  private STORE_KEY = '_STOPWATCH_KEY__';

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
    storage.set(this.STORE_KEY, objstr);
  }

  private restoreHistory() {
    const objstr = storage.getString(this.STORE_KEY);
    const StopWatchObj: StopWatchObj = (objstr !== undefined) ? JSON.parse(objstr) : {}
    return StopWatchObj;
  }

}
