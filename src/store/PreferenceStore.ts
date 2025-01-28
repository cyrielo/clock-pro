import {runInAction, makeAutoObservable} from 'mobx';
import { Preferences } from '../types';
import { storage } from '../utils/storage';
import { getLocales } from 'react-native-localize';
const _PREFERENCE_KEY = 'PREFERENCE_KEY';

const locale = getLocales();
let defaulLocale = 'en';

if (locale && locale.length){
  defaulLocale = locale[0].languageCode;
}

export default class PreferenceStore {

  preferences: Preferences = {
    theme: this.getPreferences().theme || 'system',
    language: this.getPreferences().language || defaulLocale,
    notificationEnabled: this.getPreferences().notificationEnabled || true,
    notificationSound: this.getPreferences().notificationSound || 'loud_alarm_sound'
  };

  constructor() {
    makeAutoObservable(this);
  }

  setPreferences(preferences: Preferences) {
    runInAction(() => {
      this.preferences = preferences;
      this.preferences = Object.assign(this.preferences, preferences);
    });
    this.savePreference(preferences);
  }

  getPreferences(): Preferences {
    const preferencesStr = storage.getString(_PREFERENCE_KEY);
    const preferenceObj: Preferences =
    (preferencesStr !== undefined) ? JSON.parse(preferencesStr) : {};
    return preferenceObj;
  }

  private savePreference(preferences: Preferences) {
    const preferencesStr = JSON.stringify(preferences);
    storage.set(_PREFERENCE_KEY, preferencesStr);
  }
}