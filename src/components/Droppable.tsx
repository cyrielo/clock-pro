import React, { PropsWithChildren, ReactElement, useEffect, useRef, useState } from 'react';
import { Modal, Text, View, ViewProps, TouchableOpacity, Dimensions, LayoutChangeEvent } from 'react-native';
import AppStyle from '../assets/styles/AppStyle';

type CustomProps = PropsWithChildren<{
  dropdownContent?: ReactElement<any, any>;
}> & ViewProps;

type Coords = { x: number; y: number; width: number; };

export default (({ children, dropdownContent } : CustomProps) => {
  const [modalVisibility, setVisibility] = useState(false);
  const [childrenHeight, setChildrenHeight] = useState(0);
  const [innerContentWidth, setInnerContentWidth] = useState(0);
  const touchableOpacityRef = useRef(null) as any;
  const [deviceWidth, setDeviceWidth] = useState(Math.ceil(Dimensions.get('window').width));
  const [touchableOpacityCoords, setTouchableOpacityCoords] = useState({ x: 0, y: 0, width: 0 } as Coords);
  const maxWidth = deviceWidth - (AppStyle.container.margin * 2);
  const dropdownContentWidth = 220;

  useEffect(() => {

  },[]);

 type DropdownContentPosition = {
  left?: number;
  right?: number;
 };

  const dynamicStyle = (): DropdownContentPosition => {
    const xCoord = touchableOpacityCoords.x;
    const half = Math.ceil(deviceWidth / 2);
    const paddingSize = (half * 0.20);
    const leftScreenSection = (half - paddingSize);
    const rightScreenSection = (half + paddingSize);
    const isLeft = (xCoord) < (leftScreenSection);
    const isRight = (xCoord) > (rightScreenSection);
    const isMiddle = !isLeft && !isRight;
    let left = xCoord;
    let right = maxWidth - (xCoord);

    console.log('isMiddle', isMiddle);
    console.log('right', isRight);
    console.log('touchableOpacityCoords', touchableOpacityCoords);

    if (isMiddle) {
      left = Math.abs(Math.ceil(half - (innerContentWidth / 2)))
      return { left };
    }

    if (isLeft) {
      left = (!(maxWidth > (xCoord + dropdownContentWidth))) 
      ? xCoord - Math.abs((maxWidth - (xCoord + dropdownContentWidth))) : left;
      return { left };
    }

    if (isRight) {
      console.log('{right}', right);
      return { right };
    }
    return {};
  }

  const handleLayout = (event : LayoutChangeEvent) => {
    if (touchableOpacityRef.current) {
      setChildrenHeight(event.nativeEvent.layout.height);
      // @ts-ignore
      touchableOpacityRef.current.measure((x, y, width, height, pageX, pageY) => {
        setTouchableOpacityCoords({ x: pageX, y: pageY, width });
        console.log('touchableOpacityCoords', pageX, pageY );
        console.log('parentWidth', width, height,);
      });
    }
  }
  console.log('maxWidth', maxWidth);
  console.log('dynamicStyle()', dynamicStyle());
  //maxWidth

  return (
    <View>
      <TouchableOpacity
        ref={touchableOpacityRef}
        onLayout={handleLayout}
        onPress={() => setVisibility(!modalVisibility)}
        activeOpacity={0.85}>
        {children}
      </TouchableOpacity>
      <Modal
        animationType='fade'
        style={{margin:15}}
        transparent visible={modalVisibility}>

        {/*Modal transparent overla*/}
        <TouchableOpacity style={{ width: '100%',height: '100%', backgroundColor: 'transparent' }}
          onPress={() => setVisibility(false)}/>
        <View
        onLayout={(event) => setInnerContentWidth(event.nativeEvent.layout.width)}
        style={{
          position: 'absolute',
          top: childrenHeight + 30,
          height: 'auto',
          width: dropdownContentWidth,
          maxWidth,
          zIndex: 10,
          display: (dropdownContent) ? 'flex' : 'none',
          ...dynamicStyle()
        }}>
          {dropdownContent}
        </View>
      </Modal>
    </View>
  );
});