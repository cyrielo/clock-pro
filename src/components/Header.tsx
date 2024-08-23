 import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import ButtonPicture from './ButtonPicture';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Droppable from './Droppable';
//@ts-ignore
import GuestProfilePhoto from '../assets/img/image.png';
const HeaderStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    paddingVertical: 5,
  }
});

type HeaderProps = {
  hasAdd? : boolean;
  title?: string;
} & ViewProps

const Header = ({ hasAdd = true, title } : HeaderProps) => {
  return (
    <View style={HeaderStyles.headerContainer}>
      <Text style={{
        fontSize: 24
      }}>
        {title}
      </Text>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        }}>
        { hasAdd && (
        <TouchableOpacity>
          <Ionicon style={{
              marginHorizontal: 10,
              backgroundColor: '#f0f4fa',
              padding: 10,
              borderRadius: 50
            }}
              name='add'
              color={'#1a1b26'}
              size={22}
            />
        </TouchableOpacity>
       )}
      </View>
    </View>
  );
};
export default Header;
