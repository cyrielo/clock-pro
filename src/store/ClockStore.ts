import { runInAction, makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { formatInTimeZone } from 'date-fns-tz'
import { Place } from '../types';
import { getAllTimezones, TimezoneName } from 'countries-and-timezones';

export default class ClockStore {
  favorites:Place[] = [];
  localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  private key = '__CLOCK__KEY__';

  constructor() {
    this.allPlaces();
  }

  allPlaces() {
    const allTimezones = getAllTimezones()
    const k = Object.keys(allTimezones).slice(8, 20);

    k.forEach((timeZone, idx) => {
      const name = timeZone as TimezoneName;
      const nameSplit = name.split('/');

      const code = allTimezones[name].countries[0];
      const location = `${nameSplit[nameSplit.length - 1].split('_').join(' ')}, ${code}`;
      const utcOffset = allTimezones[name].utcOffset;
      const dstOffset = allTimezones[name].dstOffset;

      const place:Place = {
        location,
        timeZone,
        code: code.toLowerCase(),
        utcOffset,
        dstOffset,
        flag: `https://flagcdn.com/w320/${code.toLowerCase()}.png`,
        isDayLight: (utcOffset === dstOffset),
      };
      runInAction(() => {
        this.favorites.push(place);
      });
      console.log('place -> ', place);
    });
  }
  addFavorite(place: Partial<Place>) {
    /**
     export type Place = {
      location: string;
      timeZone: string;
      flag: string;
      hoursDiff: number;
      date: Date;
      isDaytime: boolean;
      isDayLight: boolean;
    };
    */
    // const newPlace:Place = {
    //   ...place,
    //   flag: 'https://flagcdn.com/w320/us.png',
    //   date: new Date(),
    // };
    // runInAction(() => {
    //   this.favorites.push(newPlace);
    // });

  }

  fetchFavorites() {

  }

}
