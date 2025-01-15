import React, { PropsWithChildren, useState } from 'react';
import { format,} from 'date-fns';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {COLORS} from '../constants/colors';
import Header from '../components/Header';
import AppStyle from '../assets/styles/AppStyle';
import Ionicon from '@react-native-vector-icons/ionicons';
import AnalogClock from '../components/AnalogClock';
import TimeZones from '../components/TimeZones';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AllTimeZones from './AllTimeZones';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { ClockStore } from '../store';
import { FLOATING_FOOTER_HEIGHT, SPACING } from '../constants';


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
  const dateStr = `${format(date, 'EE, LLL dd yyy')}`;
  const timeStr = `${format(date, 'hh : mm aa')}`;
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
        </View>
      </View>
    </View>
  )
}


const Clock = observer(({ navigation }:any) => {
  const [date, setDate] = useState(new Date());
  const windowHeight = Dimensions.get('window').height;
  const screenHeight = windowHeight - (FLOATING_FOOTER_HEIGHT + SPACING);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View
          style={{
            ...AppStyle.container,
            marginBottom: 0,
            position: 'relative',
            height: screenHeight,
          }}
        >
          <Header
            hasAdd
            title='World clock'
            onAdd={() => {
              navigation.navigate('Timezones');
            }}
          />
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <View style={{ flex: 1 }}>
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
          <TimeZones
            data={Object.values(ClockStore.favorites)}
            localTimezone={ClockStore.localTimezone}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
});

const ClockStackNavigator = createNativeStackNavigator();

export const ClockStackScreen = () => {
  return (
    <ClockStackNavigator.Navigator>
      <ClockStackNavigator.Group>
        <ClockStackNavigator.Screen name="Clock" options={{ header: () => null }}>
          {(props: any) => <Clock {...props} />}
        </ClockStackNavigator.Screen>
      </ClockStackNavigator.Group>
      <ClockStackNavigator.Group screenOptions={{ presentation: 'modal' }}>
        <ClockStackNavigator.Screen name="Timezones">
          {(props:any) => <AllTimeZones {...props} />}
        </ClockStackNavigator.Screen>
      </ClockStackNavigator.Group>
    </ClockStackNavigator.Navigator>
  );
}

export default Clock;
