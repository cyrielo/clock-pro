import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import Ionicon from '@react-native-vector-icons/ionicons';
import { useTheme } from '@react-navigation/native';
//@ts-ignore
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
  hasAdd?: boolean;
  title?: string;
  onAdd?: Function;
} & ViewProps

const Header = ({ hasAdd = true, title, onAdd }: HeaderProps) => {
  const theme = useTheme();
  return (
    <View style={HeaderStyles.headerContainer}>
      <Text style={{
        fontSize: 24,
        color: theme.colors.text,
      }}>
        {title}
      </Text>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        {hasAdd && (
          <TouchableOpacity onPress={() => {
            if (typeof onAdd == 'function') { onAdd(); }
          }}>
            <Ionicon style={{
              marginHorizontal: 10,
              backgroundColor: theme.colors.background,
              padding: 10,
              borderRadius: 50
            }}
              name='add'
              color={theme.colors.text}
              size={22}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default Header;
