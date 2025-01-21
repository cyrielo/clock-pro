import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity,  } from 'react-native';
import RNDateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { ScreenWithNavigation } from '../types';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { CircularCard } from '../components/Card';
import Ionicon from '@react-native-vector-icons/ionicons';

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
  //DateTimePickerAndroid.open({value: new Date(), mode: 'time'});
  return (
    <View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 'auto',
        marginTop: 15
      }}>
        <TouchableOpacity>
          <CircularCard style={{}}>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '100%',
            }}>
              <View style={{
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
              <Text style={{
                marginHorizontal: 'auto',
                fontSize: 16,
                width: '85%',
                textAlign: 'center'
                }}>
                {'- 12hrs 15mins'}
              </Text>
              <Text style={{ fontSize: 16, width: '100%', textAlign: 'center' }}>
                {'remaining'}
              </Text>
            </View>
          </CircularCard>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ManageAlarm;

