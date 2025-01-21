import React, { useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';

import Header from '../components/Header';
import AppStyle from '../assets/styles/AppStyle';
import AlarmCard from '../components/AlarmCard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import { AlarmStore } from '../store/';
import ManageAlarm from './ManageAlarm';
import { Alarm as AlarmType, ScreenWithNavigation } from '../types/index';
import { formatTimeString } from '../utils/stringUtils';


const Alarm = observer(({navigation} :ScreenWithNavigation) => {
  const alarms = Object.keys(AlarmStore.alarms);

  return (
    <>
    <SafeAreaView 
      style={{
        ...AppStyle.container,
        marginBottom: 0,
        position: 'relative',
        height: '100%'
      }}>
      <Header title='Alarm' onAdd={() => {
          navigation.navigate('Set Alarm');
      }} />
      <FlatList
        style={{
          marginBottom: 90,
         }}
        showsVerticalScrollIndicator={false}
        data={alarms}
        renderItem={({item, index}) => {
          const alarm = AlarmStore.alarms[item];
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('Set Alarm', { prevAlarm: alarm, prevAlarmIndex: item });
              }}
            >
              <AlarmCard
                title={alarm.label}
                time={formatTimeString(new Date(alarm.timestamp))}
                active={alarm.active}
                style={{ marginBottom: 20 }}
                weekdays={alarm.weekdays}
                shouldRepeat={alarm.shouldRepeat}
                shouldVibrate={alarm.shouldVibrate}
                onActiveToggle={(val: boolean) => { AlarmStore.updateAlarm(item, { active: val }) }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
    </>
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
