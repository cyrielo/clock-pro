import { NavigationProp, ParamListBase,  } from "@react-navigation/native";
import type { NavigatorScreenParams,  } from '@react-navigation/native';

export interface Alarm {
  id: string;
  title: string;
  time: string;
  active: boolean;
  interval: string[];
}


export type ThemeType = 'system'|'dark'|'light';

export type Timezone = {
  location: string;
  timeZone: string;
  flag: string;
  hoursDiff: number;
  date: Date;
  isDaytime: boolean;
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
