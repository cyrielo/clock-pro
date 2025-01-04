import { makeObservable, observable, action, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alarm } from '../interfaces';

export default class AlarmStore {

  alarms:Alarm[] = [];

  constructor() {
    makeObservable(this, {
      alarms: observable,
      createAlarm: action,
      deleteAlarm: action,
      updateAlarm: action
    });
  }
  private _ALARM_KEY = 'ALARM_KEY';

  async createAlarm(alarm: Alarm) {
    const allAlarms = await this.getAlarms();
    allAlarms.push(alarm);
    this.setAlarms(allAlarms);
    this.save(allAlarms);
  }

  setAlarms(alarms: Alarm[]) {
    runInAction(() => {
      this.alarms = alarms;
    })
  }

  async updateAlarm(alarm:Alarm) {
    const allAlarms = await this.getAlarms();
    for (let idx = 0; idx < allAlarms.length; idx++) {
      if (allAlarms[idx].id === alarm.id) {
        allAlarms[idx] = { ...alarm };
        break;
      }
    }
    this.setAlarms(allAlarms);
    this.save(allAlarms);
  }

  async deleteAlarm(alarm: Alarm) {
    const allAlarms = await this.getAlarms();
    for (let idx = 0; idx < allAlarms.length; idx++) {
      if (allAlarms[idx].id === alarm.id) {
        allAlarms.splice(idx, 1);
        break;
      }
    }
    this.setAlarms(allAlarms);
    this.save(allAlarms);
  }

  async save(alarms : Alarm[]) {
    const alarmObjsStr = JSON.stringify(alarms);
    return await AsyncStorage.setItem(this._ALARM_KEY, alarmObjsStr);
  }

  async getAlarms() : Promise<Alarm[]> {
    const allAlarms = await AsyncStorage.getItem(this._ALARM_KEY);
    return (allAlarms !== null) ? JSON.parse(allAlarms) as Alarm[] : [];
  }
};

