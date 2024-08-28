import React from 'react';
import { View, Text, ScrollView, ViewStyle } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Section from '../components/Section';
import { CircularCard } from '../components/Card';
import Header from '../components/Header';
import { ClockValueStyle } from '../assets/styles/AppStyle';
import Button from '../components/Button';
import { COLORS } from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
const TimerStackNavigator = createNativeStackNavigator();

interface SeparatorProps {
  style?: ViewStyle;
}
const Separator = ({ style }: SeparatorProps) => {
  return (<Text style={{ ...style }}>:</Text>);
}

const LapControlView = () => {
  return (
    <View style={{ marginTop: 20, height: 65, marginHorizontal: 40 }}>
      <View style={{ ...ClockValueStyle.controlsBTNgrp, justifyContent: 'space-between' }}>
        <Button style={{ ...ClockValueStyle.controlsBTN }}>
          <Ionicons name='stop' size={28} />
        </Button>
        <Button style={{ ...ClockValueStyle.controlsBTN, backgroundColor: COLORS.Blue1 }}>
          <Ionicons name='pause' color={COLORS.Light} size={28} />
        </Button>
      </View>
    </View>
  )
}

const Timer = (() => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{
        marginTop: 20,
        marginBottom: 0,
        marginHorizontal: 20,
        paddingBottom: 130,
        }}>
        <Header title='Timer' />
        <CircularCard>
          <View style={{ marginVertical: 10 }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '500', }}>4min</Text>
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
        <LapControlView />
      </View>
    </ScrollView>)
});

export const TimerStackScreen = () => {
  return (
    <TimerStackNavigator.Navigator>
      <TimerStackNavigator.Screen
        name="About" options={{ header: () => null }}>
        {(props: any) => <Timer {...props} />}
      </TimerStackNavigator.Screen>
    </TimerStackNavigator.Navigator>
  );
}

export default Timer;
