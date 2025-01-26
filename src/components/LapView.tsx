import React, {useEffect, useRef} from 'react';
import { View, Text, FlatList, Dimensions, ViewStyle, StyleSheet } from 'react-native';
import { ClockValueStyle } from '../assets/styles/AppStyle';
import { observer } from 'mobx-react-lite';
import { StopWatchStore } from '../store';
import { getTimeObj } from '../utils/stringUtils';
import { useTheme } from '@react-navigation/native';

interface LapViewProps {
  style?: ViewStyle
}
const LapView = observer(({style}: LapViewProps) => {
  const theme = useTheme();
  const { laps } = StopWatchStore;
  const listRef = useRef<FlatList>(null);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToEnd();
    }
  }, [laps]);
  const windowHeight = Dimensions.get('window').height;
  const clockHeight = 250;
  const lapControlHeight = 65;
  const floatingFooter = 100;
  const spacing = 70 + lapControlHeight;
  const screenHeight = windowHeight - (floatingFooter + spacing + clockHeight + lapControlHeight);
  const LapTableLabelStyle = StyleSheet.create({
    ...ClockValueStyle,
    lapTableLabel: {
      ...ClockValueStyle.lapTableLabel,
      color: theme.colors.text,
    }
  })
  return (
    <View style={{
      marginVertical: 20, ...style,
      maxHeight: screenHeight,
      paddingBottom: 20
      }}>
      <View style={{
        ...LapTableLabelStyle.lapTable,
        marginBottom: 2,
        backgroundColor: theme.colors.background,
      }}>
        <View style={{ flex: 1 }}>
          <Text style={LapTableLabelStyle.lapTableLabel}>CURRENT TIME</Text>
        </View>
        <View style={{ flex: 1, }}>
          <Text style={LapTableLabelStyle.lapTableLabel}>LAP TIME</Text>
        </View>
        <View style={{ flex: 1, }}>
          <Text style={LapTableLabelStyle.lapTableLabel}>#LAP</Text></View>
      </View>
      <FlatList
        ref={listRef}
        inverted
        scrollsToTop
        style={{ }}
        showsVerticalScrollIndicator={false}
        data={StopWatchStore.laps}
        renderItem={({item, index}) => {
          const overallTime = getTimeObj(item.overallTime);
          const lapTime = getTimeObj(item.lapTime)
          return (
          <View style={{
            ...ClockValueStyle.lapTable,
              marginBottom: 2,
            }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, textAlign: 'center', color: theme.colors.text, }}>
                  {overallTime.hours ? `${overallTime.hours}h `:''}
                  {overallTime.minutes ? `${overallTime.minutes}m ` : ''}
                  {overallTime.seconds ? `${overallTime.seconds}s ` : ''}
                  {overallTime.milliseconds ? `${overallTime.milliseconds}ms ` : ''}
                </Text>
              </View>
              <View style={{ flex: 1, }}>
                <Text style={{...LapTableLabelStyle.lapTableLabel, ...{ fontWeight: 400 }}}>
                  {lapTime.hours ? `${lapTime.hours}h ` : ''}
                  {lapTime.minutes ? `${lapTime.minutes}m ` : ''}
                  {lapTime.seconds ? `${lapTime.seconds}s ` : ''}
                  {lapTime.milliseconds ? `${lapTime.milliseconds}ms ` : '0ms'}
                </Text>
              </View>
              <View style={{ flex: 1, }}>
                <Text style={{ ...LapTableLabelStyle.lapTableLabel, ...{ fontWeight: 400 } }}>
                  Lap {index + 1}
                </Text>
              </View>
            </View>
        )}}
      />
    </View>
  );
});

LapView.displayName = 'LapView';
export default LapView;
