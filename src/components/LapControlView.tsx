import React from 'react';
import { View, Text } from 'react-native';
import Button from './Button';
import { COLORS } from '../constants/colors';;
import Ionicons from '@react-native-vector-icons/ionicons';
import { ClockValueStyle } from '../assets/styles/AppStyle';
import {StopWatchStore} from '../store';
import { Lap, StopWatchObj } from '../interfaces';
import { observer } from 'mobx-react-lite';

const togglePlay = () => {
  if (StopWatchStore.isPaused){
    StopWatchStore.setStopWatch({ isPaused: false } as StopWatchObj);
  } else {
    StopWatchStore.setStopWatch({ isPaused: true } as StopWatchObj);
  }
};

const addLap = () => {
  const {laps, timestamp, setStopWatch} = StopWatchStore;
  const prevLap = laps[laps.length - 1]; 
  const prevLapTime = (prevLap) ? (timestamp - prevLap.overallTime) : timestamp;
  const lap: Lap = { lapTime: prevLapTime, overallTime: timestamp };
  setStopWatch({ laps: [...laps, lap] } as StopWatchObj);
};

const LapControlView = observer(() => {
  return (
    <View style={{ marginTop: 20, height: 65 }}>
      <View style={{ ...ClockValueStyle.controlsBTNgrp }}>
        <Button onPress={() => StopWatchStore.reset()}
          style={{ ...ClockValueStyle.controlsBTN }}>
          <Ionicons name='stop' size={24} />
        </Button>
        <Button
          onPress={() => togglePlay()}
          style={{ ...ClockValueStyle.controlsBTN, backgroundColor: COLORS.Blue1 }}>
          <Ionicons
            name={StopWatchStore.isPaused ? 'play' : 'pause'}
            color={COLORS.Light} size={24} />
        </Button>
        <Button 
          onPress={() => addLap()}
          style={{ ...ClockValueStyle.controlsBTN }}>
          <Ionicons name='play-skip-forward-sharp' size={24} />
        </Button>
      </View>
    </View>
  );
});
LapControlView.displayName = 'LapControlView';
export default LapControlView;
