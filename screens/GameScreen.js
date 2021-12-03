import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';

import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  if(rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

const GameScreen = props => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
  const [rounds, setRounds] = useState(0);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, handleGameOver } = props;

  useEffect(() => {
    if(currentGuess === userChoice) {
      handleGameOver(rounds);
    }
  }, [currentGuess, userChoice, handleGameOver]);

  const handleNextGuess = direction => {
    if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
      Alert.alert('Don\'t lie!', 'You konw that this is wrong...', [{ text: 'Sorry', style: 'cancel' }]);
      return;
    }
    if(direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    setCurrentGuess(generateRandomBetween(currentLow.current, currentHigh.current, currentGuess));
    setRounds(rounds => rounds + 1);
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => handleNextGuess('lower')} />
        <Button title="GREATER" onPress={() => handleNextGuess('greater')} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 300,
    maxWidth: '80%',
    marginTop: 20,
    padding: 20,
  }
});

export default GameScreen;