import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TimerStackScreen } from '../screens/Timer';
import { PreferenceStackScreen } from '../screens/Preferences';
import { StopWatchStackScreen } from '../screens/StopWatch';
import { AlarmStackScreen } from '../screens/Alarm';
import { ClockStackScreen } from '../screens/Clock';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const screenConfig = { header: () => null };

const Tab = createBottomTabNavigator();

export default (() => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          size = 32;
          let activeIconStyle = {};
          if (focused) {
            activeIconStyle = { 
              ...activeIconStyle,
              backgroundColor: '#171717',
              padding: 15,
              borderRadius: 150,
              position: 'relative',
            };
          }
          if (route.name === 'alarm') {
            return <Ionicons name='alarm' style={activeIconStyle} color={color} size={size} />;
          } else if (route.name === 'timer') {
            return <Ionicons name='timer' style={activeIconStyle} color={color} size={size} />;
          } else if (route.name === 'clock') {
            return <Ionicons name='time' style={activeIconStyle} color={color} size={size} />;
          } else if (route.name === 'stopwatch') {
            return <Ionicons name='stopwatch' style={activeIconStyle} color={color} size={size} />;
          } else if (route.name === 'pref') {
            return <Ionicons name='cog' style={activeIconStyle} color={color} size={size} />
          }
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          marginHorizontal: 20,
          paddingHorizontal: 10,
          borderRadius: 40,
          height: 80,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#bda5e0',
        tabBarInactiveTintColor: 'grey',
      })}
      >
      <Tab.Screen name='alarm' component={AlarmStackScreen} options={{ ...screenConfig }} />
      <Tab.Screen name='timer' component={TimerStackScreen} options={{ tabBarBadge: 1, ...screenConfig }} />
      <Tab.Screen name='clock' component={ClockStackScreen} options={{ ...screenConfig }}  />
      <Tab.Screen name='stopwatch' component={StopWatchStackScreen} options={{ ...screenConfig }} />
      <Tab.Screen name='pref' component={PreferenceStackScreen} options={{ ...screenConfig }} />
    </Tab.Navigator>
  );
});
