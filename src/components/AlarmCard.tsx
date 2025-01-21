import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import { View, Text, ImageBackground, DimensionValue, StyleSheet, ImageSourcePropType, ViewStyle, Switch } from 'react-native';

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
  weekdays: string[];
  shouldVibrate?:boolean;
  shouldRepeat:boolean;
  onPress?: Function;
  onActiveToggle?: Function;
}>

const AlarmCard = ({
  title,
  style,
  time,
  shouldVibrate = true,
  active,
  weekdays,
  onPress,
  shouldRepeat,
  onActiveToggle
}: ReflectionCardProps): React.JSX.Element =>  {
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
          <Text style={{ fontSize: 13, marginBottom: 2 }} >
            {weekdays.join(', ')}
          </Text>
        </View>
        <View>
          <Switch
            thumbColor={'#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            value={active}
            onValueChange={(val) => {
              if (typeof onActiveToggle == 'function') {
                onActiveToggle(val);
              }
            }}
           />
        </View>
      </View>
    </View>
  )
};

export default AlarmCard;