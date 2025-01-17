import React, {useRef, useState} from 'react';
import type { PropsWithChildren } from 'react';
import { View, TouchableOpacity, Text, TextInput, TextStyle } from 'react-native';
import { Dropdown, IDropdownRef} from 'react-native-element-dropdown';
import { COLORS } from '../constants/colors';
import { NotificationSounds } from '../constants/';
import { Timer } from '../types';
import Ionicon from '@react-native-vector-icons/ionicons';
import Button from './Button';
import { getTimeObj } from '../utils/stringUtils';

type ManageTimerProps = {
  editMode?:boolean;
  prevTimer?: Timer;
};

type TimerInputProps = {
  placeholder: string;
  value?: string;
  label: string;
}

const TimerInput: React.FC<TimerInputProps> = (({
  placeholder,
  label,
  value
}) => {
  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 5,
    }}>
      <TextInput
        inputMode='numeric'
        style={{
          fontSize: 22,
          width: 50,
          textAlign: 'center',
          height: '100%'
        }}
        cursorColor={'transparent'}
        value={value}
        maxLength={2}
        placeholder={placeholder} />
      <Text style={{ fontSize: 18, marginLeft: 2, marginTop: 5 }}>{label}</Text>
    </View>
  )
});

const ManageTimer: React.FC<ManageTimerProps> = ({
  editMode, prevTimer = {} }) => {
  const colorSelectorRef = useRef<IDropdownRef>(null);
  const ColorData = Object.keys(COLORS).slice(0,10).map((label, _) => ({
    label,
    value: COLORS[label]
  }));
  const { color, duration, label, sound } = prevTimer as Timer;
  const { hours, minutes, seconds } = getTimeObj(duration);
  const [selectedColor, setSelectedColor] = useState(color ? color : '#ad1457');
  const [selectedSound, setSelectedSound] = useState(sound ? sound : 'silent');
  return (
    <View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 5,
        marginHorizontal: 5,
      }}>
        <TouchableOpacity>
          <Text style={{ fontWeight: 500, fontSize: 16 }}></Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 500, fontSize: 16 }}>
          {(editMode) ? 'Edit Timer' : 'New Timer'}
        </Text>
        <TouchableOpacity>
          <Text style={{ fontWeight: 500, fontSize: 16 }}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 'auto',
        height: 80,
      }}>
        <TimerInput placeholder='00' value={hours.toString()} label='hour' />
        <TimerInput placeholder='00' value={minutes.toString()} label='min' />
        <TimerInput placeholder='00' value={seconds.toString()} label='sec' />
      </View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <View style={{
          height: 60,
          marginHorizontal: 10,
          minWidth: 120
        }}>
          <Text style={{marginBottom: 5, }}>Label</Text>
          <TextInput
            placeholder='Timer Label'
            value={label}
            maxLength={15}
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'grey',
              backgroundColor: 'rgba(200,200,200,0.1)',
              padding: 5,
            }}
          />
        </View>
        <View style={{
          height: 60,
          marginHorizontal: 10,
          minWidth: 40
        }}>
          <Dropdown
            ref={colorSelectorRef}
            style={{ }}
            showsVerticalScrollIndicator={false}
            data={ColorData}
            labelField={'label'}
            valueField={'value'}
            value={selectedColor}
            activeColor='transparent'
            containerStyle={{
              borderColor: 'transparent',
              width: 34,
            }}
            renderLeftIcon={() => {
              return (
                <View>
                  <Text style={{}}>Color</Text>
                  <TouchableOpacity
                    onPress={() => {
                      if (colorSelectorRef.current) {
                        colorSelectorRef.current.open();
                      }
                    }}
                    style={{
                      marginTop: 4,
                      height: 32,
                      width: 32,
                      borderRadius: 4,
                      backgroundColor: selectedColor,
                    }} />
                </View>
              )
            }}
            selectedTextProps={{ style: { display: 'none' } }}
            renderRightIcon={() => null}
            renderItem={(item, selected) => {
              return (<View style={{
                marginTop: 3,
                backgroundColor: item.value,
                height: 20,
                width: 32,
              }}
            />)
            }}
            onChange={({ value }) => {
              setSelectedColor(value)
            }}
          />
        </View>
      </View>
      <View style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 10,
      }}>
        <View style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          }}>
          <Ionicon name='notifications'  color='grey' size={18}/>
          <Text style={{ textAlign: 'center', marginLeft: 4 }}>Sound</Text>
        </View>
        <Dropdown
          style={{
            marginBottom: 5,
            flex: 2,
            borderWidth: 1,
            borderRadius: 8,
            padding: 4,
            borderColor: 'grey'
          }}
          showsVerticalScrollIndicator={false}
          data={NotificationSounds}
          labelField={'label'}
          valueField={'value'}
          value={selectedSound}
          onChange={({ value }) => {
            setSelectedSound(value)
          }}
        />
      </View>
      <View style={{
        display: 'flex',
        alignItems:'center',
        marginTop:15,
        justifyContent: 'center'
      }}>
        <Button
          style={{width:100, backgroundColor:'grey'}}
          onPress={() => {
            console.log('Start timer');
          }}
          >
          <Text>Start timer</Text>
        </Button>
      </View>
    </View>
  );
};

ManageTimer.displayName = 'ManageTimer';

export default ManageTimer;
