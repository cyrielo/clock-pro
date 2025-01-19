import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { View, Text,  Dimensions, FlatList, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicon from '@react-native-vector-icons/ionicons';
import Header from '../components/Header';
import {observer} from 'mobx-react-lite';
import { FLOATING_FOOTER_HEIGHT, SPACING } from '../constants';
import CircularProgressBar from '../components/CircularProgressBar';
import Pulsate from '../components/Pulsate';
import { TimerStore } from '../store';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ManageTimer from '../components/ManageTimer';
import { Timer as TimerType } from '../types';
import { getTimeObj, padNumber } from '../utils/stringUtils';
const GRID = {length: 3, height: 4};
const TimerStackNavigator = createNativeStackNavigator();

type ColProps = {
  row: number;
}

type RowProps = {
  Col: FunctionComponent<ColProps>;
}

interface TimerItemProps {
  columnKey: string;
}

const TimerItem = observer(({ columnKey }: TimerItemProps) => {
  const { color, duration, isPaused, label, sound, isComplete } = TimerStore.timer[columnKey];
  const countDownRef = useRef<NodeJS.Timeout|number>(0);
  const [countDown, setCountDown] = useState(duration);
  //const [timerProgress, se]
  const { hours = 0, minutes = 0, seconds = 0 } = getTimeObj(countDown);
  const isSilent = sound == 'silent';
  const fiftyPercent = duration * 0.6;
  const tenPercent = duration * 0.2;
  const timerProgress = (countDown / duration) * 100 > 0 ? (countDown / duration) * 100 : 0;
  const fastOrSlowPulse = (countDown <= tenPercent) ? 100 : 500;
  const pulseSpeed = ((countDown <= fiftyPercent)) ? fastOrSlowPulse : 1000;
  const countDownComplete = countDown <= -1000;

  useEffect(() => {
    if (!isPaused && !isComplete) {
      if (countDownComplete) { setCountDown(duration); } // reset duration
      countDownRef.current = setInterval(() => {
        setCountDown(countDown - 1000);
      }, 1000);
      if (countDown == -1000) {
        clearInterval(countDownRef.current);
        const update = { isComplete: true, isPaused: true } as TimerType;
        TimerStore.updateTimer(columnKey, update);
      }
    }
    return () => {
      clearInterval(countDownRef.current);
    };
  }, [isPaused, isComplete, pulseSpeed, countDown, duration]);
  return (
    <>
      <Pulsate isPaused={isPaused} duration={pulseSpeed}>
        <CircularProgressBar
          size={100}
          strokeWidth={3}
          progress={timerProgress}>
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 1.5,
              fontWeight: 400,
              textAlign: 'center'
            }}>
            {`${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`}
          </Text>
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 1.5,
              fontWeight: 400,
              textAlign: 'center'
            }}>
            { label || ''}
          </Text>
        </CircularProgressBar>
      </Pulsate>
      <Ionicon
        style={{
          borderWidth: 1,
          right: 2,
          bottom: 2,
          position: 'absolute',
          borderColor: 'transparent'
        }}
        name={isSilent ? 'notifications-off' : 'notifications'}
        size={16}
        color={isSilent ? '#dcdcdc' :'#fff'}
      />
    </>
  )
});

const Rows: React.FC<RowProps> = ({ Col }) => (
  Array.from({ length: GRID.height }).map((_, index) => {
    return (
      <View
        key={index}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 15,
          alignItems: 'center'
        }}>
        <Col row={index} />
      </View>
    )
  })
);
const Cols: React.FC<ColProps> = ({row}) => {
  return Array.from({ length: GRID.length }).map((_, index) => {
    const columnKey = `${row}_${index}`;
    const hasTimer = Object.hasOwn(TimerStore.timer, columnKey);
    const timer = hasTimer ? TimerStore.timer[columnKey] as TimerType : {} as TimerType;
    return (
      <TouchableOpacity
        key={index}
        onLongPress={() => {
          TimerStore.toggleTimerModalVisibility(columnKey);
        }}
        onPress={() => {
          const timer = TimerStore.timer[columnKey];
          if (timer) {
            const update = { isPaused: !timer.isPaused } as TimerType;
            update.isComplete = (timer.isComplete) ? false: timer.isComplete;
            TimerStore.updateTimer(columnKey, update);
          } else {
            TimerStore.toggleTimerModalVisibility(columnKey);
          }
        }}
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: (hasTimer) ? timer.color : 'transparent',
          backgroundColor: (hasTimer) ? timer.color : 'rgba(100,100,100,0.5)',
          marginHorizontal: 7,
          height: 110,
          borderRadius: 10,
          padding: 4,
          justifyContent: 'flex-end',
        }}
      >
        {
          Object.hasOwn(TimerStore.timer, columnKey) ?
            <TimerItem columnKey={columnKey} /> : null
        }
      </TouchableOpacity>
    )
  });
};
const Timer = observer(() => {
  const windowHeight = Dimensions.get('window').height;
  const screenHeight = windowHeight - (FLOATING_FOOTER_HEIGHT + SPACING);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Modal
          animationType='slide'
          onDismiss={() => TimerStore.toggleTimerModalVisibility()}
          transparent={true}
          visible={TimerStore.timerModalVisibility}
          >
            <View style={{
              minWidth: '85%',
              minHeight: 300,
              margin: 'auto',
              backgroundColor: '#fff',
              borderRadius: 5
            }}>
              <ManageTimer/>
            </View>
        </Modal>
        <View style={{
          display: 'flex',
          marginTop: 20,
          marginBottom: 0,
          marginHorizontal: 20,
          paddingBottom: 130,
          height: screenHeight
        }}>
          <Header title='Timer' hasAdd={true} />
          <View style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            margin: 'auto',
            marginTop: 35,
          }}>
            <Rows Col={Cols} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
)
});

export const TimerStackScreen = () => {
  return (
    <TimerStackNavigator.Navigator>
      <TimerStackNavigator.Screen
        name="Timer" options={{ header: () => null }}>
        {(props: any) => <Timer {...props} />}
      </TimerStackNavigator.Screen>
    </TimerStackNavigator.Navigator>
  );
}
Timer.displayName = 'Timer';
export default Timer;
