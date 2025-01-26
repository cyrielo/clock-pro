import { makeAutoObservable, runInAction } from 'mobx';
import { storage } from '../utils/storage';
import { ScheduleAlarm, CancelAlarmSchedule } from '../services/NotificationServices';
import { Alarm } from '../types';

export default class AlarmStore {

  alarms: Record<string, Alarm> = this.getAlarms();
  private _ALARM_KEY = 'ALARM_KEY';

  constructor() {
    makeAutoObservable(this);
  }

  async createAlarm(alarm: Alarm) {
    try {
      if (this.alarms[alarm.id]) {
        this.updateAlarm(alarm);
        return;
      }
      runInAction(() => {
        this.alarms[alarm.id] = alarm;
      });
      await ScheduleAlarm(alarm);
      this.persistAlarm();
    } catch (error) {
      console.error('Error While Saving..', error);
    }

  }

  async updateAlarm(alarm:Alarm) {
    try {
      const oldAlarm = this.alarms[alarm.id];
      await CancelAlarmSchedule(oldAlarm, alarm.id);
      runInAction(() => {
        this.alarms[alarm.id] = Object.assign({}, alarm);;
      });
      if (alarm.active) {
        await ScheduleAlarm(alarm);
      }
      this.persistAlarm();
    }catch(error) {
      console.error('Error While updating', error);
    }
  }

  async deleteAlarm(key:string) {
    try {
      const alarm = this.alarms[key];
      await CancelAlarmSchedule(alarm, alarm.id);
      runInAction(() => {
        delete this.alarms[key];
      });
      this.persistAlarm();
    } catch (error) {
      console.error('Error while deleting', error);
    }
  }

  persistAlarm() {
    const alarmObjsStr = JSON.stringify(this.alarms);
    storage.set(this._ALARM_KEY, alarmObjsStr);
  }

  getAlarms(): Record<string, Alarm>{
    const allAlarms = storage.getString(this._ALARM_KEY);
    return (allAlarms !== undefined) ? JSON.parse(allAlarms) : {};
  }
};

