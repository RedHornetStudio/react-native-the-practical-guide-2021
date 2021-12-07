import React, { useRef } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CustomPressableOpacity = props => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.2,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedPressable {...props} style={[styles.container, props.style, { opacity: fadeAnim }]} onPressIn={() => fadeOut()} onPressOut={() => fadeIn()}>
      {props.children}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {

  },
});

export default CustomPressableOpacity;