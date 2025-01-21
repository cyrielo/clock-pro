import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput,  } from 'react-native';
import RNDateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Alarm, ScreenWithNavigation, Weekdays } from '../types';
import { CircularCard } from '../components/Card';
import Ionicon from '@react-native-vector-icons/ionicons';
import { formatTimeString, getTimeObj, upperCaseFirst } from '../utils/stringUtils';
import { FLOATING_FOOTER_HEIGHT, SPACING } from '../constants';
import Button from '../components/Button';
import { Switch } from 'react-native';
import { NotificationSounds } from '../constants';
import { Dropdown } from 'react-native-element-dropdown';
import { AlarmStore, ClockStore, PreferencesStore } from '../store';
import { fromZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import Pulsate from '../components/Pulsate';

interface ManageAlarmProps extends ScreenWithNavigation {
  alarmKey:string;
};

const ManageAlarm = ({ navigation, route }: ManageAlarmProps) => {
  const routeParams = route && route.params || {};
  const prevAlarm = (routeParams && routeParams.prevAlarm || {}) as Alarm;
  const prevAlarmIndex = routeParams && routeParams.prevAlarmIndex || null;

  const timerRef = useRef<NodeJS.Timeout | number>();
  const timezone = ClockStore.localTimezone;
  const prevDate =
    prevAlarm && prevAlarm.timestamp ? (fromZonedTime(new Date(prevAlarm.timestamp), timezone)) : fromZonedTime(new Date(), timezone)
  const [date, setDate] = useState(prevDate);

  const handleAlarmTimeChange = (event:DateTimePickerEvent) => {
    const timestamp = event.nativeEvent.timestamp;
    const selectedDate = fromZonedTime(new Date(timestamp), timezone);
    const currentDay = format(selectedDate, 'eeee').toLocaleLowerCase() as Weekdays;
    if (!selectedDays.includes(currentDay)) {
      setSelectedDays([...selectedDays, currentDay]);
    }
    setTimeString(formatTimeString(selectedDate));
    setDate(selectedDate);
    setIsAlarmActive(true);
    setTimestamp(timestamp);
  };
  const [timestamp, setTimestamp] = useState(prevDate.getTime());

  const [timeString, setTimeString] = useState(formatTimeString(date));
  const [isAlaramActive, setIsAlarmActive] = useState(prevAlarm && prevAlarm.active || false);
  const [shouldSnooze, setShouldSnooze] = useState(prevAlarm && prevAlarm.shouldSnooze || false);
  const [shouldRepeat, setShouldRepeat] = useState(prevAlarm && prevAlarm.shouldRepeat || false);
  const [shouldVibrate, setShouldVibrate] = useState(prevAlarm && prevAlarm.shouldVibrate || false);
  const [label, setLabel] = useState(prevAlarm && prevAlarm.label || '');
  const [selectedDays, setSelectedDays] = useState(prevAlarm && prevAlarm.weekdays || [] as Weekdays[]);
  const [alarmSound, setAlarmSound] = useState(prevAlarm && prevAlarm.sound || PreferencesStore.preferences.notificationSound);
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const localDate = fromZonedTime(new Date(), timezone);
      const localTimeStamp = localDate.getTime();
      const diff = date.getTime() - localTimeStamp;
      const timeObj = getTimeObj(diff);
      const hours = timeObj.hours && timeObj.hours + 'hrs' || '';
      const minutes = timeObj.minutes && timeObj.minutes + ' mins' || '';
      const left = (hours) ? `- ${hours} ${minutes}` : ``;
      if(!Object.keys(timeObj).length) {
        clearInterval(timerRef.current);
      }
      setRemainingTime(left);
    }, 1000);
    return (() => {
      clearInterval(timerRef.current);
    })
  }, [timeString]);
  const showMode = (currentMode:any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: handleAlarmTimeChange,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const handleDaysSelection = (day:Weekdays) => {
    const pos = selectedDays.indexOf(day);
    if (pos > -1) {
      setSelectedDays(selectedDays.filter((day:Weekdays, i:number) => i != pos));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  }

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const allDays: Weekdays[] = ['sunday','monday', 'tuesday', 'wednessday', 'thursday', 'friday', 'saturday'];
  return (
    <ScrollView
      style={{
        marginBottom: FLOATING_FOOTER_HEIGHT + 15,
      }}
      pagingEnabled={false}
      showsVerticalScrollIndicator={false}
      >
      <CircularCard style={{marginTop: 20}}>
        <TouchableOpacity
          style={{  }}
          onPress={() => {
            showTimepicker();
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '100%',
              }}>
            <View 
              style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
              }}>
              <Ionicon
                name='alarm'
                color={isAlaramActive ? '#09c' : '#dcdcdc'}
                size={20}
              />
              <Text style={{ fontSize: 16, marginLeft: 5, textAlign: 'center' }}>
                Alarm {isAlaramActive ? 'on' : 'off'}
              </Text>
            </View>
            <Text style={{ fontSize: 38, marginVertical: 15,  width: '100%', textAlign: 'center' }}>
              {timeString}
            </Text>
            <Pulsate isPaused={!isAlaramActive && !remainingTime}>
              <Text
                style={{
                  marginHorizontal: 'auto',
                  fontSize: 16,
                  width: '85%',
                  textAlign: 'center',
                }}>
                {(isAlaramActive && remainingTime) ? remainingTime : ''}
              </Text>
              <Text style={{
                marginHorizontal: 'auto',
                fontSize: 16,
                width: '100%',
                textAlign: 'center',
              }}>
                {(isAlaramActive && remainingTime) ? 'remaining' : ''}
              </Text>
            </Pulsate>
          </View>
        </TouchableOpacity>
      </CircularCard>
      <View style={{
          minHeight: 250,
          backgroundColor: '#fff',
          padding: 10,
          borderRadius: 10,
          marginHorizontal: 15,
          marginBottom: 10,
        }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 12,
        }}>
          { allDays.map((day, index) => {
            const isSelectedDay = selectedDays.includes(day);
            const bgColor = isSelectedDay ? 'rgba(200,200,200,0.6)' : 'rgba(200,200,200,0.1)' ;
            return (
              <TouchableOpacity
                onPress={() => handleDaysSelection(day)}
                key={index}
                style={{
                  padding: 5,
                  backgroundColor: bgColor,
                  borderRadius: 5,
                  flex: 1,
                  marginRight: (index != allDays.length - 1) ? 4 : 0,
                }}
                >
                <Text style={{textAlign: 'center'}}>
                  {upperCaseFirst(day).slice(0,3)}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 20,
          borderBottomWidth: 0.5,
          paddingBottom: 7,
          borderBottomColor: 'grey',
          justifyContent:'flex-start',
          }}>
            <Text style={{padding: 5}}>
              Alarm name
            </Text>
            <TextInput
              placeholder='Alarm name ...'
              style={{ }}
              onChangeText={setLabel}
              value={label}
            />
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          borderBottomWidth: 0.5,
          paddingBottom: 7,
          borderBottomColor: 'grey',
        }}>
          <Text>
            Active
          </Text>
          <Switch
            onValueChange={setIsAlarmActive}
            value={isAlaramActive} />
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
          borderBottomWidth: 0.5,
          paddingBottom: 7,
          borderBottomColor: 'grey',
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text>
              Alarm Sound
            </Text>
          </View>

          <View style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            <Dropdown
              style={{
                width: '100%',
              }}
              selectedTextStyle={{ textAlign: 'right' }}
              data={NotificationSounds}
              search={false}
              value={alarmSound}
              placeholderStyle={{ textAlign: 'right' }}
              onChange={(item) => {
                setAlarmSound(item.value);
              }}
              renderRightIcon={() => (<Ionicon style={{}} name='chevron-forward-outline' size={24} />)}
              labelField={'label'}
              valueField={'value'}
            />
          </View>
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          borderBottomWidth: 0.5,
          paddingBottom: 7,
          borderBottomColor: 'grey',
        }}>
          <Text>
            Allow Snooze
          </Text>
          <Switch
            onValueChange={setShouldSnooze}
            value={shouldSnooze}
          />
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          borderBottomWidth: 0.5,
          paddingBottom: 7,
          borderBottomColor: 'grey',
        }}>
          <Text>
            Repeat
          </Text>
          <Switch
            value={shouldRepeat}
            onValueChange={setShouldRepeat}
          />
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          paddingBottom: 7,
        }}>
          <Text>
            Vibrate
          </Text>
          <Switch
            value={shouldVibrate}
            onValueChange={setShouldVibrate}
          />
        </View>
      </View>
      <View style={{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 10,
        padding: 10
      }}>
        <Button
          onPress={() => {
            //delete
            AlarmStore.deleteAlarm(prevAlarmIndex);
            navigation.goBack();
          }}
          style={{marginRight: 10, padding: 10, borderRadius: 20}}>
          <Ionicon name='trash' color={'#f9f9f9'} size={22} />
        </Button>
        <Button
          onPress={async () => {
            //save
            const alarm:Alarm = {
              active: isAlaramActive,
              shouldRepeat,
              shouldSnooze,
              shouldVibrate,
              sound:alarmSound,
              label,
              timestamp,
              weekdays:selectedDays
            }
            await AlarmStore.createAlarm(alarm, prevAlarmIndex);
            navigation.goBack();
          }}
          style={{padding: 10, backgroundColor: 'teal', borderRadius: 20 }}>
          <Ionicon name='checkmark' color={'#f9f9f9'} size={22} />
        </Button>
      </View>
    </ScrollView>
  );
};

export default ManageAlarm;

