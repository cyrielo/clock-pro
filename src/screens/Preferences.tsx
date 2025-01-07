import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, Switch, ScrollView, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Section from '../components/Section';
import Ionicon from '@react-native-vector-icons/ionicons';
import { Dropdown } from 'react-native-element-dropdown';
const IconSize = 24;
const fontSize = 16;

const themes = [{
  label: 'System',
  value: 'system'
}, {
  label :'Light',
  value: 'light'
},{
  label: 'Dark',
  value: 'Dark'
}];

const notificationSounds = [{
  label: 'Default',
  value: 'default'
},{
  label: 'Gentle stream',
  value: 'gentle_stream'
}, {
  label: 'Telephonica',
  value: 'telephonica'
}, {
  label: 'Morning Rooster',
  value: 'morning_rooster'
}];


const languages = [{
  label: 'English',
  value: 'en'
},{
  label: 'French',
  value: 'fr'
},{
  label: 'Chinese',
  value: 'ch'
}];

const ModalStyle = StyleSheet.create({
  modal: {
    marginHorizontal: 20,
    marginVertical: 'auto',
    borderWidth: 2,
    backgroundColor: 'white',
    minHeight: 200,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});

const d = () => { return (<Text>Hi</Text>) };

const Preferences = (() => {
  const [theme, setTheme] = useState('light');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [language, setLanguage] = useState('en');
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [notificationSound, setNotificationSound] = useState('default');
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Modal
          visible={modalVisibility}
          transparent={true}
          animationType='fade'
          onRequestClose={() => {
            setModalVisibility(false);
          }}
          >
            <View style={ModalStyle.modal}>
              <Text>Modal content</Text>
            </View>
        </Modal>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            margin: 20,
            marginBottom: 0,
            paddingBottom: 130
          }}>
            <Section title='General' />
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 0.5,
              paddingBottom: 15,
              marginBottom: 20,
            }}>
            <View style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center'
              }}>
              <Ionicon style={{ marginRight: 10 }} name='contrast-outline' size={IconSize} />
              <Text style={{ fontSize }}>Theme</Text>
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
                  selectedTextStyle={{textAlign: 'right'}}
                  data={themes}
                  search={false}
                  value={theme}
                  onChange={(item) => {
                    setTheme(item.value);
                  }}
                  renderRightIcon={() => (<Ionicon style={{}} name='chevron-forward-outline' size={IconSize} />)}
                  labelField={'label'}
                  valueField={'value'}
                />
            </View>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 0.5,
              paddingBottom: 15,
            }}>
              <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center'
                }}>
                <Ionicon style={{ marginRight: 10 }} name='language' size={IconSize} />
                <Text style={{ fontSize: 16 }}>Language</Text>
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
                  selectedTextStyle={{ textAlign: 'right' }}
                  data={languages}
                  search={false}
                  value={language}
                  onChange={(item) => {
                    setLanguage(item.value);
                  }}
                  renderRightIcon={() => (<Ionicon style={{}} name='chevron-forward-outline' size={IconSize} />)}
                  labelField={'label'}
                  valueField={'value'}
                />
              </View>
            </View>
            <Section title='Notifications' />
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 0.5,
              paddingBottom: 15,
              marginBottom: 20,
            }}>
              <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center'
              }}>
                <Ionicon style={{ marginRight: 10 }} name='notifications' size={IconSize} />
                <Text style={{ fontSize }}>Allow Notification</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
                <Switch
                  value={notificationEnabled}
                  onValueChange={(val:boolean) => { setNotificationEnabled(val) }} />
              </View>
            </View>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 0.5,
              paddingBottom: 15,
              marginBottom: 20,
            }}>
              <View style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center'
              }}>
                <Ionicon style={{ marginRight: 10 }} name='musical-notes-sharp' size={IconSize} />
                <Text style={{ fontSize }}>Notification Sound</Text>
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
                  selectedTextStyle={{ textAlign: 'right' }}
                  data={notificationSounds}
                  search={false}
                  value={notificationSound}
                  onChange={(item) => {
                    setNotificationSound(item.value);
                  }}
                  renderRightIcon={() => (<Ionicon style={{}} name='chevron-forward-outline' size={IconSize} />)}
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
                  <Text style={{ fontSize }}>
                    Version:
                  </Text>
                  <Text style={{ fontWeight: '500', fontSize }}>
                    v1.0
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                  <Text style={{ fontSize }}>
                    Developer:
                  </Text>
                  <Text style={{ fontWeight: '500', fontSize }}>
                    (Paul Cyril Ologho)
                  </Text>
                </View>
              </View>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20
              }}>
                <TouchableOpacity>
                  <Text style={{ fontSize, marginVertical: 5, }}>
                    Show Terms &amp; Condition
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize, marginVertical: 5, }}>
                    Show Privacy Policy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize, marginVertical: 5, }}>
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

