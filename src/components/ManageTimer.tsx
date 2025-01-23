import React, {useRef, useState} from 'react';
import { View, TouchableOpacity, Text, TextInput, TextStyle } from 'react-native';
import { Dropdown, IDropdownRef} from 'react-native-element-dropdown';
import { COLORS } from '../constants/colors';
import { NotificationSounds } from '../constants/';
import { Timer } from '../types';
import Ionicon from '@react-native-vector-icons/ionicons';
import Button from './Button';
import { getTimeObj, timeToMilliseconds } from '../utils/stringUtils';
import { observer } from 'mobx-react-lite';
import { TimerStore } from '../store';

type ManageTimerProps = {
};

type TimerInputProps = {
  placeholder: string;
  value?: string;
  label: string;
  onChangeText:Function;
}

const TimerInput: React.FC<TimerInputProps> = (({
  placeholder,
  label,
  value,
  onChangeText
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
        onChangeText={(text: string) => typeof onChangeText == 'function' && onChangeText(text) }
        cursorColor={'transparent'}
        value={value}
        maxLength={2}
        placeholder={placeholder} />
      <Text style={{ fontSize: 18, marginLeft: 2, marginTop: 5 }}>{label}</Text>
    </View>
  )
});

const ManageTimer: React.FC<ManageTimerProps> = observer(({}) => {

  const colorSelectorRef = useRef<IDropdownRef>(null);
  const ColorData = Object.keys(COLORS).slice(0,10).map((label, _) => ({
    label,
    value: COLORS[label]
  }));

  const colKey = TimerStore.activeColumnKey;
  const editMode = TimerStore.timer[colKey] !== undefined;
  const defaultTimer: Timer = {
    isPaused: false,
    elapsedTime: 0,
    reset: false,
    duration: 0,
    label: '',
    color: ColorData[0].value,
    sound: 'silent'
  };

  const prevTimer:Timer = (TimerStore.timer[colKey] || defaultTimer);
  const [timer, setTimer] = useState<Timer>({ ...prevTimer });
  const timeObj = getTimeObj(timer.duration);
  const [hours, setHour] = useState(`${timeObj.hours}`);
  const [minutes, setMinutes] = useState(`${timeObj.minutes}`);
  const [seconds, setSeconds] = useState(`${timeObj.seconds}`);
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
        <TouchableOpacity
          onPress={() => {
            TimerStore.toggleTimerModalVisibility();
          }}>
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
        <TimerInput
          placeholder='00'
          value={`${parseInt(hours, 10) || ''}`}
          label='hour'
          onChangeText={(value: string) => setHour(value)}
        />
        <TimerInput
          placeholder='00'
          value={`${parseInt(minutes, 10) || ''}`}
          label='min'
          onChangeText={(value: string) => setMinutes(value)}
        />
        <TimerInput
          placeholder='00'
          value={`${parseInt(seconds, 10) || '' }`}
          label='sec'
          onChangeText={(value: string) => setSeconds(value)}
        />
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
            value={timer.label}
            onChangeText={(label) => {
              setTimer({...timer, label});
            }}
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
            value={timer.color}
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
                      backgroundColor: timer.color,
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
              setTimer((prev) => Object.assign(prev, {color: value}));
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
          value={timer.sound}
          onChange={({ value }) => {
            setTimer((prev) => Object.assign(prev, { sound: value }));
          }}
        />
      </View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        marginTop:15,
        justifyContent: 'center'
      }}>
        <Button
          style={{ backgroundColor:'grey', marginRight: 10}}
          onPress={() => {
            const hourINms = timeToMilliseconds(hours, 'hours');
            const minsINms = timeToMilliseconds(minutes, 'minutes');
            const secINms = timeToMilliseconds(seconds, 'seconds');
            const durationInms = hourINms + minsINms + secINms;
            const a = Object.assign(timer, { isPaused: false, reset: true, duration: durationInms });
            TimerStore.addTimer(colKey, a);
            TimerStore.toggleTimerModalVisibility();
          }}
          >
          <Text style={{textAlign: 'center', }}>
            {editMode ? 'Update timer' : 'Start timer'}
          </Text>
        </Button>
        { editMode ? (
          <Button onPress={() => {
            TimerStore.deleteTimer(colKey);
            TimerStore.toggleTimerModalVisibility();
          }}
          style={{ backgroundColor: '#d11a2a', }}>
            <Text style={{ color: '#dcdcdc', fontWeight: 500, textAlign: 'center', }}>Delete timer</Text>
          </Button>
        ) : null }

      </View>
    </View>
  );
});

ManageTimer.displayName = 'ManageTimer';

export default ManageTimer;
