import React, { useState } from 'react';
import { View, Text, Button,  } from 'react-native';
import RNDateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { ScreenWithNavigation } from '../types';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

const ManageAlarm = ({navigation, route} : ScreenWithNavigation) => {
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event:DateTimePickerEvent, selectedDate:Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode:any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: () => {},
      mode: currentMode,
      is24Hour: true,
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
      <ScrollPicker
        style={{borderWidth: 2, height: 100, width: 100}}
        dataSource={["1", "2", "3", "4", "5", "6"]}
        selectedIndex={1}
        renderItem={(data, index) => {
          return (
            <View>
              <Text>{data}</Text>
            </View>
          );
        }}
        onValueChange={(data, selectedIndex) => {
          //
        }}
        wrapperHeight={180}
        wrapperBackground="#FFFFFF"
        itemHeight={60}
        highlightColor="#d8d8d8"
        highlightBorderWidth={2}
      />
      {/* <Button title='Show time picker' onPress={() => showTimepicker()} /> */}
    </View>
  );
};

export default ManageAlarm;

