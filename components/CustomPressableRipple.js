// Any Pressable or Touchable will not work inside CustomPressableRipple, because rippleContainer have properties 
// zIndex=1 and pointerEvents="none" and is above all childrens and childrens are in View with property pointerEvents="none".

// Use contentContainerStyle property for styling View inside pressable.

import React, { useRef } from 'react';
import { StyleSheet, Pressable, Animated, View } from 'react-native';

const CustomPressableRipple = props => {
  const sizeAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const pressLocation = useRef(new Animated.ValueXY()).current;

  const sizeUp = evt => {
    sizeAnim.setValue(1);
    opacityAnim.setValue(0);
    pressLocation.setValue({ x: evt.nativeEvent.locationX, y: evt.nativeEvent.locationY });
    Animated.parallel([
      Animated.timing(sizeAnim, {
        toValue: 1000,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.2,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  };

  const fadeOut = () => {
    Animated.parallel([
      Animated.timing(sizeAnim, {
        toValue: 1000,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      })
    ]).start();
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
    <Pressable {...props} style={[styles.container, props.style]} onPressIn={evt => {sizeUp(evt); if(props.onPressIn) props.onPressIn()}} onPressOut={() => {fadeOut(); if(props.onPressOut) props.onPressOut()}}>
      <View style={[styles.rippleContainer, style(props.style)]} pointerEvents="none">
        <Animated.View
          style={[
            styles.ripple,
            {
              opacity: opacityAnim,
              transform: [{ scale: sizeAnim }, { translateX: Animated.divide(pressLocation.x, sizeAnim)}, { translateY: Animated.divide(pressLocation.y, sizeAnim)}]
            }
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
    backgroundColor: '#000000',
  }
});

export default CustomPressableRipple;