import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  SafeAreaView,
  Alert,
  Modal,
  Pressable
} from 'react-native';

import Header from '../components/Header';
import AppStyle from '../assets/styles/AppStyle';
import DateTimePicker from '@react-native-community/datetimepicker';
import AlarmCard from '../components/AlarmCard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import { AlarmStore } from '../store/';
import ManageAlarm from './ManageAlarm';
import { Alarm as AlarmType, ScreenWithNavigation } from '../types/index';


const Alarm = observer(({navigation} :ScreenWithNavigation) => {
  //const sheetRef = useRef(null);
  const alarms = AlarmStore.alarms;

  return (
    <>
    <SafeAreaView 
      style={{
        ...AppStyle.container,
        marginBottom: 0,
        position: 'relative',
        minHeight: '100%'
      }}>
      <Header title='Alarm' onAdd={() => {
          navigation.navigate('Set Alarm');
      }} />
      <View style={{ ...AppStyle.bottomPadding }}>
          {alarms.map((alarm: AlarmType, index) => {
          return (
            <AlarmCard
              key={index}
              title={alarm.title}
              time='2:45 AM'
              active={alarm.active}
              style={{ marginBottom: 20 }}
              weekdays={alarm.weekdays}
              shouldRepeat={alarm.shouldRepeat}
              shouldVibrate={ alarm.shouldVibrate }
            />
          );
        }) }
        <AlarmCard
          shouldRepeat={false}
          title='Work'
          time='8:45 AM'
          active={true}
          style={{ marginBottom: 20 }}
          weekdays={['weekdays']}
          shouldVibrate={true}
        />
      </View>
    </SafeAreaView >
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
