import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { PropsWithChildren, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  ViewStyle,
  FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/colors';;
import Button from '../components/Button';
import { CircularCard } from '../components/Card';
import { ClockValueStyle } from '../assets/styles/AppStyle';
const Laps = [{ title: 'Lap 1', lapTime: 4000 },
  { title: 'Lap 2', lapTime: 6000 },
  { title: 'Lap 3', lapTime: 1000 },
  { title: 'Lap 4', lapTime: 18000 },{ title: 'Lap 1', lapTime: 4000 },
  { title: 'Lap 2', lapTime: 6000 },
  { title: 'Lap 3', lapTime: 1000 },
  { title: 'Lap 4', lapTime: 18000 },
];


interface SeparatorProps {
  style?:ViewStyle;
}





const LapControlView = () => {
  return (
    <View style={{ marginTop: 20, height: 65 }}>
      <View style={{ ...ClockValueStyle.controlsBTNgrp }}>
        <Button style={{ ...ClockValueStyle.controlsBTN }}>
          <Ionicons name='stop' size={24} />
        </Button>
        <Button style={{ ...ClockValueStyle.controlsBTN, backgroundColor: COLORS.Blue1 }}>
          <Ionicons name='pause' color={COLORS.Light} size={24} />
        </Button>
        <Button style={{ ...ClockValueStyle.controlsBTN }}>
          <Ionicons name='play-skip-forward-sharp' size={24} />
        </Button>
      </View>
    </View>
  )
}
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
const Separator = ({ style }: SeparatorProps) =>  {
  return (<Text style={{...style}}>:</Text>);
}

const StopWatch = (() => {

  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  return (
    <View >
      <CircularCard style={{ marginTop:10 }}>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ ...ClockValueStyle.title }}>STOPWATCH</Text>
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          marginVertical: 10,
          alignItems: 'baseline'
        }}>
          <View style={{ marginRight: 15, }}>
            <Text style={{ ...ClockValueStyle.values }}>02</Text>
            <Text style={{ ...ClockValueStyle.labels }}>hour</Text>
          </View>
          <Separator style={{ ...ClockValueStyle.separator }} />
          <View style={{ marginRight: 15 }}>
            <Text style={{ ...ClockValueStyle.values }}>18</Text>
            <Text style={{ ...ClockValueStyle.labels }}>min</Text>
          </View>
          <Separator style={{ ...ClockValueStyle.separator }} />
          <View style={{ marginRight: 15 }}>
            <Text style={{ ...ClockValueStyle.values }}>56</Text>
            <Text style={{ ...ClockValueStyle.labels }}>sec</Text>
          </View>
        </View>
        <View style={{ marginVertical: 15 }}>
          <Text style={{ ...ClockValueStyle.labels }}>Paused</Text>
        </View>
      </CircularCard>
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


export default StopWatch;

