import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import TimeZones from '../components/TimeZones';
import { ClockStore, PreferencesStore } from '../store';
import Ionicon from '@react-native-vector-icons/ionicons';
import { observer } from 'mobx-react-lite';
import { FLOATING_FOOTER_HEIGHT, SPACING } from '../constants';
import { useTheme } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import i18n from '../i18n';
import { ScreenWithNavigation } from '../types';

const AllTimeZones = observer(({ navigation, route }: ScreenWithNavigation) => {
  const theme = useTheme();
  navigation.setOptions({ title: i18n.t('set_alarm') });
  const [searchString, setSearchString] = useState('');
  const {} = PreferencesStore.preferences;
  const windowHeight = Dimensions.get('window').height;
  const marginBottom = 60;
  const screenHeight = windowHeight - (FLOATING_FOOTER_HEIGHT + SPACING + marginBottom);
  const timeZoneData = ClockStore.allPlaces && Object.values(ClockStore.allPlaces).filter((val, _) => {
    const city = val.location.toLocaleLowerCase();
    const country = val.country.toLocaleLowerCase();
    const continent = val.continent.toLocaleLowerCase();
    return (city.includes(searchString) || country.includes(searchString) || continent.includes(searchString));
  }) || [];
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
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        padding: 4,
        marginBottom: 15,
      }}>
        <Ionicon name='search' color={COLORS.Grey} size={24} />
        <TextInput
          style={{ minWidth: '80%', fontSize: 16, marginLeft: 5, color: theme.colors.text }}
          placeholder={i18n.t('search')}
          value={searchString}
          placeholderTextColor={COLORS.Grey}
          onChangeText={(text) => setSearchString(text)}
          />
      </View>
      <TimeZones
        data={timeZoneData}
        localTimezone={ClockStore.localTimezone}
        />
    </KeyboardAvoidingView>
  );
});
AllTimeZones.displayName = 'AllTimeZones';
export default AllTimeZones;
