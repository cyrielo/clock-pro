import React from 'react';
import type { PropsWithChildren } from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';

type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => {};
}>

const Button = ({ style, disabled = false, textStyle, children, onPress }:  ButtonProps) : React.JSX.Element => {

  return (
  <TouchableOpacity activeOpacity={0.8} disabled={disabled} style={{
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'tomato',
    ...style
    }}
    onPress={onPress}
    >
      {children}
  </TouchableOpacity>
  )
}

export default Button;
