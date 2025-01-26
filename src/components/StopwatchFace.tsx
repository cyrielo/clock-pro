import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircularCard } from '../components/Card';
import { ClockValueStyle } from '../assets/styles/AppStyle';
import Separator from './Seperator';
import { getTimeObj } from '../utils/stringUtils';
import { StopWatchStore } from '../store';
import { observer } from 'mobx-react-lite';
import { useTheme } from '@react-navigation/native';

const StopwatchFace = observer(forwardRef((_, ref) => {
  const theme = useTheme();
  const { isPaused, timestamp: prevTimeStamp } = StopWatchStore;
  const [timestamp, setTimeStamp] = useState(prevTimeStamp);
  useImperativeHandle(ref, () => ({
    getTimeStamp: () => {
      return timestamp;
    },
    setTimeStamp: (timestamp:number) => {
      setTimeStamp(timestamp);
    }
  }));
  const interval = useRef<NodeJS.Timeout | number | undefined>(0);
  const INTERVAL_STEP = 93;

  useEffect(() => {
    if (!isPaused) {
      interval.current = setInterval(() => {
        setTimeStamp((prev) => prev + INTERVAL_STEP);
      }, INTERVAL_STEP);
    } else {
      clearInterval(interval.current);
      interval.current = undefined;
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    }
  }, [isPaused]);

  const ClockStyle = StyleSheet.create({
    ...ClockValueStyle,
    themeColor: {
      color: theme.colors.text,
    }
  });

  return (
    <CircularCard style={{ marginTop: 10, paddingHorizontal: 10 }}>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ ...ClockStyle.title, ...ClockStyle.themeColor }}>STOPWATCH</Text>
      </View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'baseline',
      }}>
        <View style={{ marginRight: 15, flex: 1, }}>
          <Text style={{ ...ClockStyle.values, ...ClockStyle.themeColor}}>
            {getTimeObj(timestamp).hours}
          </Text>
          <Text style={{ ...ClockStyle.labels, ...ClockStyle.themeColor }}>hour</Text>
        </View>
        <Separator style={{ ...ClockStyle.separator, ...ClockStyle.themeColor }} />
        <View style={{ marginRight: 15, flex: 1, }}>
          <Text style={{ ...ClockStyle.values, ...ClockStyle.themeColor }}>
            {getTimeObj(timestamp).minutes}
          </Text>
          <Text style={{ ...ClockStyle.labels, ...ClockStyle.themeColor }}>min</Text>
        </View>
        <Separator style={{ ...ClockStyle.separator, ...ClockStyle.themeColor }} />
        <View style={{ marginRight: 15, flex: 1, }}>
          <Text style={{ ...ClockStyle.values, ...ClockStyle.themeColor }}>
            {getTimeObj(timestamp).seconds}
          </Text>
          <Text style={{ ...ClockStyle.labels, ...ClockStyle.themeColor }}>sec</Text>
        </View>
        <Separator style={{ ...ClockStyle.separator, ...ClockStyle.themeColor }} />
        <View style={{ marginRight: 15, flex: 1, }}>
          <Text style={{ ...ClockStyle.values, fontSize: 18, ...ClockStyle.themeColor }}>
            {getTimeObj(timestamp).milliseconds}
          </Text>
          <Text style={{ ...ClockStyle.labels, ...ClockStyle.themeColor }}>ms</Text>
        </View>
      </View>
      <View style={{ marginVertical: 15 }}>
        <Text style={{ ...ClockStyle.labels, ...ClockStyle.themeColor }}>
          {StopWatchStore.isPaused ? 'Paused' : ''}
        </Text>
      </View>
    </CircularCard>
  )
}));
StopwatchFace.displayName = 'StopwatchFace';

export default StopwatchFace;
