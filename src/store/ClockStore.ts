import { runInAction, makeAutoObservable } from 'mobx';
import { Place } from '../types';
import { getAllCountries, getAllTimezones, TimezoneName } from 'countries-and-timezones';
import { storage } from '../utils/storage';

const __CLOCK__KEY__ = '__CLOCK__KEY__';
export default class ClockStore {
  allPlaces: Record<string, Place> = this.getAllPlaces() || {};
  favorites: Record<string, Place> = this.getSavedPlaces() || {};
  localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  constructor() {
    makeAutoObservable(this);
  }

  private getAllPlaces(): Record<string, Place> {
    const allTimezones = getAllTimezones()
    const countries = getAllCountries();
    const keys = allTimezones && Object.keys(allTimezones) || [];
    const places = {} as Record<string, Place>;
    for (let i = 0; i < keys.length; i++) {
      const timeZone = keys[i] as TimezoneName;
      const nameSplit = timeZone.split('/');
      const code = allTimezones[timeZone].countries[0];
      const location = `${nameSplit[nameSplit.length - 1].split('_').join(' ')}`;
      const utcOffset = allTimezones[timeZone].utcOffset;
      const dstOffset = allTimezones[timeZone].dstOffset;
      const isFave = this.favorites ? Object.hasOwn(this.favorites, location) : false;
      if (!(countries[code])) { continue }
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
      } catch (e) {
        console.error('error happened ->', e);
      }
    }
    return places;
  }

  setAllPlaces() {
    runInAction(() => {
      this.allPlaces = Object.assign(this.allPlaces, this.getAllPlaces());
    });
  }

  addFavorite(place: Place) {
    runInAction(() => {
      if (!this.favorites[place.location]) {
        this.favorites[place.location] = Object.assign(place, { isFave: true });
      }
    });
    this.setAllPlaces();
    this.persistFavorites();
  }

  removeFavorite(place:Place) {
    runInAction(() => {
      delete this.favorites[place.location];
    });
    this.setAllPlaces();
    this.persistFavorites();
  }

  private persistFavorites() {
    const objstr = JSON.stringify(this.favorites);
    storage.set(__CLOCK__KEY__, objstr);
  }
  private getSavedPlaces(): Record<string, Place>{
    const favesString = storage.getString(__CLOCK__KEY__);
    return (favesString !== undefined) ? JSON.parse(favesString) : this.favorites;
  }
}
