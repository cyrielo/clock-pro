import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useRef, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { Dimensions, View, } from 'react-native';
import StopwatchFace from '../components/StopwatchFace';
import LapControlView from '../components/LapControlView';
import LapView from '../components/LapView';
import Header from '../components/Header';
import i18n from '../i18n';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppStyle from '../assets/styles/AppStyle';

const StopWatch = observer(() => {
  const stopWatchRef = useRef<ReactNode|null>(null);
  const windowHeight = Dimensions.get('window').height;
  const floatingFooter = 100;
  const spacing = 100;
  const screenHeight = windowHeight - (floatingFooter + spacing);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={{
          ...AppStyle.container,
          height: screenHeight
          }} >
          <Header title={i18n.t('stopwatch')} hasAdd={false} />
          <StopwatchFace ref={stopWatchRef} />
          <LapView />
          <LapControlView stopWatchFaceHandle={stopWatchRef} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>

)
});

const StopWatchStackNavigator = createNativeStackNavigator();

export const StopWatchStackScreen = () => {
  return (
    <StopWatchStackNavigator.Navigator>
      <StopWatchStackNavigator.Screen name="StopWatch" options={{ header: () => null }}>
        {(props: any) => <StopWatch  {...props} />}
      </StopWatchStackNavigator.Screen>
    </StopWatchStackNavigator.Navigator>
  );
}

StopWatch.displayName = 'StopWatch';
export default StopWatch;
