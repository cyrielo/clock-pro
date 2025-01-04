import { NavigationProp, ParamListBase,  } from "@react-navigation/native";
import type { NavigatorScreenParams,  } from '@react-navigation/native';

export interface Alarm {
  id: string;
  title: string;
  time: string;
  active: boolean;
  interval: string[];
}

export interface ScreenWithNavigation {
  navigation: NavigationProp<ParamListBase>;
  route: NavigatorScreenParams<any>;
}
