import React, {useRef, useState} from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { Dropdown, IDropdownRef} from 'react-native-element-dropdown';
import { COLORS } from '../constants/colors';
import { NotificationSounds } from '../constants/';
import { Timer } from '../types';
import Ionicon from '@react-native-vector-icons/ionicons';
import Button from './Button';
import { getTimeObj, timeToMilliseconds, createHash } from '../utils/stringUtils';
import { observer } from 'mobx-react-lite';
import { PreferencesStore, TimerStore } from '../store';
import { useTheme } from '@react-navigation/native';
import i18n from '../i18n';
import { CancelTimerNotification } from '../services/NotificationServices';

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
  const theme = useTheme();
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
          height: '100%',
          color: theme.colors.text,
        }}
        onChangeText={(text: string) => typeof onChangeText == 'function' && onChangeText(text) }
        cursorColor={'transparent'}
        value={value}
        maxLength={2}
        placeholderTextColor={theme.colors.text}
        placeholder={placeholder} />
      <Text style={{
        fontSize: 18,
        marginLeft: 2,
        marginTop: 5,
        color: theme.colors.text
        }}>
          {label}
        </Text>
    </View>
  )
});

const ManageTimer: React.FC<ManageTimerProps> = observer(({}) => {
  const theme = useTheme();
  const colorSelectorRef = useRef<IDropdownRef>(null);
  const ColorData = Object.keys(COLORS).slice(0,10).map((label, _) => ({
    label,
    value: COLORS[label]
  }));

  const colKey = TimerStore.activeColumnKey;
  const editMode = TimerStore.timer[colKey] !== undefined;
  const defaultTimer: Timer = {
    id: createHash(),
    isComplete: false,
    isPaused: false,
    elapsedTime: 0,
    duration: 0,
    label: '',
    color: ColorData[0].value,
    sound: PreferencesStore.preferences.notificationSound
  };

  const prevTimer:Timer = (TimerStore.timer[colKey] || defaultTimer);
  const [timer, setTimer] = useState<Timer>({ ...prevTimer });
  const timeObj = getTimeObj(timer.duration);
  const [hours, setHour] = useState(`${timeObj.hours}`);
  const [minutes, setMinutes] = useState(`${timeObj.minutes}`);
  const [seconds, setSeconds] = useState(`${timeObj.seconds}`);
  return (
    <View style={{
      backgroundColor: theme.colors.background,
      padding: 10,
      borderColor: theme.colors.border,
      borderWidth: 2,
      borderRadius: 10,
    }}>
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
        <Text style={{ fontWeight: 500, fontSize: 16, color: theme.colors.text }}>
          {(editMode) ? i18n.t('edit_timer') : i18n.t('new_timer') }
        </Text>
        <TouchableOpacity
          onPress={() => {
            TimerStore.toggleTimerModalVisibility();
          }}>
          <Text style={{ fontWeight: 500, fontSize: 16, color: theme.colors.text, }}>
            {i18n.t('cancel')}
          </Text>
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
          label={i18n.t('hours').toLocaleLowerCase()}
          onChangeText={(value: string) => setHour(value)}
        />
        <TimerInput
          placeholder='00'
          value={`${parseInt(minutes, 10) || ''}`}
          label={i18n.t('short_minutes').toLocaleLowerCase()}
          onChangeText={(value: string) => setMinutes(value)}
        />
        <TimerInput
          placeholder='00'
          value={`${parseInt(seconds, 10) || '' }`}
          label={i18n.t('short_seconds').toLocaleLowerCase()}
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
          <Text style={{ marginBottom: 5, color: theme.colors.text, }}>
            {i18n.t('label')}
          </Text>
          <TextInput
            placeholderTextColor={theme.colors.text}
            placeholder={i18n.t('timer_label')}
            value={timer.label}
            onChangeText={(label) => {
              setTimer({...timer, label});
            }}
            maxLength={15}
            style={{
              borderRadius: 5,
              borderWidth: 1,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.background,
              padding: 5,
              color: theme.colors.text,
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
            style={{ backgroundColor: theme.colors.background }}
            placeholderStyle={{ color: theme.colors.text, textAlign: 'right' }}
            showsVerticalScrollIndicator={false}
            data={ColorData}
            labelField={'label'}
            valueField={'value'}
            value={timer.color}
            activeColor='transparent'
            itemTextStyle={{
              color: theme.colors.text
            }}
            itemContainerStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border
            }}
            containerStyle={{
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border,
              width: 34,
            }}
            renderLeftIcon={() => {
              return (
                <View>
                  <Text style={{ color: theme.colors.text, }}>
                    {i18n.t('color')}
                  </Text>
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
          <Ionicon name='notifications' color={theme.colors.text} size={18}/>
          <Text style={{ textAlign: 'center', marginLeft: 4, color: theme.colors.text, }}>
            {i18n.t('sound')}
          </Text>
        </View>
        <Dropdown
          style={{
            marginBottom: 5,
            flex: 2,
            borderWidth: 1,
            borderRadius: 8,
            padding: 4,
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
          }}
          placeholderStyle={{ color: theme.colors.text, textAlign: 'right' }}
          showsVerticalScrollIndicator={false}
          data={NotificationSounds()}
          selectedTextStyle={{ color: theme.colors.text }}
          labelField={'label'}
          valueField={'value'}
          value={timer.sound}
          onChange={({ value }) => {
            setTimer((prev) => Object.assign(prev, { sound: value }));
          }}
          itemTextStyle={{
            color: theme.colors.text
          }}
          itemContainerStyle={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border
          }}
          activeColor={theme.colors.border}
          containerStyle={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border
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
        {editMode ? (
          <Button
            style={{
              backgroundColor: '#d11a2a',
              marginRight: 10,
            }}
            onPress={async () => {
              await TimerStore.deleteTimer(colKey);
              TimerStore.toggleTimerModalVisibility();
            }}
            >
            <Text style={{
              color: theme.colors.text,
              fontWeight: 500,
              textAlign: 'center'
            }}>
              {i18n.t('delete_timer')}
            </Text>
          </Button>
        ) : null}
        <Button
          style={{
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
            borderWidth: 1,
          }}
          onPress={async () => {
            const hourINms = timeToMilliseconds(hours, 'hours');
            const minsINms = timeToMilliseconds(minutes, 'minutes');
            const secINms = timeToMilliseconds(seconds, 'seconds');
            const durationInms = hourINms + minsINms + secINms;
            const a = Object.assign(timer, {
              isPaused: false,
              isComplete: false,
              elapsedTime: 0,
              duration: durationInms
            });
            if (editMode) {
              await CancelTimerNotification(timer);
            }
            await TimerStore.addTimer(colKey, a);
            TimerStore.toggleTimerModalVisibility();
          }}
          >
          <Text style={{textAlign: 'center', color: theme.colors.text }}>
            {editMode ? i18n.t('update_timer') : i18n.t('start_timer')}
          </Text>
        </Button>
      </View>
    </View>
  );
});

ManageTimer.displayName = 'ManageTimer';

export default ManageTimer;
