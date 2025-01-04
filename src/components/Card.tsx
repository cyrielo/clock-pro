import React from 'react';
import type { PropsWithChildren } from 'react';
import {View, ViewProps, ViewStyle } from 'react-native';

type CardProps = PropsWithChildren<{
  style: object;
}> & ViewProps;

const Card = ({ style, children } : CardProps): React.JSX.Element => {
  return (
    <View
      style={{
        padding: 15,
        borderRadius: 15,
        ...style
      }}
    >
      {children}
    </View>
  );
};

interface CircularCardProps extends React.PropsWithChildren {
  style?: ViewStyle;
}

export const CircularCard = ({ style, children }: CircularCardProps) => {
  return (
    <View style={{
      backgroundColor: '#fff',
      borderWidth: 1.5,
      borderColor: 'transparent',
      display: 'flex',
      marginHorizontal: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      height: 250,
      width: 250,
      borderRadius: 150,
      elevation: 20,
      shadowColor: 'grey',
      shadowOpacity: 0.5,
      shadowRadius: 20,
      marginBottom: 25,
      ...style
    }}>
      <>
        {children}
      </>
    </View>
  );
}
export default Card;
