import React, { ReactNode, RefObject } from 'react';
import { View } from 'react-native';
import Button from './Button';
import { COLORS } from '../constants/colors';;
import Ionicons from '@react-native-vector-icons/ionicons';
import { ClockValueStyle } from '../assets/styles/AppStyle';
import {StopWatchStore} from '../store';
import { Lap, StopWatchObj } from '../types';
import { observer } from 'mobx-react-lite';

const togglePlay = (stopWatchFaceHandle: RefObject<ReactNode | null>) => {
  if (StopWatchStore.isPaused){
    StopWatchStore.setStopWatch({ isPaused: false } as StopWatchObj);
  } else {
    // @ts-ignore
    const currentTimetamp = stopWatchFaceHandle.current.getTimeStamp();
    StopWatchStore.pause(currentTimetamp);
    StopWatchStore.setStopWatch({ isPaused: true } as StopWatchObj);
  }
};

const resetTimer = (stopWatchFaceHandle: RefObject<ReactNode|null>) => {
  StopWatchStore.reset();
  // @ts-ignore
  stopWatchFaceHandle.current.setTimeStamp(0);
}

const addLap = (stopWatchFaceHandle: RefObject<ReactNode|null>) => {
  if (stopWatchFaceHandle) {
    if (stopWatchFaceHandle.current) {
      // @ts-ignore
      const currentTimetamp = stopWatchFaceHandle.current.getTimeStamp();
      const { laps } = StopWatchStore;
      const prevLap = laps[laps.length - 1];
      const prevLapTime = (prevLap) ? (currentTimetamp - prevLap.overallTime) : currentTimetamp;
      const lap: Lap = { lapTime: prevLapTime, overallTime: currentTimetamp };
      StopWatchStore.setStopWatch({ laps: [...StopWatchStore.laps, lap] } as StopWatchObj);
    }
  }

};

interface LapControlViewProps {
  stopWatchFaceHandle: RefObject<ReactNode|null>;
}

const LapControlView = observer(({stopWatchFaceHandle}: LapControlViewProps) => {
  return (
    <View style={{
      marginTop: 20,
      position: 'absolute',
      width: '100%',
      bottom: 0,
      height: 65,

      }}>
      <View style={{ ...ClockValueStyle.controlsBTNgrp }}>
        <Button onPress={() => resetTimer(stopWatchFaceHandle)}
          style={{ ...ClockValueStyle.controlsBTN }}>
          <Ionicons name='stop' size={24} />
        </Button>
        <Button
          onPress={() => togglePlay(stopWatchFaceHandle)}
          style={{ ...ClockValueStyle.controlsBTN, backgroundColor: COLORS.Blue_1 }}>
          <Ionicons
            name={StopWatchStore.isPaused ? 'play' : 'pause'}
            color={COLORS.Light} size={24} />
        </Button>
        <Button 
          onPress={() => addLap(stopWatchFaceHandle)}
          style={{ ...ClockValueStyle.controlsBTN }}>
          <Ionicons name='play-skip-forward-sharp' size={24} />
        </Button>
      </View>
    </View>
  );
});
LapControlView.displayName = 'LapControlView';
export default LapControlView;
