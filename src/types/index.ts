import { TimestampTrigger } from "@notifee/react-native";
import { NavigationProp, ParamListBase,  } from "@react-navigation/native";
import type { NavigatorScreenParams,  } from '@react-navigation/native';

export type Alarm = {
  id:string;
  label: string;
  timestamp: number;
  active: boolean;
  shouldVibrate: boolean;
  shouldRepeat: boolean;
  sound:string;
  shouldSnooze:boolean;
  weekdays: Weekdays[];
}

export type Notification = {
  id:string;
  sound: string;
  title:string;
  description:string;
  color:string;
};

export type TriggerPayload = {
  channelId?:string;
  trigger: TimestampTrigger,
  notifciation: Notification,
  data?:any;
}

export type ThemeType = 'system'|'dark'|'light';
export type Weekdays = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

export type Timer = {
  id:string;
  isComplete:boolean;
  isPaused:boolean;
  elapsedTime:number;
  label:string;
  sound:string;
  color:string;
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
