import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { PropsWithChildren, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  View,
  Text,
  Dimensions,
  ViewStyle,
  FlatList,
  TextStyle
} from 'react-native';
import { StopWatchStore } from '../store';
import { ClockValueStyle } from '../assets/styles/AppStyle';
import { StopWatchObj } from '../interfaces';
import StopwatchFace from '../components/StopwatchFace';
import LapControlView from '../components/LapControlView';
const Laps = [{ title: 'Lap 1', lapTime: 4000 },
  { title: 'Lap 2', lapTime: 6000 },
  { title: 'Lap 3', lapTime: 1000 },
  { title: 'Lap 4', lapTime: 18000 },{ title: 'Lap 1', lapTime: 4000 },
  { title: 'Lap 2', lapTime: 6000 },
  { title: 'Lap 3', lapTime: 1000 },
  { title: 'Lap 4', lapTime: 18000 },
];



interface LapTableProps extends PropsWithChildren {
  style?: ViewStyle;
}
const LapTable = ({ style, children}: LapTableProps) => {
  const windowHeight = Dimensions.get('window').height;
  const clockHeight = 250;
  const lapControlHeight = 65;
  const floatingFooter = 100;
  const spacing = 10 + 40 + 20 + lapControlHeight;
  const lapTableHeight = windowHeight - (clockHeight + lapControlHeight + 20 + floatingFooter + spacing );
  return (
    <View style={{ marginVertical: 20, ...style, height: lapTableHeight }}>
      <View style={{
        ...ClockValueStyle.lapTable,
        marginBottom: 2,
        backgroundColor: '#f5f8fa',
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, textAlign: 'center' }}>OVERALL</Text>
        </View>
        <View style={{ flex: 1, }}>
          <Text style={{ fontSize: 18, fontWeight: 500, textAlign: 'center' }}>LAP TIME</Text>
        </View>
        <View style={{ flex: 1, }}>
          <Text style={{ fontSize: 18, fontWeight: 500, textAlign: 'center' }}>LAP</Text></View>
      </View>
      <FlatList
        style={{ }}
        showsVerticalScrollIndicator={false}
        data={Laps.sort((a, b) => { return a.lapTime < b.lapTime ? 1 : -1 })}
        renderItem={({item}) => {return (
          <View style={{
            ...ClockValueStyle.lapTable,
              marginBottom: 2,
            }}>
              <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, textAlign: 'center' }}>{item.lapTime}</Text>
              </View>
              <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 18, fontWeight: 500, textAlign: 'center' }}>{item.lapTime}</Text>
              </View>
              <View style={{ flex: 1, }}>
              <Text style={{ fontSize: 18, fontWeight: 500, textAlign: 'center' }}>{item.title}</Text></View>
            </View>
        )}}
      />
    </View>
  );
}

const StopWatch = observer(() => {
  const togglePlay = () => {
    if (StopWatchStore.isPaused){
      StopWatchStore.setStopWatch({ isPaused: false } as StopWatchObj);

    } else {
      StopWatchStore.setStopWatch({ isPaused: true } as StopWatchObj);
    }

  };




  return (
    <View >
      <StopwatchFace />
      <LapTable />
      <LapControlView />
    </View>
)
});


const StopWatchStackNavigator = createNativeStackNavigator();

export const StopWatchStackScreen = () => {
  return (
    <StopWatchStackNavigator.Navigator>
      <StopWatchStackNavigator.Screen name="Alarm" options={{ header: () => null }}>
        {(props: any) => <StopWatch  {...props} />}
      </StopWatchStackNavigator.Screen>
    </StopWatchStackNavigator.Navigator>
  );
}

StopWatch.displayName = 'StopWatch';
export default StopWatch;

