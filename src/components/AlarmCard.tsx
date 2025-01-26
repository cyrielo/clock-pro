import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { View, Text, StyleSheet, ViewStyle, Switch } from 'react-native';
import { COLORS } from '../constants/colors';
import i18n from '../i18n';
import { Weekdays } from '../types';

const AlarmCardStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

type ReflectionCardProps = PropsWithChildren<{
  title: string;
  style?: ViewStyle;
  active: boolean;
  time:string;
  weekdays: Weekdays[];
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
  shouldRepeat,
  onActiveToggle
}: ReflectionCardProps): React.JSX.Element =>  {
  const theme = useTheme();
  const [isActive, setActive] = useState(active);
  useEffect(() => {
    if (active !== isActive) {
      setActive(active);
    }
  }, [active]);
  return (
    <View style={{ ...style }}>
      <View style={{
        ...AlarmCardStyles.container,
        borderBottomColor: theme.colors.border,
      }}>
        <View>
          <Text style={{
            fontSize: 13,
            marginBottom: 2,
            color: theme.colors.text
            }} >{title}</Text>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 2,
            color: theme.colors.text
            }}>{time}</Text>
          <Text style={{
            fontSize: 13,
            marginBottom: 2,
            color: theme.colors.text
            }} >
            {weekdays.map((weekday: Weekdays) => i18n.t(weekday)).join(', ')}
          </Text>
        </View>
        <View>
          <Switch
            thumbColor={theme.colors.text}
            trackColor={{ false: COLORS.Grey, true: COLORS.Light_Purple }}
            value={isActive}
            onValueChange={(val) => {
              if (typeof onActiveToggle == 'function') {
                onActiveToggle(val);
                setActive(val);
              }
            }}
           />
        </View>
      </View>
    </View>
  )
};

export default AlarmCard;