import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

type Props = {
  style?: object
} & ActivityIndicatorProps

export default ((props: Props) => {
  const { style } = props;
  return (
    <ActivityIndicator
      size={'large'}
      color='grey'
      {...props}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(240,240,240,0.2)',
        ...style
      }}
    />
  )
});
