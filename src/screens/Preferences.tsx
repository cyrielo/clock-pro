import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, Switch, ScrollView, Modal, TouchableOpacity, StyleSheet, Pressable, Keyboard, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Section from '../components/Section';
import Ionicon from '@react-native-vector-icons/ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import { observer } from 'mobx-react-lite';
import { NotificationSounds, THEMES, LANGUAGES } from '../constants';
import { PreferencesStore } from '../store/';
import { useTheme } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { useTranslation } from 'react-i18next';

const IconSize = 24;
const fontSize = 16;

const ModalStyle = StyleSheet.create({
  modal: {
    marginHorizontal: 15,
    marginVertical: 'auto',
    backgroundColor: 'white',
    minHeight: 200,
    maxHeight: 600,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
const lorem = 
`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae turpis at turpis egestas ultricies a luctus ipsum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc feugiat ullamcorper velit, in feugiat dolor convallis in. Quisque porttitor metus non nibh sodales finibus. Vivamus ornare, nunc ac vulputate cursus, mauris sapien pellentesque lacus, et venenatis mi ante at nunc. Sed semper fermentum mollis. Nullam non ante malesuada, pretium orci in, dapibus ex. Curabitur ut justo odio. Donec pretium dictum sollicitudin. Fusce elementum euismod mauris, nec condimentum velit varius sit amet. Mauris fringilla purus at lacus consequat, vel dictum sapien scelerisque.
auris fringilla purus at lacus consequat, vel dictum sapien scelerisque.
`

const Preferences = observer( () => {
  const theme = useTheme();
  const { i18n, t} = useTranslation();
  console.log('i18n', i18n, t);
  const [modalVisibility, setModalVisibility] = useState(false);
  const prefs = PreferencesStore.preferences;

  const toggelModal = () => {
    Keyboard.dismiss();
    setModalVisibility(!modalVisibility);
  }

  const SectionStyle = StyleSheet.create({
    section: {
      borderColor: theme.colors.border,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      paddingBottom: 15,
      marginBottom: 20,
    }
  });

  return (

    <SafeAreaProvider>
      <SafeAreaView>
          <Modal
            visible={modalVisibility}
            transparent={true}
            animationType='fade'
            onRequestClose={toggelModal}
          >
            <Pressable
              style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,.1)", // Dimmed background
              justifyContent: "center",
              alignItems: "center",
              }}
            onPress={toggelModal}
            >
            <Pressable onPress={() => {}}>
              <ScrollView style={{
                ...ModalStyle.modal,
                flexGrow: 0,
                }}>
                <Text style={{
                  marginBottom: 25,
                }}>
                  {lorem}
                </Text>
              <Button
                title="Close"
                  onPress={toggelModal}
              />
              </ScrollView>
            </Pressable>
          </Pressable>

          </Modal>
        <ScrollView
          showsVerticalScrollIndicator={false}>
          <View style={{
            margin: 20,
            marginBottom: 0,
            paddingBottom: 130
          }}>
            <Section title='General' />
            <View style={{
              ...SectionStyle.section
            }}>
              <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center'
              }}>
                <Ionicon
                  color={theme.colors.text}
                  style={{ marginRight: 10 }}
                  name='contrast-outline'
                  size={IconSize} />
                <Text style={{ fontSize, color: theme.colors.text }}>Theme</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
                <Dropdown
                  style={{
                    height: 35,
                    width: '100%',
                    justifyContent: 'flex-end',
                  }}
                  selectedTextStyle={{ textAlign: 'right', color: theme.colors.text }}
                  data={THEMES}
                  search={false}
                  value={prefs.theme}
                  onChange={(item) => {
                    PreferencesStore.setPreferences({ ...prefs, theme: item.value });
                  }}
                  placeholderStyle={{ color: theme.colors.text }}
                  renderRightIcon={() => (<Ionicon color={theme.colors.text} style={{}} name='chevron-forward-outline' size={IconSize} />)}
                  labelField={'label'}
                  valueField={'value'}
                />
              </View>
            </View>
            <View style={{
              ...SectionStyle.section
            }}>
              <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center'
              }}>
                <Ionicon color={theme.colors.text} style={{ marginRight: 10 }} name='language' size={IconSize} />
                <Text style={{ fontSize: 16, color: theme.colors.text }}>Language</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
                <Dropdown
                  style={{
                    height: 35,
                    width: '100%',
                    justifyContent: 'flex-end',
                  }}
                  placeholderStyle={{ color: theme.colors.text }}
                  selectedTextStyle={{ textAlign: 'right', color: theme.colors.text }}
                  data={LANGUAGES}
                  search={false}
                  value={prefs.language}
                  onChange={({value}) => {
                    PreferencesStore.setPreferences({ ...prefs, language: value });
                  }}
                  renderRightIcon={() => (<Ionicon color={theme.colors.text} style={{}} name='chevron-forward-outline' size={IconSize} />)}
                  labelField={'label'}
                  valueField={'value'}
                />
              </View>
            </View>
            <Section title='Notifications' />
            <View style={{
              ...SectionStyle.section
            }}>
              <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center'
              }}>
                <Ionicon color={theme.colors.text} style={{ marginRight: 10 }} name='notifications' size={IconSize} />
                <Text style={{ fontSize, color: theme.colors.text }}>Allow Notification</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
                <Switch
                  thumbColor={theme.colors.text}
                  trackColor={{ false: COLORS.Grey, true: COLORS.Light_Purple }}
                  value={prefs.notificationEnabled}
                  onValueChange={(val: boolean) => {
                    PreferencesStore.setPreferences({ ...prefs, notificationEnabled: !!val });
                  }} />
              </View>
            </View>
            <View style={{
              ...SectionStyle.section
            }}>
              <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center'
              }}>
                <Ionicon color={theme.colors.text} style={{ marginRight: 10 }} name='musical-notes-sharp' size={IconSize} />
                <Text style={{ fontSize, color: theme.colors.text }}>Notification Sound</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
                <Dropdown
                  style={{
                    height: 35,
                    width: '100%',
                    justifyContent: 'flex-end',
                  }}
                  placeholderStyle={{ color: theme.colors.text }}
                  selectedTextStyle={{ textAlign: 'right', color: theme.colors.text }}
                  data={NotificationSounds}
                  search={false}
                  value={prefs.notificationSound}
                  onChange={(item) => {
                    PreferencesStore.setPreferences({ ...prefs, notificationSound: item.value });
                  }}
                  renderRightIcon={() => (<Ionicon color={theme.colors.text} style={{}} name='chevron-forward-outline' size={IconSize} />)}
                  labelField={'label'}
                  valueField={'value'}
                />
              </View>
            </View>
            <View style={{ marginVertical: 15 }}>
              <View>
                <View style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',

                }}>
                  <Text style={{ fontSize, color: theme.colors.text }}>
                    Version:
                  </Text>
                  <Text style={{ fontWeight: '500', fontSize, color: theme.colors.text }}>
                    v1.0
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                  <Text style={{ fontSize, color: theme.colors.text }}>
                    Developer:
                  </Text>
                  <Text style={{ fontWeight: '500', fontSize, color: theme.colors.text }}>
                    (Paul Cyril Ologho)
                  </Text>
                </View>
              </View>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                display: 'none',
              }}>
                <TouchableOpacity onPress={toggelModal}>
                  <Text style={{ fontSize, marginVertical: 5, color: theme.colors.text }}>
                    Show Terms &amp; Condition
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggelModal}>
                  <Text style={{ fontSize, marginVertical: 5, color: theme.colors.text }}>
                    Show Privacy Policy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggelModal}>
                  <Text style={{ fontSize, marginVertical: 5, color: theme.colors.text }}>
                    Show Third-Party Software
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
})

const PreferenceStackNavigator = createNativeStackNavigator();

export const PreferenceStackScreen = () => {
  return (
    <PreferenceStackNavigator.Navigator>
      <PreferenceStackNavigator.Screen name="Preferences" options={{
        headerTitleAlign: 'center',
        headerBackground: () => null,
      }}>
        {(props: any) => <Preferences {...props} />}
      </PreferenceStackNavigator.Screen>
    </PreferenceStackNavigator.Navigator>
  );
}

export default Preferences;
