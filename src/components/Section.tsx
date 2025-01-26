import { useTheme } from '@react-navigation/native';
import React from 'react';
import type { PropsWithChildren } from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';

type SectionProps = PropsWithChildren< {
  title: string;
}>
const Section = ({ title }: SectionProps) => {
  const theme = useTheme();
  return (
  <View style={{ marginVertical: 20 }}>
    <Text style={{ fontSize: 18, color: theme.colors.text, fontWeight: '400' }}>
      {title }
    </Text>
  </View>
  );
}



export default Section;