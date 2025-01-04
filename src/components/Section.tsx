import React from 'react';
import type { PropsWithChildren } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';

type SectionProps = PropsWithChildren< {
  title: string;
}>
const Section = ({ title }: SectionProps) => {
  return (
  <View style={{ marginVertical: 20 }}>
    <Text style={{ fontSize: 20, fontWeight: '400' }}>
      {title }
    </Text>
  </View>
  );
}



export default Section;