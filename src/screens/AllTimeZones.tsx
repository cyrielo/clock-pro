import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import TimeZones from '../components/TimeZones';
import { ClockStore } from '../store';
import Ionicon from '@react-native-vector-icons/ionicons';
import { observer } from 'mobx-react-lite';
import { FLOATING_FOOTER_HEIGHT, SPACING } from '../constants';

const AllTimeZones = observer(() => {
  const navigation = useNavigation();
  const [searchString, setSearchString] = useState('');
    const windowHeight = Dimensions.get('window').height;
    const marginBottom = 60;
  const screenHeight = windowHeight - (FLOATING_FOOTER_HEIGHT + SPACING + marginBottom);
  return (
    <KeyboardAvoidingView
      style={{
        margin: 10,
        maxHeight: screenHeight,
      }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(100,100,100,0.5)',
        borderRadius: 8,
        padding: 4,
        marginBottom: 15,
      }}>
        <Ionicon name='search' size={24} />
        <TextInput
          style={{ minWidth: '80%', fontSize: 16, marginLeft: 5 }}
          placeholder='Search'
          value={searchString}
          onChangeText={(text) => setSearchString(text)}
          />
      </View>
      <TimeZones
        data={Object.values(ClockStore.allPlaces).filter((val, _) => {
          const city = val.location.toLocaleLowerCase();
          const country = val.country.toLocaleLowerCase();
          const continent = val.continent.toLocaleLowerCase();
          return (city.includes(searchString) || country.includes(searchString) || continent.includes(searchString));
        })}
        localTimezone={ClockStore.localTimezone}
        />
    </KeyboardAvoidingView>
  );
});
AllTimeZones.displayName = 'AllTimeZones';
export default AllTimeZones;
