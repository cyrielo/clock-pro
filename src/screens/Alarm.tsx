import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView} from 'react-native';

import Header from '../components/Header';
import AppStyle from '../assets/styles/AppStyle';
import AlarmCard from '../components/AlarmCard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import { AlarmStore, PreferencesStore } from '../store/';
import ManageAlarm from './ManageAlarm';
import { ScreenWithNavigation } from '../types/index';
import { formatTimeString } from '../utils/stringUtils';
import { useTheme } from '@react-navigation/native';
import i18n from '../i18n';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Alarm = observer(({navigation, route} :ScreenWithNavigation) => {
  const alarmKeys = AlarmStore.alarms && Object.keys(AlarmStore.alarms) || [];
  const {} = PreferencesStore.preferences;
  const theme = useTheme();
  return (
    <SafeAreaProvider>
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
          <Header title={i18n.t('alarm')} onAdd={() => {
            navigation.navigate('set_alarm');
          }} />
            {alarmKeys.map((item, index) => {
              const alarm = AlarmStore.alarms && (AlarmStore.alarms[item]) || {};
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate('set_alarm', { prevAlarm: alarm });
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
    </SafeAreaProvider>
  )
});

const AlarmStackNavigator = createNativeStackNavigator();

export const AlarmStackScreen = () => {
  return (
    <AlarmStackNavigator.Navigator>
      <AlarmStackNavigator.Group>
        <AlarmStackNavigator.Screen name="Alarm" options={{ header: () => null }}>
          {(props: any) => <Alarm {...props} />}
        </AlarmStackNavigator.Screen>
      </AlarmStackNavigator.Group>
      <AlarmStackNavigator.Group screenOptions={{ presentation: 'modal' }}>
        <AlarmStackNavigator.Screen options={{title: i18n.t('set_alarm')}} name="set_alarm">
          {(props: any) => <ManageAlarm  {...props} />}
        </AlarmStackNavigator.Screen>
      </AlarmStackNavigator.Group>
    </AlarmStackNavigator.Navigator>
  );
}

export default Alarm;
