import React from 'react';
import { View, Text, ViewStyle } from 'react-native';

interface SeparatorProps {
  style?:ViewStyle;

}

const Separator = ({ style }: SeparatorProps) => {
  return (<Text style={{
    marginRight: 10,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 300,
     ...style
    }}>:</Text>);
};

export default Separator;