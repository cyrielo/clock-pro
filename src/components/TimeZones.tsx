import React from 'react';
import { View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import MaterialIcon from '@react-native-vector-icons/material-design-icons';
import { observer } from 'mobx-react-lite';
import { formatInTimeZone, getTimezoneOffset } from 'date-fns-tz'
import { Place } from '../types';
import { ClockStore } from '../store';
import { useTheme } from '@react-navigation/native';

interface TimeZoneProps {
  data: Place[];
  localTimezone: string;
}
const TimeZones = observer(({ data, localTimezone }: TimeZoneProps) => {
  const theme = useTheme();
  const date = new Date();

  const calcOffset = (timezone:string, date:Date) :string => {
    const localOffset = getTimezoneOffset(localTimezone, date) / 3600000;
    const offset = getTimezoneOffset(timezone, date) / 3600000;
    const diff = Math.abs(localOffset - offset);
    if (localOffset == offset) {return ''};
    return (localOffset > offset) ? `- ${diff} hours` : `+ ${diff} hours`;
  }
  return (
    <FlatList
      data={data}
      style={{}}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        return (
          <View
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 5,
              paddingBottom: 10,
              marginTop: 25,
              borderBottomWidth: 0.3,
              borderBottomColor: theme.colors.border,
            }}>
            <View style={{
              display: 'flex',
              flex: 2,
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 15,
              }}>
            <Image
              height={18}
              width={18}
              style={{ borderRadius: 10, marginRight:5, }}
              source={{ uri: item.flag }}
            />
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 14, color: theme.colors.text }}>
                  {`${item.location}, ${item.country}`}
                </Text>
                <Text style={{ fontSize: 12, color: theme.colors.text }}>
                  {
                    `${formatInTimeZone(date, item.timeZone, 'EE, LLL dd')}`
                  }
                </Text>
            </View>
          </View>
            <View style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (item.isFave) {
                    ClockStore.removeFavorite(item);
                  } else {
                    ClockStore.addFavorite(item);
                  }
                }}>
                <MaterialIcon
                  name={(item.isFave) ? 'heart-circle' : 'heart-plus-outline'}
                  color={(item.isFave) ? 'red' : 'grey' }
                  size={22}
                />
              </TouchableOpacity>
          </View>
          <View style={{
            display: 'flex',
            flexDirection:'column',
            }}>
              <Text style={{ fontSize: 14, fontWeight: 500, color: theme.colors.text }}>
              { formatInTimeZone(date, item.timeZone, 'hh : mm aa') }
            </Text>

              <Text style={{ fontSize: 12, color: theme.colors.text }}>
                {calcOffset(item.timeZone, date)}
              </Text>
          </View>
        </View>);
      }}
    />
  );
});

TimeZones.displayName = 'TimeZones';
export default TimeZones;
