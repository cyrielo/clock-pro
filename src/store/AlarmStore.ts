import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScheduleAlarm, CancelAlarmSchedule } from '../services/NotificationServices';
import { Alarm } from '../types';

export default class AlarmStore {

  alarms: Record<string, Alarm> = {};
  private _ALARM_KEY = 'ALARM_KEY';

  constructor() {
    makeAutoObservable(this);
    this.loadAlarms();
  }

  async loadAlarms() {
    const alarms = await this.getAlarms();
    runInAction(() => {
      this.alarms = alarms;
    });
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
      console.log('created', alarm);
      await ScheduleAlarm(alarm);
      await this.persistAlarm();
    } catch (error) {
      console.log('Error While Saving..', error);
    }

  }

  async updateAlarm(alarm:Alarm) {
    try {
      const oldAlarm = this.alarms[alarm.id];
      await CancelAlarmSchedule(oldAlarm, alarm.id);
      runInAction(() => {
        this.alarms[alarm.id] = Object.assign({}, alarm);;
      });
      console.log('updated', this.alarms[alarm.id]);
      if (alarm.active) {
        await ScheduleAlarm(alarm);
      }
      await this.persistAlarm();
    }catch(error) {
      console.log('Error While updating', error);
    }
  }

  async deleteAlarm(key:string) {
    try {
      const alarm = this.alarms[key];
      await CancelAlarmSchedule(alarm, alarm.id);
      runInAction(() => {
        delete this.alarms[key];
      });
      await this.persistAlarm();
    } catch (error) {
      console.log('Error while deleting', error);
    }
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

