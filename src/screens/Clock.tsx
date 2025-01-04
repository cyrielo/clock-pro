import React, { PropsWithChildren } from 'react';
import { format } from 'date-fns';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import {COLORS} from '../constants/colors';
import Header from '../components/Header';
import AppStyle from '../assets/styles/AppStyle';
import Separator from '../components/Seperator';
import { Image } from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons';

type Timezone = {
  location: string;
  flag: string;
  hoursDiff: number;
  currentTime: string;
  isDaytime: boolean
};

const FavoriteTimeZones:Timezone[] = [{
    location: 'San Francisco, CA',
    flag: 'https://flagcdn.com/w320/us.png',
    hoursDiff: -8,
    currentTime:'2:14',
    isDaytime: true
}, {
    location: 'Lagos, NG',
    flag: 'https://flagcdn.com/w320/ng.png',
    hoursDiff: -8,
    currentTime: '10:32',
    isDaytime: false
  },
];



interface DateTimeProps extends PropsWithChildren {
  date: Date;
}

const ClockStyle = StyleSheet.create({
  digitalClockContainer: {
    marginTop: 15,
    marginHorizontal: 'auto',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dateStr: {
    fontSize: 18,
    marginBottom: 10
  },
  digitalClock: {
    fontSize: 24,
    marginRight: 10,
    marginBottom: 10,
  },
  muted: {
    color: COLORS.Grey,
    fontSize: 14,
    marginHorizontal: 'auto'
  }
});

const DateTime = ({date} : DateTimeProps) =>{
  const dateStr = `${format(new Date(), 'EEEE, MMMM dd')}`;
  const hour = `${date.getHours()}`;
  const min = `${date.getUTCMinutes()}`;// format hour and min
  return (
    <View>
      <View style={ClockStyle.digitalClockContainer}>
        <Text style={ClockStyle.dateStr}>{dateStr}</Text>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
          }}>
          <Text style={ClockStyle.digitalClock}>{hour}</Text>
          <Separator style={ClockStyle.digitalClock} />
          <Text style={ClockStyle.digitalClock}>{min}</Text>
        </View>
        <Text style={ClockStyle.muted}>local time</Text>
      </View>
    </View>
  )
}



interface TimezonesProps extends PropsWithChildren {
  timezones: Timezone[]
}
const Timezones = () => {
  return (
    <View>
      {FavoriteTimeZones.map((timezone) => {
        return (
          <View key={timezone.flag} style={{ 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5,
            paddingBottom: 10,
            marginTop: 25,
            borderBottomWidth: 0.3,
            borderBottomColor: 'rgba(0,0,0,0.3)'
           }}>
            <View style={{ display: 'flex', flexDirection: 'row', }}>
              <Image
                height={18}
                width={18}
                style={{ borderRadius: 10, marginTop: 5 }}
                source={{ uri: timezone.flag }}
              />
              <View style={{ marginLeft: 5 }}>
                <Text style={{ fontSize: 18 }}>{timezone.location}</Text>
                <Text>Thurday, 2 hours behind</Text>
              </View>
            </View>
            <View>
              <Ionicon
                color={timezone.isDaytime ? 'gold':'grey'}
                name={timezone.isDaytime ? 'sunny' : 'moon'}
                size={28} />
            </View>
            <View>
              <Text style={{ fontSize: 28 }}>{timezone.currentTime}</Text>
            </View>
          </View>
        )
      })}
    </View>
  );
}
const Clock = (() => {
  const CurrentDateTime = new Date();
  return (
    <ScrollView
      style={{
        ...AppStyle.container,
        marginBottom: 0,
        position: 'relative',
      }}
      showsVerticalScrollIndicator={false}>
      <Header title='World clock' hasAdd={false} />
      <DateTime date={new Date()}/>
      <Timezones />
    </ScrollView>)
})

const ClockStackNavigator = createNativeStackNavigator();

export const ClockStackScreen = () => {
  return (
    <ClockStackNavigator.Navigator>
      <ClockStackNavigator.Screen name="suggestions" options={{ header: () => null }}>
        {(props: any) => <Clock {...props} />}
      </ClockStackNavigator.Screen>
    </ClockStackNavigator.Navigator>
  );
}

export default Clock;

