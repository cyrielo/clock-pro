import { makeAutoObservable, observable, action, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alarm } from '../types';
import { formatTimeString } from '../utils/stringUtils';

export default class AlarmStore {

  alarms: Record<string, Alarm> = {};

  constructor() {
    makeAutoObservable(this);
    this.loadAlarms();
  }
  private _ALARM_KEY = 'ALARM_KEY';
  async loadAlarms() {
    const alarms = await this.getAlarms();
    runInAction(() => {
      this.alarms = alarms;
    });
  }
  async createAlarm(alarm: Alarm, prevKey?:string) {
    if (prevKey) {
      this.updateAlarm(prevKey, alarm);
      return;
    }
    const key = this.generateAlarmKey(alarm);
    runInAction(() => {
      this.alarms[key] = alarm;
    });
    this.persistAlarm();
  }

  async updateAlarm(key:string, updatePartial:Partial<Alarm>) {
    runInAction(() => {
      const currentAlarm = this.alarms[key];
      const update = Object.assign(currentAlarm, updatePartial);
      this.alarms[key] = update;
    });
    this.persistAlarm();
  }

  async deleteAlarm(key:string) {
    runInAction(() => {
      delete this.alarms[key];
    });
    this.persistAlarm();
  }

  generateAlarmKey(a:Alarm):string {
    const daysLen = a.weekdays.length;
    const timestring = formatTimeString(new Date(a.timestamp));
    return `${timestring}_${daysLen}`;
  }

  async persistAlarm() {
    const alarmObjsStr = JSON.stringify(this.alarms);
    return await AsyncStorage.setItem(this._ALARM_KEY, alarmObjsStr);
  }

  async getAlarms() : Promise<Record<string, Alarm>> {
    const allAlarms = await AsyncStorage.getItem(this._ALARM_KEY);
    return (allAlarms !== null) ? JSON.parse(allAlarms) : {};
  }
};

