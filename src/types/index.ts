import { NavigationProp, ParamListBase,  } from "@react-navigation/native";
import type { NavigatorScreenParams,  } from '@react-navigation/native';

export type Alarm = {
  label: string;
  timestamp: number;
  active: boolean;
  shouldVibrate: boolean;
  shouldRepeat: boolean;
  sound:string;
  shouldSnooze:boolean;
  weekdays: Weekdays[];
}


export type ThemeType = 'system'|'dark'|'light';
export type Weekdays = 'sunday' | 'monday' | 'tuesday' | 'wednessday' | 'thursday' | 'friday' | 'saturday';

export type Timer = {
  isPaused:boolean;
  label:string;
  sound:string;
  color:string;
  reset: boolean;
  duration:number;
};
export type Place = {
  location: string;
  timeZone: string;
  flag: string;
  hoursDiff?: number;
  code: string;
  country: string;
  continent:string;
  isFave?: boolean;
  utcOffset: number;
  dstOffset: number;
  isDaytime?: boolean;
  isDayLight: boolean;
};

export type Lap = {
  lapTime: number;
  overallTime: number;
};

export interface StopWatchObj {
  laps: Lap[];
  timestamp: number;
  isPaused: boolean;
}

export interface TimeStamp {
  hours:number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export interface DropdownOption {
  label: string,
  value: any
}
export interface Preferences {
  theme: ThemeType,
  notificationEnabled: boolean,
  language: string,
  notificationSound: string
};

export interface ScreenWithNavigation {
  navigation: NavigationProp<ParamListBase>;
  route: NavigatorScreenParams<any>;
}
