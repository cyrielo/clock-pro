import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { View, Text, ImageBackground, DimensionValue, StyleSheet, ImageSourcePropType, ViewStyle, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AlarmCardStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  }
});

interface Media {
  src: ImageSourcePropType | undefined
}

type ReflectionCardProps = PropsWithChildren<{
  title: string;
  style?: ViewStyle;
  active: boolean;
  time:string;
  interval?: string[];
  shouldVibrate?:boolean;
  onPress?: () => {};
}>

const AlarmCard = ({ title, style, time, shouldVibrate = true, active, interval, onPress }: ReflectionCardProps): React.JSX.Element =>  {
  const [isActive, switchAlarm] = useState(active);
  return (
    <View style={{ ...style }}>
      <View style={{
        borderBottomColor: '#eef3fa',
        borderBottomWidth: 1,
        paddingVertical: 10,
        display:'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <View>
          <Text style={{ fontSize: 13, marginBottom: 2}} >{title}</Text>
          <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 2 }}>{time}</Text>
          <Text style={{ fontSize: 13, marginBottom: 2 }} >{interval}</Text>
        </View>
        <View>
          <Switch
            thumbColor={'#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            value={isActive}
            onValueChange={switchAlarm}
           />
        </View>
      </View>
    </View>
  )
};

export default AlarmCard;