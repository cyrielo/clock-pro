import React, { FunctionComponent, useState } from 'react';
import { View, Text,  Dimensions, FlatList, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicon from '@react-native-vector-icons/ionicons';
import Header from '../components/Header';
import {observer} from 'mobx-react-lite';
import { FLOATING_FOOTER_HEIGHT, SPACING } from '../constants';
import CircularProgressBar from '../components/CircularProgressBar';
import Pulsate from '../components/Pulsate';
import { TimerStore } from '../store';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Select from '../components/SelectWidget';
import {COLORS} from '../constants/colors';
import { Dropdown } from 'react-native-element-dropdown';
import { upperCaseFirst } from '../utils/stringUtils';
import ManageTimer from '../components/ManageTimer';
const GRID = {length: 3, height: 4};
const TimerStackNavigator = createNativeStackNavigator();


type ColProps = {
  row: number;
}

type RowProps = {
  Col: FunctionComponent<ColProps>;
}

const TimerItem = () => {
  return (
    <>
      <Pulsate duration={1000}>
        <CircularProgressBar
          size={100}
          strokeWidth={3}
          progress={10}>
          <Text
            style={{
              fontSize: 16,
              letterSpacing: 1.5,
              fontWeight: 400,
              textAlign: 'center'
            }}>
            24:03:15
          </Text>
        </CircularProgressBar>
      </Pulsate>
      <Ionicon
        style={{
          borderWidth: 1,
          right: 2,
          bottom: 2,
          position: 'absolute',
          borderColor: 'transparent'
        }}
        name='notifications'
        size={16}
        color={'#fff'}
      />
    </>
  )
}




const Rows: React.FC<RowProps> = ({ Col }) => (
  Array.from({ length: GRID.height }).map((_, index) => {
    return (
      <View
        key={index}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 15,
          alignItems: 'center'
        }}>
        <Col row={index} />
      </View>
    )
  })
);
const Cols: React.FC<ColProps> = ({row}) => {
  return Array.from({ length: GRID.length }).map((_, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          console.log('row ->', row);
          console.log('Pressed cell', index);
        }}
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: 'rgba(100,100,100,0.2)',
          backgroundColor: 'rgba(100,100,100,0.5)',
          marginHorizontal: 7,
          height: 110,
          borderRadius: 10,
          padding: 4,
          justifyContent: 'flex-end',
        }}
      >
        {
          (row == 0 && index == 0) && <Text>src/screens/Timer.tsx</Text>
        }
        {
          (row == 2 && index == 2) && <Text>src/screens/Timer.tsx</Text>
        }
      </TouchableOpacity>
    )
  });
};
const Timer = observer(() => {
  const windowHeight = Dimensions.get('window').height;
  const screenHeight = windowHeight - (FLOATING_FOOTER_HEIGHT + SPACING);
  const [modalVisibility, setModalVisibility] = useState(true);
  const [dateTime, setDateTime] = useState(new Date());
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Modal
          animationType='slide'
          onDismiss={() => setModalVisibility(false)}
          transparent={true}
          visible={modalVisibility}
          >
            <View style={{
              minWidth: '85%',
              minHeight: 300,
              margin: 'auto',
              backgroundColor: '#fff',
              borderRadius: 5
            }}>
              <ManageTimer editMode={false}/>
            </View>
        </Modal>
        <View style={{
          display: 'flex',
          marginTop: 20,
          marginBottom: 0,
          marginHorizontal: 20,
          paddingBottom: 130,
          height: screenHeight
        }}>
          <Header title='Timer' hasAdd={true} />
          <View style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            alignContent: 'center',
            margin: 'auto',
            marginTop: 35,
          }}>
            <Rows Col={Cols} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
)
});

export const TimerStackScreen = () => {
  return (
    <TimerStackNavigator.Navigator>
      <TimerStackNavigator.Screen
        name="Timer" options={{ header: () => null }}>
        {(props: any) => <Timer {...props} />}
      </TimerStackNavigator.Screen>
    </TimerStackNavigator.Navigator>
  );
}
Timer.displayName = 'Timer';
export default Timer;
