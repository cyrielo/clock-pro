import React from 'react';
import type { PropsWithChildren } from 'react';
import { View, Text, ImageBackground, ViewStyle, TouchableOpacity, ImageSourcePropType } from 'react-native';
import Icon from '@react-native-vector-icons/ionicons';

type ButtonProps = PropsWithChildren<{
  src: ImageSourcePropType;
  title: string;
  disabled?: boolean;
  style?: object;
  icon?: string;
}>

export default ({ src, style, title, disabled, children, icon }: ButtonProps) => {
  return(
    <View
      style={{
        backgroundColor: '#171717',
        borderColor: '#171717',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        borderRadius: 50,
        ...style
      }}
      >
      <ImageBackground
        style={{
          height: 50,
          width: 50,
          margin: 0,
        }}
        resizeMode='center'
        source={src}
        borderRadius={90}
      />
      <Text style={{
        fontSize: 16,
        color: 'white',
        marginHorizontal: 10,
        fontWeight: '400',
      }}>{title}</Text>
      {children}
      { icon ? <Icon style={{ marginHorizontal: 10 }} name={icon} color={'white'} size={24} /> : null  }
    </View>
  );
}