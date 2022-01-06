// Any Pressable or Touchable will not work inside CustomPressableRipple, because rippleContainer have properties 
// zIndex=1 and pointerEvents="none" and is above all childrens and childrens are in View with property pointerEvents="none".

// Use contentContainerStyle property for styling View inside pressable.

import React, { useRef } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const CustomPressableRipple = props => {
  const animatedSize = useSharedValue(1);
  const animatedOpacity = useSharedValue(0)
  const pressLocation = useSharedValue({ x: 0, y: 0 });

  let elementHeight = useRef(0).current;
  let elementWidth = useRef(0).current;
  let rippleSize = useRef(0).current;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
      transform: [{ scale: animatedSize.value }, { translateX: pressLocation.value.x / animatedSize.value }, { translateY: pressLocation.value.y / animatedSize.value }]
    }
  });

  const sizeUp = evt => {
    rippleSize = Math.sqrt(Math.pow(elementHeight, 2) + Math.pow(elementWidth, 2)) / 2
    animatedSize.value = 1;
    animatedOpacity.value = 0;
    evt.nativeEvent.locationX > elementWidth || evt.nativeEvent.locationY > elementHeight
      ? pressLocation.value = { x: elementWidth / 2, y: elementHeight / 2 }
      : pressLocation.value = { x: evt.nativeEvent.locationX, y: evt.nativeEvent.locationY };
    animatedSize.value = withTiming(rippleSize, { duration: 400 });
    animatedOpacity.value = withTiming(props.rippleOpacity ? props.rippleOpacity : 0.2, { duration: 50 });
  };

  const fadeOut = () => {
    animatedSize.value = withTiming(rippleSize, { duration: 400 });
    animatedOpacity.value = withTiming(0, { duration: 400 });
  };

  const style = styleProp => {
    if(Array.isArray(styleProp)) {
      let array = []
      styleProp.forEach(element => {
        array.push(style(element));
      });
      return array;
    } else if(typeof styleProp === 'object') {
      let obj = {};
      if(styleProp.borderRadius || styleProp.borderRadius === 0) obj.borderRadius = styleProp.borderRadius;
      if(styleProp.borderTopStartRadius || styleProp.borderTopStartRadius === 0) obj.borderTopStartRadius = styleProp.borderTopStartRadius;
      if(styleProp.borderTopEndRadius || styleProp.borderTopEndRadius === 0) obj.borderTopEndRadius = styleProp.borderTopEndRadius;
      if(styleProp.borderTopRightRadius || styleProp.borderTopRightRadius === 0) obj.borderTopRightRadius = styleProp.borderTopRightRadius;
      if(styleProp.borderTopLeftRadius || styleProp.borderTopLeftRadius === 0) obj.borderTopLeftRadius = styleProp.borderTopLeftRadius;
      if(styleProp.borderBottomStartRadius || styleProp.borderBottomStartRadius === 0) obj.borderBottomStartRadius = styleProp.borderBottomStartRadius;
      if(styleProp.borderBottomEndRadius || styleProp.borderBottomEndRadius === 0) obj.borderBottomEndRadius = styleProp.borderBottomEndRadius;
      if(styleProp.borderBottomRightRadius || styleProp.borderBottomRightRadius === 0) obj.borderBottomRightRadius = styleProp.borderBottomRightRadius;
      if(styleProp.borderBottomLeftRadius || styleProp.borderBottomLeftRadius === 0) obj.borderBottomLeftRadius = styleProp.borderBottomLeftRadius;
      return obj;
    }
  };

  return (
    <Pressable
      {...props}
      style={[styles.container, props.style]}
      onPressIn={evt => {sizeUp(evt); if(props.onPressIn) props.onPressIn()}}
      onPressOut={() => {fadeOut(); if(props.onPressOut) props.onPressOut()}}
      onLayout={evt => {elementHeight = evt.nativeEvent.layout.height; elementWidth = evt.nativeEvent.layout.width}}
    >
      <View style={[styles.rippleContainer, style(props.style)]} pointerEvents="none">
        <Animated.View
          style={[
            styles.ripple,
            {
              backgroundColor: props.rippleColor ? props.rippleColor : '#000',
            },
            animatedStyle
          ]}>
        </Animated.View>
      </View>
      <View style={[styles.contentContainerStyle, props.contentContainerStyle]} pointerEvents="none">
        {props.children}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  contentContainerStyle: {

  },
  rippleContainer: {
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  ripple: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: 4,
    borderRadius: 4 / 2,
  }
});

export default CustomPressableRipple;