import { Timezone } from 'countries-and-timezones';
import React from 'react';
import { View, FlatList, Text, Image} from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons';
import { observer } from 'mobx-react-lite';
import { ClockStore } from '../store/';
import { formatInTimeZone, getTimezoneOffset } from 'date-fns-tz'

interface TimeZoneProps {
  
}
const TimeZones = observer(({}: TimeZoneProps) => {
  const date = new Date();

  const calcOffset = (timezone:string, date:Date) :string => {
    const localOffset = getTimezoneOffset(ClockStore.localTimezone, date) / 3600000;
    const offset = getTimezoneOffset(timezone, date) / 3600000;
    const diff = Math.abs(localOffset - offset);
    return (localOffset > offset) ? `- ${diff} hours` : `+ ${diff} hours`;
  }
  return (
    <FlatList
      data={ClockStore.favorites}
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
              borderBottomColor: 'rgba(0,0,0,0.3)',
            }}>
            <View style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              height={18}
              width={18}
              style={{ borderRadius: 10, marginRight:5, }}
              source={{ uri: item.flag }}
            />
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 14 }}>{item.location}</Text>
                <Text style={{ fontSize: 12 }}>
                  {
                    `${formatInTimeZone(date, item.timeZone, 'EE, LLL dd')}`
                  }
                </Text>
            </View>
          </View>
            <View style={{ flex: 1,}}>
            <Ionicon
                color={item.isDayLight ? 'gold' : 'grey'}
                name={item.isDayLight ? 'sunny' : 'moon'}
              size={28} />
          </View>
          <View style={{
            display: 'flex',
            flexDirection:'column',
            }}>
            <Text style={{ fontSize: 14, fontWeight:500 }}>
              { formatInTimeZone(date, item.timeZone, 'hh : mm aa') }
            </Text>

              <Text style={{ fontSize: 12 }}>
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
