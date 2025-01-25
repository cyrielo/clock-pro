import React, {  } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView} from 'react-native';

import Header from '../components/Header';
import AppStyle from '../assets/styles/AppStyle';
import AlarmCard from '../components/AlarmCard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import { AlarmStore } from '../store/';
import ManageAlarm from './ManageAlarm';
import { ScreenWithNavigation } from '../types/index';
import { formatTimeString } from '../utils/stringUtils';
import { useTheme } from '@react-navigation/native';

const Alarm = observer(({navigation, route} :ScreenWithNavigation) => {
  const alarmKeys = Object.keys(AlarmStore.alarms);
  const theme = useTheme();
  return (
    <SafeAreaView 
      style={{
        ...AppStyle.container,
        ...theme.colors,
        marginBottom: 0,
        position: 'relative',
        height: '100%'
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: 90,
        }}>
        <Header title='Alarm' onAdd={() => {
            navigation.navigate('Set Alarm');
        }} />
          {alarmKeys.map((item, index) => {
            const alarm = AlarmStore.alarms[item];
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('Set Alarm', { prevAlarm: alarm });
                }}
              >
                <AlarmCard
                  style={{ marginBottom: 20 }}
                  title={alarm.label}
                  time={formatTimeString(new Date(alarm.timestamp))}
                  active={alarm.active}
                  weekdays={alarm.weekdays}
                  shouldRepeat={alarm.shouldRepeat}
                  shouldVibrate={alarm.shouldVibrate}
                  onActiveToggle={(val: boolean) => {
                    AlarmStore.updateAlarm(Object.assign({}, alarm, { active: val }));
                  }}
                />
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  )
});

const AlarmStackNavigator = createNativeStackNavigator();

export const AlarmStackScreen = () => {
  return (
    <AlarmStackNavigator.Navigator>
      <AlarmStackNavigator.Screen name="Alarm" options={{ header: () => null }}>
        {(props: any) => <Alarm  {...props} />}
      </AlarmStackNavigator.Screen>
      <AlarmStackNavigator.Group screenOptions={{ presentation: 'modal' }}>
        <AlarmStackNavigator.Screen name="Set Alarm">
          {(props: any) => <ManageAlarm {...props} />}
        </AlarmStackNavigator.Screen>
      </AlarmStackNavigator.Group>
    </AlarmStackNavigator.Navigator>
  );
}

export default Alarm;
