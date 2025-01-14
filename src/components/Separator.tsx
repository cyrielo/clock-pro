import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';

interface SeparatorProps {
  style?: ViewStyle | TextStyle;
}

const Separator = ({ style }: SeparatorProps) => {
  return (<Text style={{ ...style }}>:</Text>);
 }

export default Separator;