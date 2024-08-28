import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { PropsWithChildren, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheetProperties,
  Dimensions,
  ViewStyle,
  StyleSheet,
  FlatList
} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputArea from '../components/TextInputArea';
import { COLORS } from '../constants/colors';
import Section from '../components/Section';
import AppStyle from '../assets/styles/AppStyle';
import Button from '../components/Button';

const Laps = [{ title: 'Lap 1', lapTime: 4000 },
  { title: 'Lap 2', lapTime: 6000 },
  { title: 'Lap 3', lapTime: 1000 },
  { title: 'Lap 4', lapTime: 18000 },{ title: 'Lap 1', lapTime: 4000 },
  { title: 'Lap 2', lapTime: 6000 },
  { title: 'Lap 3', lapTime: 1000 },
  { title: 'Lap 4', lapTime: 18000 },
];

const clockValueStyle = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  separator: {
    marginRight: 10,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 300
  },
  values: {
    fontWeight: 'condensedBold',
    fontSize: 28,
    textAlign: 'center'
  },
  labels: {
    fontWeight: 400,
    fontSize: 15,
    textAlign: 'center',
    color: '#6c757d',
  },
  lapTable: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center'
  },
  controlsBTNgrp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  controlsBTN: {
    borderRadius: 100,
    elevation: 4,
    backgroundColor: '#fff',
    marginRight: 20,
    minHeight: 45,
    padding: 15,
  }
});
interface SeparatorProps {
  style?:ViewStyle;
}

interface CircularCardProps extends React.PropsWithChildren {
  style?: ViewStyle;
}

const CircularCard = ({ style, children }: CircularCardProps) => {
  return (
    <View style={{
      backgroundColor: '#fff',
      borderWidth: 1.5,
      borderColor: 'transparent',
      display: 'flex',
      marginHorizontal: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      height: 250,
      width: 250,
      borderRadius: 150,
      elevation: 20,
      shadowColor: 'grey',
      shadowOpacity: 0.5,
      shadowRadius: 20,
      marginBottom: 25,
      ...style
    }}>
      <>
        {children}
      </>
    </View>
  );
}

const LapControlView = () => {
  return (
    <View style={{ marginTop: 20, height: 65 }}>
      <View style={{ ...clockValueStyle.controlsBTNgrp }}>
        <Button style={{ ...clockValueStyle.controlsBTN }}>
          <Ionicons name='stop' size={24} />
        </Button>
        <Button style={{ ...clockValueStyle.controlsBTN, backgroundColor: COLORS.Blue1 }}>
          <Ionicons name='pause' color={COLORS.Light} size={24} />
        </Button>
        <Button style={{ ...clockValueStyle.controlsBTN }}>
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
  console.log(windowHeight, '--', lapTableHeight);
  return (
    <View style={{ marginVertical: 20, ...style, height: lapTableHeight }}>
      <View style={{
        ...clockValueStyle.lapTable,
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
              ...clockValueStyle.lapTable,
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
          <Text style={{ ...clockValueStyle.title }}>STOPWATCH</Text>
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          marginVertical: 10,
          alignItems: 'baseline'
        }}>
          <View style={{ marginRight: 15, }}>
            <Text style={{ ...clockValueStyle.values }}>02</Text>
            <Text style={{ ...clockValueStyle.labels }}>hour</Text>
          </View>
          <Separator style={{ ...clockValueStyle.separator }} />
          <View style={{ marginRight: 15 }}>
            <Text style={{ ...clockValueStyle.values }}>18</Text>
            <Text style={{ ...clockValueStyle.labels }}>min</Text>
          </View>
          <Separator style={{ ...clockValueStyle.separator }} />
          <View style={{ marginRight: 15 }}>
            <Text style={{ ...clockValueStyle.values }}>56</Text>
            <Text style={{ ...clockValueStyle.labels }}>sec</Text>
          </View>
        </View>
        <View style={{ marginVertical: 15 }}>
          <Text style={{ ...clockValueStyle.labels }}>Paused</Text>
        </View>
      </CircularCard>
      <LapTable />
      <LapControlView />
    </View>
)
});
{/* <ScrollView
  style={{
    ...AppStyle.container,
    marginBottom: 0,
    position: 'relative',
  }}
  showsVerticalScrollIndicator={false}>
  <View>
    


  </View>
</ScrollView> */}


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

