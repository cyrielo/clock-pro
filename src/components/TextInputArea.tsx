import React, { useState } from 'react';
import { TextInput, TextInputProps} from 'react-native';

type InputProps = {
  style?: object,
  defaultHeight?: number,
} & TextInputProps;

export default ((props:InputProps) => {
  const [height, setHeight] = useState(0);
  const { style, defaultHeight = 100 } = props;
  return (<TextInput
      multiline
      inputMode='text'
      {...props}
      onContentSizeChange={(event) => {
        setHeight(event.nativeEvent.contentSize.height + 100);
      }}
      style={{
        ...style,
        textAlignVertical: 'top',
        height: Math.max(defaultHeight, height)
      }}
    />)
});
