import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TimerStackScreen } from '../screens/Timer';
import { PreferenceStackScreen } from '../screens/Preferences';
import { StopWatchStackScreen } from '../screens/StopWatch';
import { AlarmStackScreen } from '../screens/Alarm';
import { ClockStackScreen } from '../screens/Clock';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../constants/colors';
import { Platform, View, ViewStyle } from 'react-native';
export const screenConfig = { header: () => null };

const os = Platform.OS;

const Tab = createBottomTabNavigator();

export default (() => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          size = 32;
          let activeIconStyle: ViewStyle = {
            height: 60,
            width: 60,
            borderRadius: 50,
            margin: 'auto',
            justifyContent: 'center',
            alignItems: 'center'
          };
          if (focused) {
            activeIconStyle = {
              ...activeIconStyle,
              backgroundColor: '#171717',
            };
          }
          if (route.name === 'alarm') {
            return (
              <View style={activeIconStyle}>
                <Ionicons name='alarm'  color={color} size={size} />
              </View>
            );
          } else if (route.name === 'timer') {
            return (
              <View style={activeIconStyle}>
                <Ionicons name='timer' color={color} size={size} />
              </View>
            );
          } else if (route.name === 'clock') {
            return (
              <View style={activeIconStyle}>
                <Ionicons name='time' color={color} size={size} />
              </View>
            );
          } else if (route.name === 'stopwatch') {
            return (
              <View style={activeIconStyle}>
                <Ionicons name='stopwatch' color={color} size={size} />
              </View>
            );
          } else if (route.name === 'pref') {
            return (
              <View style={activeIconStyle}>
                <Ionicons name='cog' color={color} size={size} />
              </View>
            );
          }
        },
        tabBarShowLabel: false,
        tabBarIconStyle: {
          top: (os === 'ios') ? 10 : 0,
        },
        tabBarStyle: {
          bottom: 20,
          marginVertical:'auto',
          marginHorizontal: 20,
          borderRadius: 50,
          height: 80,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLORS.Light_Purple,
        tabBarInactiveTintColor: COLORS.Dark_Grey,
      })}
      >
      <Tab.Screen name='alarm' component={AlarmStackScreen} options={{ ...screenConfig }} />
      <Tab.Screen name='timer' component={TimerStackScreen} options={{ ...screenConfig }} />
      <Tab.Screen name='clock' component={ClockStackScreen} options={{ ...screenConfig }}  />
      <Tab.Screen name='stopwatch' component={StopWatchStackScreen} options={{ ...screenConfig }} />
      <Tab.Screen name='pref' component={PreferenceStackScreen} options={{ ...screenConfig }} />
    </Tab.Navigator>
  );
});
