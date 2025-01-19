import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface PulsateProps {
  children: React.ReactNode;
  duration?: number; // Duration of one pulsate cycle in milliseconds
  scaleFactor?: number; // How much the component grows during pulsation
  isPaused?: boolean
}

const Pulsate: React.FC<PulsateProps> = ({
  children,
  duration = 1000,
  scaleFactor = 1.1,
  isPaused = false
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Pulsating animation
  useEffect(() => {
    const loopAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: scaleFactor,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    );
    if (!isPaused) { loopAnimation.start(); }
    return () => loopAnimation.stop(); // Clean up on unmount
  }, [scaleFactor, duration, isPaused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      {children}
    </Animated.View>
  );
};

export default Pulsate;
