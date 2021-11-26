import React, { useRef } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';

const CustomPressableOpacity = ({ children, style, onPress }) => {
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
    <Pressable onPressIn={() => fadeOut()} onPressOut={() => fadeIn()} onPress={onPress}>
      <Animated.View style={[styles.customPressableOpacity, style, { opacity: fadeAnim }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  customPressableOpacity: {
    backgroundColor: 'transparent',
  }
});

export default CustomPressableOpacity;