import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppStyle from '../assets/styles/AppStyle';

import AlarmCard from '../components/AlarmCard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Alarm = () => {
  return (
    <ScrollView
      style={{
        ...AppStyle.container,
        marginBottom: 0,
        position: 'relative',
      }}
      showsVerticalScrollIndicator={false}>
      <Header title='Alarm' />
      <View style={{ ...AppStyle.bottomPadding }}>
        <AlarmCard
          title='Alarm 1'
          time= '2:45 AM'
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

    </ScrollView>
  )
}

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
