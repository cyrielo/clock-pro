import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

// Create an Animated version of the Svg.Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressBarProps {
  progress: number; // Progress percentage (0 to 100)
  isPaused?:boolean;
  size?: number; // Diameter of the circle
  strokeWidth?: number; // Width of the progress stroke
  color?: string; // Progress color
  backgroundColor?: string; // Circle background color
  children?: React.ReactNode; // Children to render inside the circle
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  isPaused = false,
  size = 100,
  strokeWidth = 10,
  color = '#3498db',
  backgroundColor = '#e0e0e0',
  children,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Animate the progress
  useEffect(() => {
    if (!isPaused) {
      Animated.timing(animatedValue, {
        toValue: progress,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [progress, isPaused]);

  // Interpolate the strokeDashoffset to animate the progress
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke={backgroundColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <AnimatedCircle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      {/* Children inside the circle */}
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
};
CircularProgressBar.displayName = 'CircularProgressBar';
export default CircularProgressBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
