/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import React from 'react';
import { useColorScheme, View, ActivityIndicator } from 'react-native';
import _, { PreferencesStore } from './src/store';
import TabNavigation from './src/navigations/TabNavigation';
import { ThemeType } from './src/types';
import { observer } from 'mobx-react-lite';

const Stack = createNativeStackNavigator();

const App = observer(() => {
    const userTheme = PreferencesStore.preferences.theme;
    const systemTheme = useColorScheme() || 'light' as ThemeType;
    const colorScheme = (userTheme === 'system') ? systemTheme : userTheme;
    const theme = colorScheme == 'dark' ? DarkTheme : DefaultTheme;
  if (!PreferencesStore.preferences.isHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  console.log('colorScheme', colorScheme);
  return (
    <NavigationContainer theme={theme} >
        <Stack.Navigator>
          <Stack.Screen
            name="TabNavigation"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
})

export default App;
