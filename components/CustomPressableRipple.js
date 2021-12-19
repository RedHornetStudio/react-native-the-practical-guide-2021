// Any pressable or touchable will not work iside CustomPressableOpacity, because rippleContainer have zIndez 1 and
// is above all childrens

import React, { useRef } from 'react';
import { StyleSheet, Pressable, Animated, View } from 'react-native';

const CustomPressableRipple = props => {
  const sizeAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const sizeUp = () => {
    sizeAnim.setValue(0);
    opacityAnim.setValue(0);
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
    <Pressable {...props} style={[styles.container, props.style]} onPressIn={() => {sizeUp(); if(props.onPressIn) props.onPressIn()}} onPressOut={() => {fadeOut(); if(props.onPressOut) props.onPressOut()}}>
      <View style={[styles.rippleContainer, style(props.style)]}>
        <Animated.View style={[styles.ripple, { opacity: opacityAnim }, { transform: [{ scale: sizeAnim }] }]}></Animated.View>
      </View>
      {props.children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  rippleContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  ripple: {
    width: 4,
    height: 4,
    borderRadius: 4 / 2,
    backgroundColor: '#000000',
  }
});

export default CustomPressableRipple;