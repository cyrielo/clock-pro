import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, TextInput,  } from 'react-native';
import RNDateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { ScreenWithNavigation, Weekdays } from '../types';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { CircularCard } from '../components/Card';
import Ionicon from '@react-native-vector-icons/ionicons';
import { upperCaseFirst } from '../utils/stringUtils';
import { FLOATING_FOOTER_HEIGHT, SPACING } from '../constants';
import Button from '../components/Button';
import { Switch } from 'react-native';

const ManageAlarm = ({navigation, route} : ScreenWithNavigation) => {
  const [date, setDate] = useState(new Date());

  const onChange = (event:DateTimePickerEvent) => {
    const currentDate = 'selectedDate';
    //setDate(currentDate);
  };

  const showMode = (currentMode:any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChange,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const allDays: Weekdays[] = ['sunday','monday', 'tuesday', 'wednessday', 'thursday', 'friday', 'saturday'];

  //DateTimePickerAndroid.open({value: new Date(), mode: 'time'});
  return (
    <ScrollView
      style={{
        marginBottom: FLOATING_FOOTER_HEIGHT + 15,
      }}
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
              <Ionicon name='alarm' color={'#09c'} size={20} />
              <Text style={{ fontSize: 16, marginLeft: 5, textAlign: 'center' }}>
                {'Alarm on'}
              </Text>
            </View>
            <Text style={{ fontSize: 38, marginVertical: 15,  width: '100%', textAlign: 'center' }}>
              {'6:00 AM'}
            </Text>
            <Text
              style={{
                marginHorizontal: 'auto',
                fontSize: 16,
                width: '85%',
                textAlign: 'center',
              }}>
              {'- 12hrs 15mins'}
            </Text>
            <Text style={{
              marginHorizontal: 'auto',
              fontSize: 16,
              width: '100%',
              textAlign: 'center',
              }}>
              {'remaining'}
            </Text>
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
            return (
              <TouchableOpacity
                key={index}
                style={{
                  padding: 5,
                  backgroundColor: 'rgba(200,200,200,0.1)',
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
          <Switch value={false} />
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
            Alarm Sound
          </Text>
          <Switch value={false} />
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
            Snooze
          </Text>
          <Switch value={false} />
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
          <Switch value={false} />
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
          <Switch value={false} />
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
        <Button style={{marginRight: 10, padding: 10, borderRadius: 20}}>
          <Ionicon name='trash' color={'#f9f9f9'} size={22} />
        </Button>
        <Button style={{padding: 10, backgroundColor: 'teal', borderRadius: 20 }}>
          <Ionicon name='checkmark' color={'#f9f9f9'} size={22} />
        </Button>
      </View>
    </ScrollView>
  );
};

export default ManageAlarm;

