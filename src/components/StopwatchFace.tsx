import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import { View, Text } from 'react-native';
import { CircularCard } from '../components/Card';
import { ClockValueStyle } from '../assets/styles/AppStyle';
import Separator from './Seperator';
import { getTimeObj } from '../utils/stringUtils';
import { StopWatchStore } from '../store';
import { observer } from 'mobx-react-lite';

const StopwatchFace = observer(forwardRef((_, ref) => {
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

  return (
    <CircularCard style={{ marginTop: 10, paddingHorizontal: 10 }}>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ ...ClockValueStyle.title }}>STOPWATCH</Text>
      </View>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'baseline',
      }}>
        <View style={{ marginRight: 15, flex: 1, }}>
          <Text style={{ ...ClockValueStyle.values }}>
            {getTimeObj(timestamp).hours}
          </Text>
          <Text style={{ ...ClockValueStyle.labels }}>hour</Text>
        </View>
        <Separator style={{ ...ClockValueStyle.separator }} />
        <View style={{ marginRight: 15, flex: 1, }}>
          <Text style={{ ...ClockValueStyle.values }}>
            {getTimeObj(timestamp).minutes}
          </Text>
          <Text style={{ ...ClockValueStyle.labels }}>min</Text>
        </View>
        <Separator style={{ ...ClockValueStyle.separator }} />
        <View style={{ marginRight: 15, flex: 1, }}>
          <Text style={{ ...ClockValueStyle.values }}>
            {getTimeObj(timestamp).seconds}
          </Text>
          <Text style={{ ...ClockValueStyle.labels }}>sec</Text>
        </View>
        <Separator style={{ ...ClockValueStyle.separator, }} />
        <View style={{ marginRight: 15, flex: 1, }}>
          <Text style={{ ...ClockValueStyle.values, fontSize: 18, }}>
            {getTimeObj(timestamp).milliseconds}
          </Text>
          <Text style={{ ...ClockValueStyle.labels, }}>ms</Text>
        </View>
      </View>
      <View style={{ marginVertical: 15, }}>
        <Text style={{ ...ClockValueStyle.labels }}>
          {StopWatchStore.isPaused ? 'Paused' : ''}
        </Text>
      </View>
    </CircularCard>
  )
}));
StopwatchFace.displayName = 'StopwatchFace';

export default StopwatchFace;
