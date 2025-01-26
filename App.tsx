/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from './src/constants/colors';
import _, { PreferencesStore } from './src/store';
import TabNavigation from './src/navigations/TabNavigation';
import { ThemeType } from './src/types';
import { observer } from 'mobx-react-lite';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n';
const Stack = createNativeStackNavigator();

const App = observer(() => {
  const userTheme = PreferencesStore.preferences.theme;
  const systemTheme = useColorScheme() || 'light' as ThemeType;
  const colorScheme = (userTheme === 'system') ? systemTheme : userTheme;
  const theme = colorScheme == 'dark' ? DarkTheme : LightTheme;
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer theme={theme} >
          <Stack.Navigator>
            <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
    );
})

export default App;
