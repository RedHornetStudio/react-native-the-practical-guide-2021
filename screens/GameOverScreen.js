import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, ScrollView } from 'react-native';

import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {

  // Contrlonig layout based on device height and width
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const handleDimensionChange = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width)
    };
    Dimensions.addEventListener('change', handleDimensionChange);
    return () => Dimensions.removeEventListener('change', handleDimensionChange);
  }, []);

  const dynamicStyles = StyleSheet.create({
    imageContainer: {
      width: availableDeviceWidth * 0.7,
      height: availableDeviceWidth * 0.7,
      marginVertical: availableDeviceWidth / 30,
      borderRadius: availableDeviceWidth * 0.7 / 2,
    }
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View style={[styles.imageContainer, dynamicStyles.imageContainer]}>
          <Image 
            // source={require('../assets/img/success.png')} style={styles.image} 
            source={{uri:'https://media.istockphoto.com/photos/ama-dablam-mount-in-the-nepal-himalaya-picture-id485966046?k=20&m=485966046&s=612x612&w=0&h=gxP8DAYg54epuymP-eLMvh4hmlIm-AchRMwwNjzBUwE='}}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <BodyText style={styles.text}>Number of rounds: {props.roundsNumber}</BodyText>
        <BodyText style={styles.text}>Number was: {props.userNumber}</BodyText>
        <MainButton onPress={props.handleStartNewGame}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  screen: {
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
  text: {
    fontSize: Dimensions.get('window').width < 400 ? 16 : 20,
  }
});

export default GameOverScreen;