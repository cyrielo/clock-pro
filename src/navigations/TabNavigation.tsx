import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AboutStackScreen } from '../screens/About';
import { PreferenceStackScreen } from '../screens/Preferences';
import {CreateReflectionStackScreen} from '../screens/CreateReflection';
import { AlarmStackScreen } from '../screens/Alarm';
import { SuggestionsStackScreen } from '../screens/Suggestions';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
            return <MaterialCommunityIcon name='alarm' style={activeIconStyle} color={color} size={size} />;
          } else if (route.name === 'timer') {
            return <MaterialCommunityIcon name='pencil-outline' style={activeIconStyle} color={color} size={size} />;
          } else if (route.name === 'clock') {
            return <MaterialCommunityIcon name='cog-outline' style={activeIconStyle} color={color} size={size} />;
          } else if (route.name === 'stopwatch') {
            return <MaterialCommunityIcon name='brain' style={activeIconStyle} color={color} size={size} />;
          } else if (route.name === 'pref') {
            return <MaterialCommunityIcon name='information-variant' style={activeIconStyle} color={color} size={size} />
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
      <Tab.Screen name='timer' component={SuggestionsStackScreen} options={{ tabBarBadge: 1, ...screenConfig }} />
      <Tab.Screen name='clock' component={CreateReflectionStackScreen} options={{ ...screenConfig }}  />
      <Tab.Screen name='stopwatch' component={PreferenceStackScreen} options={{ ...screenConfig }} />
      <Tab.Screen name='pref' component={AboutStackScreen} options={{ ...screenConfig }} />
    </Tab.Navigator>
  );
});
