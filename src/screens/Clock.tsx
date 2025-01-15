import React, { PropsWithChildren, useState } from 'react';
import { format,} from 'date-fns';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {COLORS} from '../constants/colors';
import Header from '../components/Header';
import AppStyle from '../assets/styles/AppStyle';
import { Image } from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons';
import AnalogClock from '../components/AnalogClock';
import TimeZones from '../components/TimeZones';



interface DateTimeProps extends PropsWithChildren {
  date: Date;
}

const ClockStyle = StyleSheet.create({
  digitalClockContainer: {
    marginHorizontal: 'auto',
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dateStr: {
    fontSize: 18,
    fontWeight: 500
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
  const dateStr = `${format(new Date(), 'EE, LLL dd yyy')}`;
  const timeStr = `${format(new Date(), 'hh : mm aa')}`;
  const hour = `${date.getHours()}`;
  const min = `${date.getUTCMinutes()}`;// format hour and min
  return (
    <View>
      <View style={ClockStyle.digitalClockContainer}>
        <Text style={[ClockStyle.dateStr, {
          fontWeight: 800,
          fontSize: 24,
        }] }>{timeStr}</Text>
        <Text style={ClockStyle.dateStr}>{dateStr}</Text>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start'
          }}>
          {/* <Text style={ClockStyle.digitalClock}>{hour}</Text>
          <Separator style={ClockStyle.digitalClock} />
          <Text style={ClockStyle.digitalClock}>{min}</Text> */}
        </View>
      </View>
    </View>
  )
}


const Clock = (() => {
  const [date, setDate] = useState(new Date());
  const windowHeight = Dimensions.get('window').height;
  const floatingFooter = 100;
  const spacing = 70;
  const screenHeight = windowHeight - (floatingFooter + spacing);

  const CurrentDateTime = new Date();
  return (
    <View
      style={{
        ...AppStyle.container,
        marginBottom: 0,
        position: 'relative',
        height: screenHeight,
      }}
      >
      <Header title='World clock' hasAdd />
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <View style={{ flex: 1}}>
          <Text style={{
            fontSize: 18,
            marginBottom: 10,
            color: 'teal',
            fontWeight: 500
            }}>Local Time</Text>
          <DateTime date={new Date()} />
        </View>
        <View style={{}}>
          <AnalogClock />
        </View>
      </View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 10,
        }}>
        <Ionicon name='heart' color={'red'} size={18} />
        <Text style={{
          fontSize: 18,
          fontWeight: 500,
          marginLeft: 10,
        }}>Saved places</Text>
      </View>

      <TimeZones />
    </View>)
})

const ClockStackNavigator = createNativeStackNavigator();

export const ClockStackScreen = () => {
  return (
    <ClockStackNavigator.Navigator>
      <ClockStackNavigator.Screen name="Clock" options={{ header: () => null }}>
        {(props: any) => <Clock {...props} />}
      </ClockStackNavigator.Screen>
    </ClockStackNavigator.Navigator>
  );
}

export default Clock;

