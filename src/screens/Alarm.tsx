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
import { ScreenWithNavigation } from '../interfaces/index';


const Alarm = observer(({navigation} :ScreenWithNavigation) => {
  //const sheetRef = useRef(null);

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
          navigation.navigate('ManageAlarm');
      }} />
      <View style={{ ...AppStyle.bottomPadding }}>
        <AlarmCard
          title='Alarm 1'
          time='2:45 AM'
          active={true}
          style={{ marginBottom: 20 }}
          interval={['Fridays']}
          shouldVibrate={true}
        />
        <AlarmCard
          title='Work'
          time='8:45 AM'
          active={true}
          style={{ marginBottom: 20 }}
          interval={['weekdays']}
          shouldVibrate={true}
        />
      </View>
    </SafeAreaView >
    </>
  )
});

const ReflectionsStackNavigator = createNativeStackNavigator();

export const AlarmStackScreen = () => {
  return (
    <ReflectionsStackNavigator.Navigator>
      <ReflectionsStackNavigator.Screen name="Alarm" options={{ header: () => null }}>
        {(props: any) => <Alarm  {...props} />}
      </ReflectionsStackNavigator.Screen>
    </ReflectionsStackNavigator.Navigator>
  );
}

export default Alarm;
