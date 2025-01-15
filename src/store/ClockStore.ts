import { runInAction, makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Place } from '../types';
import { getAllCountries, getAllTimezones, TimezoneName } from 'countries-and-timezones';

export default class ClockStore {
  favorites = {} as Record<string, Place>;
  allPlaces = {} as Record<string, Place>;
  localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  private key = '__CLOCK__KEY__';

  constructor() {
    makeAutoObservable(this);
    this.setFavoritesPlaces();
    this.setAllPlaces();
  }

  async setAllPlaces() {
    const allTimezones = getAllTimezones()
    const countries = getAllCountries();
    const k = Object.keys(allTimezones);
    const places = {} as Record<string, Place>;
    for (let i = 0; i < k.length; i++) {
      const timeZone = k[i] as TimezoneName;
      const nameSplit = timeZone.split('/');
      const code = allTimezones[timeZone].countries[0];
      const location = `${nameSplit[nameSplit.length - 1].split('_').join(' ')}`;
      const utcOffset = allTimezones[timeZone].utcOffset;
      const dstOffset = allTimezones[timeZone].dstOffset;
      const isFave =  Object.hasOwn(this.favorites, location);
      if (!(countries[code])) {continue}
      try {
        const place: Place = {
          location,
          timeZone,
          code,
          utcOffset,
          isFave,
          dstOffset,
          continent: nameSplit[0],
          country: (countries[code]) ? countries[code].name : '',
          flag: `https://flagcdn.com/w320/${code.toLowerCase()}.png`,
          isDayLight: (utcOffset === dstOffset),
        };
        places[location] = place;
      } catch(e) {
        console.error('error happened ->', e);
      }
    }
    runInAction(() => {
      this.allPlaces = Object.assign(this.allPlaces, places);
    });
  }

  async addFavorite(place: Place) {
    runInAction(() => {
      if (!this.favorites[place.location]) {
        this.favorites[place.location] = Object.assign(place, { isFave: true });
      }
    });
    await this.setAllPlaces();
    await AsyncStorage.setItem(this.key, JSON.stringify(this.favorites));
  }

  async removeFavorite(place:Place) {
    runInAction(() => {
      delete this.favorites[place.location];
    });
    await this.setAllPlaces();
    await AsyncStorage.setItem(this.key, JSON.stringify(this.favorites));
  }

  private async getSavedPlaces() :Promise<Record<string, Place>> {
    const favesString = await AsyncStorage.getItem(this.key) || null;
    return (favesString != null) ? JSON.parse(favesString) : this.favorites;
  }

  async setFavoritesPlaces() {
    const faves = await this.getSavedPlaces();
    runInAction(() => {
      this.favorites = faves;
    });
  }
}
