import {runInAction, makeAutoObservable} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Preferences } from '../interfaces/';
export default class PreferenceStore {

  preferences: Preferences = {
    theme: 'system',
    language: 'ch',
    notificationEnabled: true,
    notificationSound: '/path/to/default_sound'
  };
  private _PREFERENCE_KEY = 'PREFERENCE_KEY';

  constructor() {
    makeAutoObservable(this);
    this.loadPreference();
  }

  private async loadPreference() {
    const savedPrefs = await this.getPreferences();
    this.setPreferences(savedPrefs);
  }

  async setPreferences(preferences: Preferences) {
    try {
    runInAction(() => {
      this.preferences = preferences;
      this.preferences = Object.assign(this.preferences, preferences);
    });
    } catch(e) {
    }
    await this.savePreference(preferences);
  }

  async getPreferences(): Promise<Preferences> {
    const preferencesStr = await AsyncStorage.getItem(this._PREFERENCE_KEY) || '';
    const preferenceObj: Preferences = 
    (preferencesStr !== null) ? JSON.parse(preferencesStr) : this.preferences;
    return preferenceObj;
  }

  private async savePreference(preferences: Preferences) {
    const preferencesStr = JSON.stringify(preferences);
    return await AsyncStorage.setItem(this._PREFERENCE_KEY, preferencesStr);
  }

}